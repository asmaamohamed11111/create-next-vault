<p align="center">
  <img src="https://nextjs.org/static/favicon/favicon.ico" height="60" alt="Next.js Logo" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/master/.github/logo-dark.svg" height="60" alt="TailwindCSS Logo" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" height="60" alt="shadcn/ui Logo" />
</p>

<h1 align="center">⚡ create-next-vault</h1>

<p align="center">
  <b>Instantly scaffold a professional Next.js project</b><br/>
  Built-in TailwindCSS · shadcn/ui · Themes · ESLint · TypeScript
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/create-next-vault">
    <img src="https://img.shields.io/npm/v/create-next-vault?color=blue&label=Version&logo=npm" alt="npm version" />
  </a>
  <a href="https://github.com/youknowom/create-next-vault">
    <img src="https://img.shields.io/github/stars/youknowom/create-next-vault?style=social" alt="GitHub stars" />
  </a>

</p>

---

<p align="center">
  <img src="https://nextjs.org/static/favicon/favicon.ico" height="60" alt="Next.js Logo" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/master/.github/logo-dark.svg" height="60" alt="Tailwind CSS Logo" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://avatars.githubusercontent.com/u/139895814?s=200&v=4" height="60" alt="shadcn/ui Logo" />
</p>

<h1 align="center">⚡ create-next-vault</h1>

<p align="center">
  <strong>Instantly scaffold a professional Next.js project</strong><br/>
  Built-in Tailwind CSS · shadcn/ui · Themes · ESLint · TypeScript
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

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Sample interactive session](#sample-interactive-session)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

**create-next-vault** scaffolds a ready-to-code Next.js project with common integrations pre-wired so you can focus on building instead of setup.

It comes configured with sensible defaults for a modern frontend stack and optional features you can opt into during the interactive setup.

## Features

- Tailwind CSS — utility-first styling set up and ready.
- shadcn/ui — preconfigured component primitives and example components.
- Dark/Light theme — using `next-themes` for easy theme toggling.
- Framer Motion — optional animations scaffolded where appropriate.
- ESLint + Prettier — linting and formatting configured.
- TypeScript by default — strong typing out of the box.
- Git auto-init — option to initialize a git repo and create an initial commit.

## Requirements

- Node.js 18+ (LTS recommended)
- npm (or pnpm / yarn supported)

## Quick Start

Create a new project in one command:

```bash
npx create-next-vault my-next-app
cd my-next-app
npm install
npm run dev
```

This will run the interactive generator and create a new folder `my-next-app`.

## Sample interactive session

Below is an example of the prompts you will see when running the generator (your choices will vary):

```text
🚀  Welcome to Next Vault!

? Project name: my-next-app
🧱  Add shadcn/ui components? (Y/n)
🎨  Add Tailwind CSS? (Y/n)
🌓  Add theme support? (Y/n)
💫  Add framer-motion animations? (n)
🪄  Initialize Git repository? (Y/n)
```

After scaffolding, the commands above (`cd my-next-app` and `npm run dev`) will start the dev server.

## Sponsor

If you find this project useful, consider supporting its development on GitHub Sponsors. Your contributions help fund maintenance, CI costs, and feature work.

[![Sponsor](https://img.shields.io/badge/Sponsor-GitHub%20Sponsors-orange?logo=github)](https://github.com/sponsors/youknowom)

## Configuration

- To opt out of a feature, answer `n` at the prompt for that feature.
- Theme configuration and component examples are located under `app/` (or `src/` depending on template choice).
- ESLint/Prettier config files are included at the project root.

If you'd like me to scaffold additional templates (e.g. Tailwind-only, or JS-only), tell me and I can add them.

## Contributing

Contributions are welcome. Open an issue or submit a pull request. A simple contribution flow:

1. Fork the repo
2. Create a feature branch
3. Open a pull request with a clear description of your change

Please include tests or manual verification steps for non-trivial changes.

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.

## Author

Omkar Bagul — youknowom

GitHub: https://github.com/youknowom
LinkedIn: https://www.linkedin.com/in/omkar-bagul (optional)

---

If you'd like, I can also:

- Add a small screenshot or GIF to the README (you can upload an image to this repo and I will wire it in).
- Produce an example `index.js` / CLI output update to match the branding and emojis you used earlier.

Would you like me to commit these changes to a branch and open a PR, or apply them directly to `main`?
