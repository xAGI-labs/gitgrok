"use client";

import { useState } from "react";
import { GitHubIcon, GitLabIcon, ProcessingIcon, DownloadIcon } from "./components/icons";
import { RepositoryInput } from "./components/repository-input";
import { OutputPreview } from "./components/output-preview";
import { ThemeToggle } from "../components/ui/theme-toggle";

export default function Home() {
  const [repositoryUrl, setRepositoryUrl] = useState('');

  const handleExampleClick = (repo: string) => {
    setRepositoryUrl(`https://github.com/${repo}`);
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <img 
                src="/favicon.ico" 
                alt="GitGrok Logo" 
                className="w-8 h-9 sm:w-10 sm:h-11"
              />
              <div className="flex items-center space-x-1 sm:space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                  GitGrok
                </h1>
                <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Beta
                </span>
              </div>
            </div>
            <nav className="flex items-center space-x-3 sm:space-x-6">
              <a href="#docs" className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </a>
              <a href="https://github.com" className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 lg:py-34 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="animate-wave-colors">Transform any Git repository into</span>
            <span className="animate-wave-colors-delayed"> AI-friendly text</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            GitGrok converts codebases into prompt-friendly digests for LLMs. 
            Zero friction, beautiful interface, powerful analysis.
          </p>

          {/* Repository Input Section */}
          <div className="bg-card rounded-2xl shadow-xl border border-border p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
            <RepositoryInput 
              initialUrl={repositoryUrl}
              onUrlChange={setRepositoryUrl}
            />
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
            <span className="text-sm text-muted-foreground">Try these examples:</span>
            <button 
              onClick={() => handleExampleClick('facebook/react')}
              className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors"
            >
              facebook/react
            </button>
            <button 
              onClick={() => handleExampleClick('vercel/next.js')}
              className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors"
            >
              vercel/next.js
            </button>
            <button 
              onClick={() => handleExampleClick('microsoft/vscode')}
              className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors"
            >
              microsoft/vscode
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
