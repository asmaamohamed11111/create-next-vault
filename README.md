<h1 align="center">⚡ create-next-vault</h1>

<p align="center">
  <strong>Instantly scaffold a professional Next.js project</strong><br/>
  Built-in TailwindCSS · shadcn/ui · Themes · ESLint · TypeScript
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/create-next-vault">
    <img src="https://img.shields.io/npm/v/create-next-vault?color=blue&label=version&logo=npm" alt="npm version" />
  </a>
  <a href="https://github.com/youknowom/create-next-vault">
    <img src="https://img.shields.io/github/stars/youknowom/create-next-vault?style=social" alt="GitHub stars" />
  </a>
  <a href="https://github.com/sponsors/youknowom">
    <img src="https://img.shields.io/static/v1?label=Sponsor&message=GitHub&color=FF8C00&logo=github" alt="Sponsor" />
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="license" />
  </a>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Requirements](#️-requirements)
- [Quick Start](#-quick-start)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Roadmap](#-roadmap)

---

## 📘 Overview

**create-next-vault** is a powerful CLI tool that scaffolds a fully configured **Next.js** project with modern tooling and best practices pre-wired. Skip the tedious setup and start building your application immediately with a production-ready foundation.

Perfect for developers who want to:
- 🚀 Get started with Next.js quickly
- 🎨 Use TailwindCSS with zero configuration
- 🧱 Leverage shadcn/ui components
- 🌓 Implement dark/light theme support
- 💫 Add smooth animations with Framer Motion
- 🧹 Maintain code quality with ESLint and Prettier

---

## 🚀 Features

### Core Features

- ⚡ **Next.js 14+ with TypeScript** — Latest Next.js with App Router and TypeScript preconfigured
- 🎨 **TailwindCSS** — Utility-first CSS framework ready to use
- 🧱 **shadcn/ui** — Beautiful, accessible UI components built with Radix UI
- 🌗 **Theme Support** — Dark/light theme switching via `next-themes`
- 💫 **Framer Motion (optional)** — Smooth animations and transitions
- 🧹 **ESLint + Prettier** — Code formatting and linting configured
- 🪄 **Git Auto-Init** — Optional Git repository initialization with initial commit

### Technical Highlights

- ✅ **App Router** — Uses Next.js 13+ App Router by default
- ✅ **TypeScript** — Full TypeScript support out of the box
- ✅ **Modern Tooling** — Latest versions of all dependencies
- ✅ **Best Practices** — Follows Next.js and React best practices
- ✅ **Accessibility** — shadcn/ui components are built with accessibility in mind

---

## ⚙️ Requirements

Before using **create-next-vault**, ensure you have the following installed:

- **Node.js ≥ 18** (LTS version recommended)
- **npm**, **pnpm**, or **yarn** package manager
- **Git** (optional, for version control)

---

## 🧭 Quick Start

Create a new Next.js project in seconds:

```bash
npx create-next-vault my-next-app
cd my-next-app
npm run dev
```

That's it! Your development server will be running at `http://localhost:3000`.

---

## 📖 Usage

### Interactive Setup

When you run `create-next-vault`, you'll be prompted with several options:

1. **Project Name** — Name of your project (default: `my-next-app`)
2. **Add shadcn/ui components?** — Install and configure shadcn/ui (default: `yes`)
3. **Add dark/light theme support?** — Set up `next-themes` for theme switching (default: `yes`)
4. **Add framer-motion animations?** — Install Framer Motion for animations (default: `no`)
5. **Initialize git repository?** — Create a Git repo and make an initial commit (default: `yes`)

### Example

```bash
$ npx create-next-vault my-awesome-app

📁  Project name: my-awesome-app
🧱  Add shadcn/ui components? Yes
🌓  Add dark/light theme support? Yes
💫  Add framer-motion animations? No
🪄  Initialize git repository? Yes

🚀 Creating Next.js project...
✅ Next.js project created.
🎨 Installing Tailwind CSS...
✅ TailwindCSS installed.
🧩 Installing extra dependencies...
✅ Extra dependencies installed.
🧱 Setting up shadcn/ui...
✅ shadcn/ui initialized.
🪄 Initializing git...
✅ Git repository initialized.

✅  Project "my-awesome-app" created successfully!

Next steps:
  cd my-awesome-app
  npm run dev

✨  Happy hacking with Next Vault!
```

---

## ⚙️ Configuration

### TailwindCSS

TailwindCSS is automatically configured with the following content paths:

- `./app/**/*.{js,ts,jsx,tsx,mdx}`
- `./pages/**/*.{js,ts,jsx,tsx,mdx}`
- `./components/**/*.{js,ts,jsx,tsx,mdx}`

### Theme Support

If you enabled theme support, the `Providers` component is automatically added to your root layout. You can use it in your components:

```tsx
"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle theme
    </button>
  );
}
```

### shadcn/ui

After initialization, you can add shadcn/ui components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

Visit the [shadcn/ui documentation](https://ui.shadcn.com) for more components.

---

## 📁 Project Structure

After scaffolding, your project will have the following structure:

```
my-next-app/
├── app/
│   ├── layout.tsx          # Root layout with Providers (if theme enabled)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles with Tailwind
│   └── providers.tsx       # Theme provider (if theme enabled)
├── components/             # Your React components
├── public/                 # Static assets
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

---

## 🧩 Contributing

Contributions are welcome and greatly appreciated! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add some amazing feature"
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Guidelines

- Follow the existing code style
- Add tests for new features (if applicable)
- Update documentation as needed
- Ensure all tests pass
- Be respectful and constructive in discussions

### Reporting Issues

If you find a bug or have a suggestion, please [open an issue](https://github.com/youknowom/create-next-vault/issues) on GitHub.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Omkar Bagul**

- 🌐 GitHub: [@youknowom](https://github.com/youknowom)
- 💼 LinkedIn: [Omkar Bagul](https://www.linkedin.com/in/omkar-bagul)
- 📧 Email: [youknowom@users.noreply.github.com](mailto:youknowom@users.noreply.github.com)

---

## 💖 Sponsor

If you find this project useful, consider supporting its development on [GitHub Sponsors](https://github.com/sponsors/youknowom).

Your support helps fund:
- ✨ New features and improvements
- 🐛 Bug fixes and maintenance
- 📚 Documentation updates
- 🧪 Testing and CI/CD

---

## 🗺️ Roadmap

### Upcoming Features (v0.2.0)

- 🚀 `--fast` flag for instant, non-interactive setup
- 📦 Option to use `pnpm` or `bun` for faster installs
- 🎨 Pre-configured theme presets
- 📱 Mobile-first component templates
- 🔌 Plugin system for extensibility
- 🌐 Internationalization (i18n) support
- 🧪 Testing setup (Jest, Vitest, or Playwright)

### Future Considerations

- 🔐 Authentication templates
- 💾 Database integration examples
- 🚀 Deployment configurations
- 📊 Analytics integration
- 🎯 Performance optimizations

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing framework
- [TailwindCSS](https://tailwindcss.com) for the utility-first CSS
- [shadcn/ui](https://ui.shadcn.com) for the beautiful components
- [next-themes](https://github.com/pacocoursey/next-themes) for theme support
- [Framer Motion](https://www.framer.com/motion/) for animations

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/youknowom">Omkar Bagul</a>
</p>

<p align="center">
  <a href="https://github.com/youknowom/create-next-vault">⭐ Star this repo</a> if you find it helpful!
</p>
