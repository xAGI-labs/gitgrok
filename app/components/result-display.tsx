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
    <div className="bg-background">
      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2 px-6 py-4 border-b border-border">
        <button
          onClick={handleCopy}
          className="inline-flex items-center px-3 py-2 border border-border shadow-sm text-sm leading-4 font-medium rounded-md text-foreground bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors"
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
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors"
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          Download
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex px-6">
          {[
            { key: 'preview', label: 'Preview' },
            { key: 'stats', label: 'Statistics' },
            { key: 'raw', label: 'Raw Output' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-3 px-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">
                  {result.stats.totalFiles}
                </div>
                <div className="text-sm text-primary/80">Files</div>
              </div>
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {formatSize(result.stats.totalSize)}
                </div>
                <div className="text-sm text-green-600/80 dark:text-green-400/80">Size</div>
              </div>
              <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {result.stats.languages.length}
                </div>
                <div className="text-sm text-purple-600/80 dark:text-purple-400/80">Languages</div>
              </div>
              <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {result.stats.testFiles}
                </div>
                <div className="text-sm text-orange-600/80 dark:text-orange-400/80">Tests</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-foreground mb-3">Content Preview</h4>
              <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {result.content ? result.content.substring(0, 2000) + (result.content.length > 2000 ? '\n\n... (truncated, use Raw Output tab to see full content)' : '') : 'No preview available'}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-foreground mb-4">
                Repository Statistics
              </h4>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="bg-card border border-border rounded-lg p-4">
                  <dt className="text-sm font-medium text-muted-foreground">Total Files</dt>
                  <dd className="mt-1 text-2xl font-bold text-foreground">{result.stats.totalFiles}</dd>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <dt className="text-sm font-medium text-muted-foreground">Total Size</dt>
                  <dd className="mt-1 text-2xl font-bold text-foreground">{formatSize(result.stats.totalSize)}</dd>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <dt className="text-sm font-medium text-muted-foreground">Test Files</dt>
                  <dd className="mt-1 text-2xl font-bold text-foreground">{result.stats.testFiles}</dd>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <dt className="text-sm font-medium text-muted-foreground">Documentation Files</dt>
                  <dd className="mt-1 text-2xl font-bold text-foreground">{result.stats.docFiles}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-foreground mb-4">
                Programming Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.stats.languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
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
            <h4 className="text-lg font-medium text-foreground mb-4">Raw Output</h4>
            <div className="bg-muted rounded-lg p-4 max-h-[60vh] overflow-auto">
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                {result.content || JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
