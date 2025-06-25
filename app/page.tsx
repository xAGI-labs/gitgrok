import { GitHubIcon, GitLabIcon, ProcessingIcon, DownloadIcon } from "./components/icons";
import { RepositoryInput } from "./components/repository-input";
import { OutputPreview } from "./components/output-preview";
import { FeatureGrid } from "./components/feature-grid";
import { ThemeToggle } from "../components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GG</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                GitGrok
              </h1>
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Beta
              </span>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </a>
              <a href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Transform any Git repository into
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"> AI-friendly text</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            GitGrok converts codebases into prompt-friendly digests for LLMs. 
            Zero friction, beautiful interface, powerful analysis.
          </p>

          {/* Repository Input Section */}
          <div className="bg-card rounded-2xl shadow-xl border border-border p-8 mb-12">
            <RepositoryInput />
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="text-sm text-muted-foreground">Try these examples:</span>
            <button className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors">
              facebook/react
            </button>
            <button className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors">
              vercel/next.js
            </button>
            <button className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full hover:bg-muted/80 transition-colors">
              microsoft/vscode
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Why choose GitGrok?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for developers who need to feed codebases to AI models. 
              Faster, more beautiful, and more convenient than any alternative.
            </p>
          </div>
          <FeatureGrid />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-purple-600 rounded"></div>
              <span className="text-muted-foreground">GitGrok</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
