"use client";

import { useState } from 'react';
import { GitHubIcon, GitLabIcon, ProcessingIcon } from './icons';
import { AdvancedOptions } from './advanced-options';
import { ResultDisplay } from './result-display';

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

export function RepositoryInput() {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  
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
                onChange={(e) => setUrl(e.target.value)}
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
              
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-border text-foreground rounded-lg font-medium hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors ${
                  showAdvanced ? 'bg-accent text-accent-foreground' : ''
                }`}
              >
                Advanced Options
              </button>
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

        {/* Advanced Options */}
        {showAdvanced && (
          <AdvancedOptions options={options} onChange={setOptions} />
        )}
      </div>

      {/* Results */}
      {result && (
        <ResultDisplay result={result} />
      )}
    </div>
  );
}
