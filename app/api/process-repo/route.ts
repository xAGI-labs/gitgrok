import { NextRequest, NextResponse } from 'next/server';
import { simpleGit, SimpleGit } from 'simple-git';
import { promises as fs } from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

interface ProcessOptions {
  includeTests: boolean;
  includeDocs: boolean;
  smartFilter: boolean;
  maxFileSize: number;
  outputFormat: 'markdown' | 'json' | 'text';
}

interface FileInfo {
  path: string;
  content: string;
  size: number;
  language: string;
  isTest: boolean;
  isDoc: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { url, options }: { url: string; options: ProcessOptions } = await request.json();

    if (!isValidGitUrl(url)) {
      return NextResponse.json({ error: 'Invalid Git repository URL' }, { status: 400 });
    }

    const tempDir = path.join(tmpdir(), `gitgrok-${randomUUID()}`);
    const git: SimpleGit = simpleGit();

    try {
      // Clone repository
      await git.clone(url, tempDir, ['--depth', '1']);
      
      // Process files
      const files = await processRepository(tempDir, options);
      
      // Generate output
      const result = await generateOutput(files, options, url);
      
      // Cleanup
      await fs.rm(tempDir, { recursive: true, force: true });
      
      return NextResponse.json(result);
      
    } catch (error) {
      // Cleanup on error
      try {
        await fs.rm(tempDir, { recursive: true, force: true });
      } catch {}
      
      throw error;
    }
    
  } catch (error) {
    console.error('Processing error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Processing failed' },
      { status: 500 }
    );
  }
}

function isValidGitUrl(url: string): boolean {
  const gitUrlPattern = /^https?:\/\/(github\.com|gitlab\.com|bitbucket\.org)\/.+\/.+/;
  return gitUrlPattern.test(url.trim());
}

async function processRepository(repoPath: string, options: ProcessOptions): Promise<FileInfo[]> {
  const files: FileInfo[] = [];
  
  async function walkDirectory(dir: string, relativePath: string = ''): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip common directories that should be ignored
        if (shouldSkipDirectory(entry.name)) continue;
        await walkDirectory(fullPath, relPath);
      } else if (entry.isFile()) {
        try {
          const stats = await fs.stat(fullPath);
          
          // Skip large files
          if (stats.size > options.maxFileSize) continue;
          
          // Skip binary files
          if (isBinaryFile(entry.name)) continue;
          
          const content = await fs.readFile(fullPath, 'utf-8');
          const language = detectLanguage(entry.name);
          const isTest = isTestFile(relPath);
          const isDoc = isDocFile(relPath);
          
          // Apply filtering options
          if (!options.includeTests && isTest) continue;
          if (!options.includeDocs && isDoc) continue;
          if (options.smartFilter && shouldFilterFile(relPath, content)) continue;
          
          files.push({
            path: relPath,
            content,
            size: stats.size,
            language,
            isTest,
            isDoc
          });
          
        } catch (error) {
          // Skip files that can't be read
          continue;
        }
      }
    }
  }
  
  await walkDirectory(repoPath);
  return files;
}

function shouldSkipDirectory(name: string): boolean {
  const skipDirs = [
    '.git', 'node_modules', '.next', 'dist', 'build', 'coverage',
    '__pycache__', '.pytest_cache', 'venv', 'env', '.venv',
    'target', 'bin', 'obj', '.gradle', 'vendor'
  ];
  return skipDirs.includes(name) || name.startsWith('.');
}

function isBinaryFile(filename: string): boolean {
  const binaryExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.ico', '.svg', '.pdf',
    '.zip', '.tar', '.gz', '.exe', '.dll', '.so', '.dylib',
    '.woff', '.woff2', '.ttf', '.eot', '.mp3', '.mp4', '.avi'
  ];
  return binaryExtensions.some(ext => filename.toLowerCase().endsWith(ext));
}

function detectLanguage(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const languageMap: Record<string, string> = {
    '.js': 'javascript', '.jsx': 'javascript', '.ts': 'typescript', '.tsx': 'typescript',
    '.py': 'python', '.java': 'java', '.c': 'c', '.cpp': 'cpp', '.cs': 'csharp',
    '.go': 'go', '.rs': 'rust', '.php': 'php', '.rb': 'ruby', '.swift': 'swift',
    '.kt': 'kotlin', '.scala': 'scala', '.sh': 'bash', '.yml': 'yaml', '.yaml': 'yaml',
    '.json': 'json', '.xml': 'xml', '.html': 'html', '.css': 'css', '.scss': 'scss',
    '.md': 'markdown', '.sql': 'sql', '.dockerfile': 'dockerfile'
  };
  return languageMap[ext] || 'text';
}

function isTestFile(filePath: string): boolean {
  const testPatterns = [
    /test/i, /spec/i, /__tests__/, /\.test\./, /\.spec\./,
    /tests?\//i, /spec\//i
  ];
  return testPatterns.some(pattern => pattern.test(filePath));
}

function isDocFile(filePath: string): boolean {
  const docPatterns = [
    /readme/i, /\.md$/i, /docs?\//i, /documentation/i,
    /changelog/i, /license/i, /contributing/i
  ];
  return docPatterns.some(pattern => pattern.test(filePath));
}

function shouldFilterFile(filePath: string, content: string): boolean {
  // Smart filtering logic
  if (content.length < 10) return true; // Too short
  if (content.length > 50000) return true; // Too long
  
  // Skip generated files
  const generatedPatterns = [
    /generated/i, /auto-generated/i, /do not edit/i,
    /\.min\.js$/, /\.bundle\.js$/
  ];
  
  return generatedPatterns.some(pattern => 
    pattern.test(filePath) || pattern.test(content.substring(0, 500))
  );
}

async function generateOutput(files: FileInfo[], options: ProcessOptions, repoUrl: string) {
  const stats = {
    totalFiles: files.length,
    totalSize: files.reduce((sum, f) => sum + f.size, 0),
    languages: [...new Set(files.map(f => f.language))],
    testFiles: files.filter(f => f.isTest).length,
    docFiles: files.filter(f => f.isDoc).length
  };
  
  switch (options.outputFormat) {
    case 'json':
      return {
        repository: repoUrl,
        stats,
        files: files.map(f => ({
          path: f.path,
          content: f.content,
          language: f.language,
          size: f.size
        }))
      };
      
    case 'text':
      return {
        repository: repoUrl,
        stats,
        content: files.map(f => 
          `=== ${f.path} ===\n${f.content}\n\n`
        ).join('')
      };
      
    default: // markdown
      const content = `# Repository: ${repoUrl}

## Statistics
- **Total Files**: ${stats.totalFiles}
- **Total Size**: ${(stats.totalSize / 1024).toFixed(2)} KB
- **Languages**: ${stats.languages.join(', ')}
- **Test Files**: ${stats.testFiles}
- **Documentation Files**: ${stats.docFiles}

## Files

${files.map(f => `### ${f.path}

\`\`\`${f.language}
${f.content}
\`\`\`

`).join('')}`;
      
      return {
        repository: repoUrl,
        stats,
        content
      };
  }
}
