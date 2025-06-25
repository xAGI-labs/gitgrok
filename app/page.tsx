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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">GG</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                GitGrok
              </h1>
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Beta
              </span>
            </div>
            <nav className="flex items-center space-x-3 sm:space-x-6">
              <a href="#features" className="hidden sm:block text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
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
      <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              Why choose GitGrok?
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Built for developers who need to feed codebases to AI models. 
              Faster, more beautiful, and more convenient than any alternative.
            </p>
          </div>
          <FeatureGrid />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-primary to-purple-600 rounded"></div>
              <span className="text-muted-foreground text-sm sm:text-base">GitGrok</span>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">
                Terms
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
