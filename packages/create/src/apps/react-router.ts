import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const reactRouter: AppSkeleton = {
  template: "react-router",
  framework: "react",
  title: "Kirana on React Router",
  source: "app",
  document: "app/root.tsx",
  output: "build/client",
  files: {
    "app/root.tsx": `import "@kirana-style/core/stylesheet.css"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kirana on React Router</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
`,
    "app/routes.ts": `import { index } from "@react-router/dev/routes"
import type { RouteConfig } from "@react-router/dev/routes"

export default [index("routes/home.tsx")] satisfies RouteConfig
`,
    "app/routes/home.tsx": `import { css } from "@kirana-style/core"

const styles = {
  main: css({
    display: "grid",
    placeItems: "center",
    minHeight: "100svh",
    textAlign: "center",
  }),
  command: css({ fontFamily: "monospace" }),
}

export default function Home() {
  return (
    <main sx={styles.main}>
      <div>
        <h1>${WELCOME.heading}</h1>
        <p>${WELCOME.text}</p>
        <code sx={styles.command}>${WELCOME.command}</code>
      </div>
    </main>
  )
}
`,
    "react-router.config.ts": `import type { Config } from "@react-router/dev/config"

// Single-page mode: the build is static files. Set \`ssr: true\` for a server.
export default { ssr: false } satisfies Config
`,
  },
  dependencies: [
    "@react-router/node",
    "isbot",
    "react",
    "react-dom",
    "react-router",
  ],
  devDependencies: [
    "@react-router/dev",
    "@types/react",
    "@types/react-dom",
    "typescript",
    "vite",
  ],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: {
    dev: "react-router dev",
    build: "react-router build",
    start: "react-router-serve ./build/server/index.js",
  },
  // `.react-router/types` is written by the first `dev` or `build` (`react-router typegen`).
  typecheck: "react-router typegen && tsc --noEmit",
  vite: {
    imports: ['import { reactRouter } from "@react-router/dev/vite"'],
    plugins: ["kirana()", "reactRouter()"],
    note: "Kirana before React Router, so routes and the root reach it as source.",
  },
  tsconfig: {
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      jsx: "react-jsx",
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      rootDirs: [".", "./.react-router/types"],
      types: ["@kirana-style/core/react", "vite/client"],
    },
    include: ["app", "*.ts", ".react-router/types/**/*"],
  },
  ignore: ["build/", ".react-router/"],
}
