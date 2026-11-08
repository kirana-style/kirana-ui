import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const solidStart: AppSkeleton = {
  template: "solid-start",
  framework: "solid",
  title: "Kirana on SolidStart",
  source: "src",
  document: "src/entry-server.tsx",
  output: ".output/public",
  files: {
    "src/app.tsx": `import "@kirana-style/core/stylesheet.css"
import { MetaProvider, Title } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Kirana on SolidStart</Title>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
`,
    "src/entry-client.tsx": `// @refresh reload
import { StartClient, mount } from "@solidjs/start/client"

mount(() => <StartClient />, document.getElementById("app")!)
`,
    "src/entry-server.tsx": `// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server"

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
))
`,
    "src/routes/index.tsx": `import { css } from "@kirana-style/core"

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
  },
  dependencies: [
    "@solidjs/meta",
    "@solidjs/router",
    "@solidjs/start",
    "nitro",
    "solid-js",
    "vite",
  ],
  devDependencies: ["typescript"],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: {
    dev: "vite dev",
    build: "vite build",
    start: "node .output/server/index.mjs",
  },
  typecheck: "tsc --noEmit",
  vite: {
    imports: [
      'import { solidStart } from "@solidjs/start/config"',
      'import { nitro } from "nitro/vite"',
    ],
    plugins: ["kirana()", "solidStart()", "nitro()"],
    note: "Kirana before SolidStart, so routes reach Solid's compiler with `sx` already a class.",
  },
  tsconfig: {
    compilerOptions: {
      target: "ESNext",
      module: "ESNext",
      moduleResolution: "bundler",
      jsx: "preserve",
      jsxImportSource: "solid-js",
      strict: true,
      noEmit: true,
      isolatedModules: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      types: ["vite/client", "@solidjs/start/env", "@kirana-style/core/solid"],
    },
    include: ["src", "*.ts"],
  },
  ignore: [".output/", ".nitro/", ".vinxi/"],
}
