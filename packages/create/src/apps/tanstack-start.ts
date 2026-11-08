import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const tanstackStart: AppSkeleton = {
  template: "tanstack-start",
  framework: "react",
  title: "Kirana on TanStack Start",
  source: "src",
  document: "src/routes/__root.tsx",
  output: "dist/client",
  files: {
    "src/router.tsx": `import { createRouter } from "@tanstack/react-router"

import { routeTree } from "./routeTree.gen"

export function getRouter() {
  return createRouter({ routeTree })
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
`,
    "src/routes/__root.tsx": `import kiranaCss from "@kirana-style/core/stylesheet.css?url"
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kirana on TanStack Start" },
    ],
    links: [{ rel: "stylesheet", href: kiranaCss }],
  }),
  shellComponent: RootDocument,
  component: Outlet,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
`,
    "src/routes/index.tsx": `import { css } from "@kirana-style/core"
import { createFileRoute } from "@tanstack/react-router"

const styles = {
  main: css({
    display: "grid",
    placeItems: "center",
    minHeight: "100svh",
    textAlign: "center",
  }),
  command: css({ fontFamily: "monospace" }),
}

export const Route = createFileRoute("/")({ component: Home })

function Home() {
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
  },
  dependencies: [
    "@tanstack/react-router",
    "@tanstack/react-start",
    "react",
    "react-dom",
  ],
  devDependencies: [
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "typescript",
    "vite",
  ],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: { dev: "vite dev", build: "vite build", preview: "vite preview" },
  // `routeTree.gen.ts` is written by the first `dev` or `build`.
  typecheck: "tsc --noEmit",
  vite: {
    imports: [
      'import { tanstackStart } from "@tanstack/react-start/plugin/vite"',
      'import react from "@vitejs/plugin-react"',
    ],
    plugins: ["kirana()", "tanstackStart()", "react()"],
    note: "Kirana ahead of the framework plugins, so routes reach them compiled.",
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
      types: ["vite/client", "@kirana-style/core/react"],
    },
    include: ["src", "*.ts"],
  },
  ignore: ["src/routeTree.gen.ts", ".tanstack/", ".nitro/", ".output/"],
}
