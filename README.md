<div align="center">
  <img src="app/favicon.ico" alt="GitGrok Logo" width="80" height="80">
  
  # GitGrok
  
  **Transform any Git repository into AI-friendly text**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)](https://tailwindcss.com/)
  
  [Demo](https://gitgrok.vercel.app) • [Report Bug](https://github.com/yourusername/gitgrok/issues) • [Request Feature](https://github.com/yourusername/gitgrok/issues)
</div>

## 🚀 About GitGrok

GitGrok is a powerful web application that converts entire Git repositories into prompt-friendly text digests optimized for Large Language Models (LLMs). Whether you're feeding codebases to AI assistants, creating documentation, or analyzing code structure, GitGrok makes it effortless.

### ✨ Key Features

- **🔥 Lightning Fast**: Process repositories in seconds with optimized parsing
- **🔒 Privacy First**: Zero data retention, no accounts required, your code stays private
- **🤖 AI-Optimized**: Smart filtering and formatting designed for LLM consumption
- **📄 Multi-Format Output**: Export as Markdown, JSON, or plain text
- **🌐 Universal Support**: Works with GitHub, GitLab, Bitbucket, and any public Git repository
- **⚙️ Advanced Options**: Configurable file filtering, size limits, and smart exclusions
- **🎨 Beautiful Interface**: Modern, responsive design with dark/light mode support

## 🛠️ Installation

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gitgrok.git
   cd gitgrok
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any required environment variables here
# Currently, GitGrok works without additional configuration
```

## 🎯 Usage

1. **Enter Repository URL**: Paste any public Git repository URL (GitHub, GitLab, Bitbucket)
2. **Configure Options**: Use quick toggles or advanced options to customize processing
3. **Generate Digest**: Click "Generate Digest" and wait for processing
4. **View Results**: Results appear in a scrollable modal with tabs for Preview, Statistics, and Raw Output
5. **Export**: Copy to clipboard or download as a file

### Supported Repository Formats

- `https://github.com/owner/repository`
- `https://gitlab.com/owner/repository`
- `https://bitbucket.org/owner/repository`

### Output Formats

- **Markdown**: Best for LLMs and documentation (default)
- **JSON**: Structured data with metadata
- **Plain Text**: Simple concatenated files

## 🏗️ Project Structure

```
gitgrok/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── process-repo/  # Repository processing endpoint
│   ├── components/        # React components
│   │   ├── advanced-options.tsx
│   │   ├── feature-grid.tsx
│   │   ├── icons.tsx
│   │   ├── repository-input.tsx
│   │   └── result-display.tsx
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Shared UI components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
├── public/               # Static assets
└── README.md
```

## 🛠️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

## 🤝 Contributing

We love contributions! GitGrok is an open source project and we welcome contributions of all kinds.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- **Code Style**: We use ESLint and Prettier for code formatting
- **Commits**: Use conventional commit messages
- **Testing**: Add tests for new features
- **Documentation**: Update documentation for significant changes

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🔧 Performance optimizations
- 🌐 Internationalization
- 🧪 Testing improvements

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [shadcn](https://twitter.com/shadcn) for the beautiful UI components
- All contributors who help make GitGrok better

## 📞 Support

- 📧 Email: support@gitgrok.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/gitgrok/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/gitgrok/discussions)

## 🗺️ Roadmap

- [ ] Private repository support with authentication
- [ ] CLI tool for command-line usage
- [ ] Browser extension
- [ ] API for programmatic access
- [ ] Batch processing for multiple repositories
- [ ] Custom filtering rules
- [ ] Integration with popular AI platforms

---

<div align="center">
  Made with ❤️ by the <a href="https://bugshoot.com">Bugshoot</a> team
  
  ⭐ Star us on GitHub if you find GitGrok useful!
</div>
