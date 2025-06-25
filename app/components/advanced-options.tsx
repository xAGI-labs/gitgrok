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
    <div className="space-y-6">
      {/* Output Format Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h4 className="text-sm font-semibold text-foreground">Output Format</h4>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            { value: 'markdown', label: 'Markdown', description: 'Best for LLMs and documentation', icon: '📝' },
            { value: 'json', label: 'JSON', description: 'Structured data with metadata', icon: '🔧' },
            { value: 'text', label: 'Plain Text', description: 'Simple concatenated files', icon: '📄' }
          ].map((format) => (
            <label key={format.value} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors">
              <input
                type="radio"
                name="outputFormat"
                value={format.value}
                checked={options.outputFormat === format.value}
                onChange={(e) => updateOption('outputFormat', e.target.value as any)}
                className="w-4 h-4 text-primary border-input focus:ring-ring"
              />
              <span className="text-lg">{format.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">
                  {format.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {format.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* File Size Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h4 className="text-sm font-semibold text-foreground">File Size Limit</h4>
        </div>
        <div className="p-4 rounded-lg border border-border bg-muted/30">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-foreground">Maximum file size</span>
            <span className="text-sm font-medium text-primary">{formatFileSize(options.maxFileSize)}</span>
          </div>
          <input
            type="range"
            min="1024"
            max="1048576"
            step="1024"
            value={options.maxFileSize}
            onChange={(e) => updateOption('maxFileSize', parseInt(e.target.value))}
            className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>1KB</span>
            <span>1MB</span>
          </div>
        </div>
      </div>

      {/* Filtering Options Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <h4 className="text-sm font-semibold text-foreground">File Filtering</h4>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              key: 'includeTests' as const,
              label: 'Include Test Files',
              description: 'Include files that appear to be tests',
              icon: '🧪'
            },
            {
              key: 'includeDocs' as const,
              label: 'Include Documentation',
              description: 'Include README, docs, and markdown files',
              icon: '📚'
            },
            {
              key: 'smartFilter' as const,
              label: 'Smart Filtering',
              description: 'AI-powered filtering of irrelevant files',
              icon: '🤖'
            }
          ].map((option) => (
            <label key={option.key} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                id={option.key}
                checked={options[option.key]}
                onChange={(e) => updateOption(option.key, e.target.checked)}
                className="w-4 h-4 text-primary border-input rounded focus:ring-ring"
              />
              <span className="text-lg">{option.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">
                  {option.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {option.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Exclusions Info Section */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
          <h4 className="text-sm font-semibold text-muted-foreground">Automatically Excluded</h4>
        </div>
        <div className="p-4 rounded-lg bg-muted/30 border border-border">
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-start space-x-2">
              <span className="font-medium text-foreground">📁 Directories:</span>
              <span>node_modules, .git, dist, build, coverage, __pycache__, .next</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium text-foreground">🗂️ File types:</span>
              <span>Images, videos, fonts, executables, archives</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-medium text-foreground">⚙️ Generated:</span>
              <span>Minified JS, bundled assets, auto-generated code</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
