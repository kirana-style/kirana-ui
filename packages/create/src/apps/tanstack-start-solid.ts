import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const tanstackStartSolid: AppSkeleton = {
  template: "tanstack-start-solid",
  framework: "solid",
  title: "Kirana on TanStack Start with Solid",
  source: "src",
  document: "src/routes/__root.tsx",
  output: "dist/client",
  files: {
    "src/router.tsx": `import { createRouter } from "@tanstack/solid-router"

import { routeTree } from "./routeTree.gen"

export function getRouter() {
  return createRouter({ routeTree })
}

declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
`,
    "src/routes/__root.tsx": `import kiranaCss from "@kirana-style/core/stylesheet.css?url"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/solid-router"
import type { JSX } from "solid-js"
import { HydrationScript } from "solid-js/web"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kirana on TanStack Start with Solid" },
    ],
    links: [{ rel: "stylesheet", href: kiranaCss }],
  }),
  shellComponent: RootDocument,
})

function RootDocument(props: { children: JSX.Element }) {
  return (
    <html lang="en">
      <head>
        <HydrationScript />
      </head>
      <body>
        <HeadContent />
        {props.children}
        <Scripts />
      </body>
    </html>
  )
}
`,
    "src/routes/index.tsx": `import { css } from "@kirana-style/core"
import { createFileRoute } from "@tanstack/solid-router"

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
  dependencies: ["@tanstack/solid-router", "@tanstack/solid-start", "solid-js"],
  devDependencies: ["typescript", "vite", "vite-plugin-solid"],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: { dev: "vite dev", build: "vite build", preview: "vite preview" },
  // `routeTree.gen.ts` is written by the first `dev` or `build`.
  typecheck: "tsc --noEmit",
  vite: {
    imports: [
      'import { tanstackStart } from "@tanstack/solid-start/plugin/vite"',
      'import viteSolid from "vite-plugin-solid"',
    ],
    plugins: [
      "kirana()",
      "tanstackStart({ prerender: { enabled: true, failOnError: true } })",
      "viteSolid({ ssr: true })",
    ],
    note: "Kirana ahead of the framework plugins, so routes reach Solid's compiler with `sx` already a class; the build prerenders `/` into dist/client.",
  },
  tsconfig: {
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      jsx: "preserve",
      jsxImportSource: "solid-js",
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      types: ["vite/client", "@kirana-style/core/solid"],
    },
    include: ["src", "*.ts"],
  },
  ignore: ["src/routeTree.gen.ts", ".tanstack/", ".nitro/", ".output/"],
}
