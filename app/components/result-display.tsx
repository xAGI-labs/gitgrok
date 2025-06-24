"use client";

import { useState } from 'react';
import { DownloadIcon, CopyIcon, ShareIcon, CheckIcon } from './icons';

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

interface ResultDisplayProps {
  result: ProcessResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'stats' | 'raw'>('preview');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.content || JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const content = result.content || JSON.stringify(result, null, 2);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.repository.split('/').slice(-1)[0]}-digest.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${bytes} B`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Processing Complete
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {result.repository}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex">
          {[
            { key: 'preview', label: 'Preview' },
            { key: 'stats', label: 'Statistics' },
            { key: 'raw', label: 'Raw Output' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-4 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'preview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {result.stats.totalFiles}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Files</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatSize(result.stats.totalSize)}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">Size</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {result.stats.languages.length}
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-400">Languages</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {result.stats.testFiles}
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-400">Tests</div>
              </div>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <pre className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto text-sm">
                {result.content ? result.content.substring(0, 2000) + '...' : 'No preview available'}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                Repository Statistics
              </h4>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Files</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{result.stats.totalFiles}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Size</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{formatSize(result.stats.totalSize)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Test Files</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{result.stats.testFiles}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Documentation Files</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{result.stats.docFiles}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                Programming Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.stats.languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'raw' && (
          <div>
            <pre className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-auto text-sm max-h-96">
              {result.content || JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
