"use client";

import { useState, useEffect } from 'react';
import { GitHubIcon, GitLabIcon, ProcessingIcon } from './icons';
import { AdvancedOptions } from './advanced-options';
import { ResultDisplay } from './result-display';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

interface ProcessOptions {
  includeTests: boolean;
  includeDocs: boolean;
  smartFilter: boolean;
  maxFileSize: number;
  outputFormat: 'markdown' | 'json' | 'text';
}

interface ProcessResult {
  repository: string;
  stats: {
    totalFiles: number;
    totalSize: number;
    languages: string[];
    testFiles: number;
    docFiles: number;
  };
  content?: string;
  files?: any[];
}

interface RepositoryInputProps {
  initialUrl?: string;
  onUrlChange?: (url: string) => void;
}

export function RepositoryInput({ initialUrl = '', onUrlChange }: RepositoryInputProps = {}) {
  const [url, setUrl] = useState(initialUrl);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    onUrlChange?.(newUrl);
  };
  
  const [options, setOptions] = useState<ProcessOptions>({
    includeTests: true,
    includeDocs: true,
    smartFilter: true,
    maxFileSize: 51200, // 50KB
    outputFormat: 'markdown'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setError('');
    setIsProcessing(true);
    setResult(null);

    try {
      if (!isValidGitUrl(url)) {
        throw new Error('Please enter a valid Git repository URL');
      }

      const response = await fetch('/api/process-repo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, options }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Processing failed');
      }

      const result = await response.json();
      setResult(result);
      setShowResultModal(true);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const isValidGitUrl = (url: string): boolean => {
    const gitUrlPattern = /^https?:\/\/(github\.com|gitlab\.com|bitbucket\.org)\/.+\/.+/;
    return gitUrlPattern.test(url.trim());
  };

  const getRepositoryIcon = () => {
    if (url.includes('github.com')) return <GitHubIcon className="w-5 h-5" />;
    if (url.includes('gitlab.com')) return <GitLabIcon className="w-5 h-5" />;
    return <GitHubIcon className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="repository-url" className="block text-sm font-medium text-foreground mb-2">
            Repository URL
          </label>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {getRepositoryIcon()}
              </div>
              <input
                type="url"
                id="repository-url"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://github.com/owner/repository"
                className="block w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                disabled={isProcessing}
              />
              {isProcessing && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <ProcessingIcon className="w-5 h-5 animate-spin text-primary" />
                </div>
              )}
            </div>
            
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                type="submit"
                disabled={!url.trim() || isProcessing}
                className="flex-1 bg-primary text-primary-foreground px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center space-x-2">
                    <ProcessingIcon className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </span>
                ) : (
                  'Generate Digest'
                )}
              </button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-border text-foreground rounded-lg font-medium hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                  >
                    Advanced Options
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
                  <DialogHeader className="flex-shrink-0">
                    <DialogTitle>Advanced Options</DialogTitle>
                    <DialogDescription>
                      Configure advanced settings for repository processing.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                    <AdvancedOptions options={options} onChange={setOptions} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </div>

        {/* Quick Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-tests"
              checked={options.includeTests}
              onChange={(e) => setOptions(prev => ({ ...prev, includeTests: e.target.checked }))}
              className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
            />
            <label htmlFor="include-tests" className="text-sm text-muted-foreground">
              Include tests
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-docs"
              checked={options.includeDocs}
              onChange={(e) => setOptions(prev => ({ ...prev, includeDocs: e.target.checked }))}
              className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
            />
            <label htmlFor="include-docs" className="text-sm text-muted-foreground">
              Include docs
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="smart-filter"
              checked={options.smartFilter}
              onChange={(e) => setOptions(prev => ({ ...prev, smartFilter: e.target.checked }))}
              className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
            />
            <label htmlFor="smart-filter" className="text-sm text-muted-foreground">
              Smart filtering
            </label>
          </div>
        </div>

      </div>

      {/* Results Modal */}
      <Dialog open={showResultModal} onOpenChange={setShowResultModal}>
        <DialogContent className="sm:max-w-[90vw] max-w-[95vw] max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="flex-shrink-0 px-6 py-4 border-b border-border">
            <DialogTitle className="text-xl font-semibold">
              Repository Digest Generated
            </DialogTitle>
            <DialogDescription>
              {result?.repository && `Results for ${result.repository}`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            {result && <ResultDisplay result={result} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
