import { 
  ZapIcon, 
  ShieldIcon, 
  SparklesIcon, 
  CodeIcon, 
  GitHubIcon, 
  DownloadIcon 
} from './icons';

const features = [
  {
    icon: ZapIcon,
    title: "Lightning Fast",
    description: "Process repositories in seconds with our optimized parsing engine. No waiting around.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: ShieldIcon,
    title: "Privacy First",
    description: "Zero data retention. Your code stays private. No accounts, no tracking, no storage.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: SparklesIcon,
    title: "AI-Optimized",
    description: "Smart filtering and formatting specifically designed for LLM consumption and analysis.",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: CodeIcon,
    title: "Multi-Format Output",
    description: "Export as Markdown, JSON, plain text, or custom formats. Perfect for any workflow.",
    color: "from-blue-400 to-cyan-500"
  },
  {
    icon: GitHubIcon,
    title: "Universal Support",
    description: "Works with GitHub, GitLab, Bitbucket, and any public Git repository. Even private repos with SSH.",
    color: "from-gray-400 to-slate-500"
  },
  {
    icon: DownloadIcon,
    title: "Developer Tools",
    description: "CLI tool, browser extension, REST API, and integrations with popular development tools.",
    color: "from-indigo-400 to-purple-500"
  }
];

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <div
            key={index}
            className="group relative bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10"></div>
            
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} mb-4`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <h4 className="text-xl font-semibold text-card-foreground mb-2">
              {feature.title}
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {feature.description}
            </p>

            {/* Subtle border accent */}
            <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl`}></div>
          </div>
        );
      })}
    </div>
  );
}
