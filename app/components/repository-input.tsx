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
          <label htmlFor="repository-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled={isProcessing}
              />
              {isProcessing && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <ProcessingIcon className="w-5 h-5 animate-spin text-blue-500" />
                </div>
              )}
            </div>
            
            {error && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={!url.trim() || isProcessing}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                className={`px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors ${
                  showAdvanced ? 'bg-gray-50 dark:bg-gray-800' : ''
                }`}
              >
                Advanced Options
              </button>
            </div>
          </form>
        </div>

        {/* Quick Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-tests"
              checked={options.includeTests}
              onChange={(e) => setOptions(prev => ({ ...prev, includeTests: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="include-tests" className="text-sm text-gray-600 dark:text-gray-400">
              Include tests
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="include-docs"
              checked={options.includeDocs}
              onChange={(e) => setOptions(prev => ({ ...prev, includeDocs: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="include-docs" className="text-sm text-gray-600 dark:text-gray-400">
              Include docs
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="smart-filter"
              checked={options.smartFilter}
              onChange={(e) => setOptions(prev => ({ ...prev, smartFilter: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="smart-filter" className="text-sm text-gray-600 dark:text-gray-400">
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
