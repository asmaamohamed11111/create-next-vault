#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { fileURLToPath } from "url";

// ✅ Fix for Node 22+ JSON import
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgPath = path.join(__dirname, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

const banner = () => {
  const text = figlet.textSync("NEXT VAULT", { horizontalLayout: "full" });
  console.log(gradient.pastel.multiline(text));
  console.log(chalk.gray("A blazing-fast Next.js starter generator ⚡\n"));
};

const createApp = async () => {
  banner();

  const { projectName, withShadcn, withTheme, withMotion, initGit } =
    await inquirer.prompt([
      {
        name: "projectName",
        message: chalk.cyan("📁  Project name:"),
        default: "my-next-app",
      },
      {
        name: "withShadcn",
        type: "confirm",
        message: chalk.yellow("🧱  Add shadcn/ui components?"),
        default: true,
      },
      {
        name: "withTheme",
        type: "confirm",
        message: chalk.magenta("🌓  Add dark/light theme support?"),
        default: true,
      },
      {
        name: "withMotion",
        type: "confirm",
        message: chalk.blue("💫  Add framer-motion animations?"),
        default: false,
      },
      {
        name: "initGit",
        type: "confirm",
        message: chalk.green("🪄  Initialize git repository?"),
        default: true,
      },
    ]);

  const spinner = ora("🚀 Creating Next.js project...").start();

  try {
    // Run create-next-app with non-interactive flags
    await execa(
      "npx",
      [
        "create-next-app@latest",
        projectName,
        "--typescript",
        "--tailwind",
        "--app",
        "--no-src-dir",
        "--import-alias",
        "@/*",
        "--yes",
        "--eslint",
      ],
      { stdio: "inherit" }
    );
    spinner.succeed(chalk.green("✅ Next.js project created."));
  } catch (err) {
    spinner.fail("❌ Error creating project");
    console.error(chalk.red(err.message || "Unknown error occurred"));
    process.exit(1);
  }

  const cwd = path.join(process.cwd(), projectName);

  // Detect project structure (app router vs pages router)
  const hasAppDir = await fs.pathExists(path.join(cwd, "app"));
  const hasPagesDir = await fs.pathExists(path.join(cwd, "pages"));
  const appRouter = hasAppDir;

  // Determine globals.css path
  let globalsCssPath;
  if (appRouter) {
    globalsCssPath = path.join(cwd, "app", "globals.css");
  } else {
    const stylesDir = path.join(cwd, "styles");
    await fs.ensureDir(stylesDir);
    globalsCssPath = path.join(stylesDir, "globals.css");
  }

  // Read existing globals.css or create new one
  let globalsContent = "";
  if (await fs.pathExists(globalsCssPath)) {
    globalsContent = await fs.readFile(globalsCssPath, "utf-8");
  }

  // Add theme variables if not already present
  if (!globalsContent.includes("--brand")) {
    const themeVars = `
/* Custom Theme Base */
:root {
  --brand: #2563eb;
}

.dark {
  --brand: #3b82f6;
}
`;
    globalsContent += themeVars;
    await fs.writeFile(globalsCssPath, globalsContent.trim() + "\n");
  }

  // Update tailwind config - check if it exists and read it
  // Check for different possible config file formats
  const tailwindConfigPaths = [
    path.join(cwd, "tailwind.config.ts"),
    path.join(cwd, "tailwind.config.js"),
    path.join(cwd, "tailwind.config.mjs"),
  ];

  let tailwindConfigPathFinal = null;
  let isTypeScript = false;
  let isEsm = false;

  // Find which config file exists
  for (const configPath of tailwindConfigPaths) {
    if (await fs.pathExists(configPath)) {
      tailwindConfigPathFinal = configPath;
      isTypeScript = configPath.endsWith(".ts");
      isEsm = configPath.endsWith(".mjs");
      break;
    }
  }

  // If no config exists, create one (default to .js)
  if (!tailwindConfigPathFinal) {
    tailwindConfigPathFinal = path.join(cwd, "tailwind.config.js");
  }

  let tailwindConfigContent = "";
  if (await fs.pathExists(tailwindConfigPathFinal)) {
    tailwindConfigContent = await fs.readFile(tailwindConfigPathFinal, "utf-8");
    // Detect format from content
    if (tailwindConfigContent.includes("export default")) {
      isEsm = true;
    }
  } else {
    // Create new config based on detected format
    if (isTypeScript) {
      tailwindConfigContent = `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
`;
    } else if (isEsm) {
      tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
    } else {
      tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
    }
  }

  // Ensure content paths include all necessary directories
  if (!tailwindConfigContent.includes("./components")) {
    const contentRegex = /content:\s*\[([^\]]+)\]/s;
    const match = tailwindConfigContent.match(contentRegex);
    if (match) {
      const existingContent = match[1].trim();
      if (!existingContent.includes("./components")) {
        tailwindConfigContent = tailwindConfigContent.replace(
          contentRegex,
          `content: [\n    ${existingContent.replace(/\n/g, "\n    ")},\n    "./components/**/*.{js,ts,jsx,tsx,mdx}",\n  ]`
        );
      }
    }
  }

  await fs.writeFile(tailwindConfigPathFinal, tailwindConfigContent);

  // Install extras
  const extras = [];
  if (withTheme) extras.push("next-themes");
  if (withMotion) extras.push("framer-motion");

  if (extras.length > 0) {
    spinner.start("🧩 Installing extra dependencies...");
    try {
      await execa("npm", ["install", ...extras], {
        cwd,
        stdio: "inherit",
      });
      spinner.succeed("🧩 Extra dependencies installed.");
    } catch (err) {
      spinner.fail("❌ Failed to install extra dependencies.");
      console.error(chalk.red(err.message || "Unknown error"));
    }
  }

  // Setup shadcn/ui if requested
  if (withShadcn) {
    spinner.start("🧱 Setting up shadcn/ui...");
    try {
      // Install required dependencies for shadcn/ui
      await execa(
        "npm",
        [
          "install",
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
          "lucide-react",
        ],
        { cwd, stdio: "pipe" }
      );

      // Create components.json configuration file
      // Determine the tailwind config filename
      const tailwindConfigFileName = tailwindConfigPathFinal
        ? path.basename(tailwindConfigPathFinal)
        : "tailwind.config.js";
      
      const componentsJson = {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "default",
        rsc: appRouter,
        tsx: true,
        tailwind: {
          config: tailwindConfigFileName,
          css: appRouter ? "app/globals.css" : "styles/globals.css",
          baseColor: "slate",
          cssVariables: true,
          prefix: "",
        },
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
        },
      };

      await fs.writeFile(
        path.join(cwd, "components.json"),
        JSON.stringify(componentsJson, null, 2) + "\n"
      );

      // Create lib/utils.ts for cn utility
      const libDir = path.join(cwd, "lib");
      await fs.ensureDir(libDir);
      const utilsContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
      await fs.writeFile(path.join(libDir, "utils.ts"), utilsContent);

      // Update Tailwind config to include shadcn/ui theme
      // Re-read the config as it may have been modified
      if (tailwindConfigPathFinal && (await fs.pathExists(tailwindConfigPathFinal))) {
        let twConfig = await fs.readFile(tailwindConfigPathFinal, "utf-8");
        
        // Add theme extension if not present
        if (!twConfig.includes("--background") && !twConfig.includes("hsl(var(--background))")) {
          // Check if we have a theme.extend section
          if (twConfig.includes("extend:")) {
            // Add to existing extend section
            if (twConfig.includes("extend: {}")) {
              // Replace empty extend with shadcn theme
              const shadcnThemeExtend = `extend: {
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        colors: {
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          chart: {
            "1": "hsl(var(--chart-1))",
            "2": "hsl(var(--chart-2))",
            "3": "hsl(var(--chart-3))",
            "4": "hsl(var(--chart-4))",
            "5": "hsl(var(--chart-5))",
          },
        },
      }`;
              twConfig = twConfig.replace(/extend:\s*{\s*}/, shadcnThemeExtend);
            } else {
              // Add to existing non-empty extend - insert before closing brace
              const shadcnColors = `,
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        colors: {
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          chart: {
            "1": "hsl(var(--chart-1))",
            "2": "hsl(var(--chart-2))",
            "3": "hsl(var(--chart-3))",
            "4": "hsl(var(--chart-4))",
            "5": "hsl(var(--chart-5))",
          },
        }`;
              // Find the last item in extend before closing brace
              twConfig = twConfig.replace(/(extend:\s*{[^}]*)(})/s, `$1${shadcnColors}$2`);
            }
          } else {
            // No extend section, add theme.extend
            const themeExtend = `  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },`;
            // Replace theme: {} with extended theme
            twConfig = twConfig.replace(/theme:\s*{\s*},?/, themeExtend);
          }
          
          await fs.writeFile(tailwindConfigPathFinal, twConfig);
        }
      }

      // Add CSS variables to globals.css
      if (await fs.pathExists(globalsCssPath)) {
        let cssContent = await fs.readFile(globalsCssPath, "utf-8");
        
        if (!cssContent.includes("--background")) {
          const shadcnVars = `
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
          cssContent += shadcnVars;
          await fs.writeFile(globalsCssPath, cssContent);
        }
      }

      spinner.succeed("🧱 shadcn/ui configured successfully.");
      console.log(
        chalk.cyan(
          "   💡 Tip: Run 'npx shadcn@latest add [component]' to add components"
        )
      );
    } catch (err) {
      spinner.warn(
        "⚠️  shadcn/ui setup encountered issues. You can manually run: npx shadcn@latest init"
      );
      console.error(chalk.yellow(err.message || "shadcn/ui setup failed"));
    }
  }

  // Optional theme setup
  if (withTheme) {
    const themeFile = `"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
`;

    try {
      if (appRouter) {
        await fs.ensureDir(path.join(cwd, "app"));
        await fs.writeFile(
          path.join(cwd, "app", "providers.tsx"),
          themeFile.trim() + "\n"
        );

        // Update layout.tsx to include Providers
        const layoutPath = path.join(cwd, "app", "layout.tsx");
        if (await fs.pathExists(layoutPath)) {
          let layoutContent = await fs.readFile(layoutPath, "utf-8");
          if (!layoutContent.includes("Providers")) {
            // Add import - find the last import statement
            const lines = layoutContent.split("\n");
            let lastImportIndex = -1;
            for (let i = 0; i < lines.length; i++) {
              if (lines[i].trim().startsWith("import ")) {
                lastImportIndex = i;
              } else if (lastImportIndex >= 0 && lines[i].trim() === "") {
                break;
              }
            }
            
            if (lastImportIndex >= 0) {
              lines.splice(lastImportIndex + 1, 0, 'import { Providers } from "./providers";');
            } else {
              lines.unshift('import { Providers } from "./providers";', "");
            }

            layoutContent = lines.join("\n");
            
            // Wrap {children} with Providers inside body tag
            // Pattern: <body>...{children}...</body>
            if (layoutContent.includes("{children}") && layoutContent.includes("<body")) {
              layoutContent = layoutContent.replace(
                /(<body[^>]*>)([\s\S]*?)(\{children\})([\s\S]*?)(<\/body>)/,
                (match, openTag, before, children, after, closeTag) => {
                  // Check if already wrapped
                  if (before.includes("<Providers>") || after.includes("</Providers>")) {
                    return match;
                  }
                  return `${openTag}${before}<Providers>${children}</Providers>${after}${closeTag}`;
                }
              );
            } else if (layoutContent.includes("{children}")) {
              // Fallback: wrap children directly
              layoutContent = layoutContent.replace(
                /(\{children\})/,
                "<Providers>$1</Providers>"
              );
            }
            
            await fs.writeFile(layoutPath, layoutContent);
          }
        }
      } else {
        // For pages router, create _app.tsx wrapper
        const appPath = path.join(cwd, "pages", "_app.tsx");
        if (!(await fs.pathExists(appPath))) {
          const appFile = `import type { AppProps } from "next/app";
import { Providers } from "../components/providers";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
`;
          await fs.ensureDir(path.join(cwd, "components"));
          await fs.writeFile(
            path.join(cwd, "components", "providers.tsx"),
            themeFile.trim() + "\n"
          );
          await fs.writeFile(appPath, appFile);
        }
      }
    } catch (err) {
      spinner.warn("⚠️  Theme provider setup encountered issues.");
      console.error(chalk.yellow(err.message || "Theme setup failed"));
    }
  }

  // Git init
  if (initGit) {
    spinner.start("🪄 Initializing git...");
    try {
      // Check if git is available
      await execa("git", ["--version"], { stdio: "pipe" });
      await execa("git", ["init"], { cwd, stdio: "pipe" });
      
      // Configure git user if not set (avoid commit errors)
      try {
        await execa("git", ["config", "user.name", "Next Vault"], {
          cwd,
          stdio: "pipe",
        });
        await execa(
          "git",
          ["config", "user.email", "next-vault@example.com"],
          { cwd, stdio: "pipe" }
        );
      } catch {
        // Git config might already be set globally, that's fine
      }

      await execa("git", ["add", "."], { cwd, stdio: "pipe" });
      await execa(
        "git",
        ["commit", "-m", "chore: initial commit from create-next-vault"],
        { cwd, stdio: "pipe" }
      );
      spinner.succeed("🪄 Git repository initialized.");
    } catch (err) {
      spinner.warn(
        "⚠️  Git setup skipped. You can initialize manually with: git init"
      );
    }
  }

  console.log(
    chalk.greenBright(`
✅  Project "${projectName}" created successfully!

Next steps:
  cd ${projectName}
  npm run dev

✨  ${chalk.cyan("Happy hacking with Next Vault!")}
`)
  );
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(chalk.red("Unhandled error:"), err);
  process.exit(1);
});

createApp().catch((err) => {
  console.error(chalk.red("Fatal error:"), err);
  process.exit(1);
});
