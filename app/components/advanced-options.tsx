"use client";

interface ProcessOptions {
  includeTests: boolean;
  includeDocs: boolean;
  smartFilter: boolean;
  maxFileSize: number;
  outputFormat: 'markdown' | 'json' | 'text';
}

interface AdvancedOptionsProps {
  options: ProcessOptions;
  onChange: (options: ProcessOptions) => void;
}

export function AdvancedOptions({ options, onChange }: AdvancedOptionsProps) {
  const updateOption = (key: keyof ProcessOptions, value: any) => {
    onChange({ ...options, [key]: value });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${bytes}B`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-6 border border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Advanced Options</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Output Format */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Output Format
          </label>
          <div className="space-y-2">
            {[
              { value: 'markdown', label: 'Markdown', description: 'Best for LLMs and documentation' },
              { value: 'json', label: 'JSON', description: 'Structured data with metadata' },
              { value: 'text', label: 'Plain Text', description: 'Simple concatenated files' }
            ].map((format) => (
              <label key={format.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="outputFormat"
                  value={format.value}
                  checked={options.outputFormat === format.value}
                  onChange={(e) => updateOption('outputFormat', e.target.value as any)}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {format.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {format.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* File Size Limit */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Max File Size: {formatFileSize(options.maxFileSize)}
          </label>
          <input
            type="range"
            min="1024"
            max="1048576"
            step="1024"
            value={options.maxFileSize}
            onChange={(e) => updateOption('maxFileSize', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>1KB</span>
            <span>1MB</span>
          </div>
        </div>
      </div>

      {/* Filtering Options */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">File Filtering</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              key: 'includeTests' as const,
              label: 'Include Test Files',
              description: 'Include files that appear to be tests'
            },
            {
              key: 'includeDocs' as const,
              label: 'Include Documentation',
              description: 'Include README, docs, and markdown files'
            },
            {
              key: 'smartFilter' as const,
              label: 'Smart Filtering',
              description: 'AI-powered filtering of irrelevant files'
            }
          ].map((option) => (
            <div key={option.key} className="flex items-start space-x-3">
              <input
                type="checkbox"
                id={option.key}
                checked={options[option.key]}
                onChange={(e) => updateOption(option.key, e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <label htmlFor={option.key} className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer">
                  {option.label}
                </label>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {option.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* File Type Exclusions */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Automatically Excluded</h4>
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <div><strong>Directories:</strong> node_modules, .git, dist, build, coverage, __pycache__, .next</div>
          <div><strong>File types:</strong> Images, videos, fonts, executables, archives</div>
          <div><strong>Generated files:</strong> Minified JS, bundled assets, auto-generated code</div>
        </div>
      </div>
    </div>
  );
}
