import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const viteSolid: AppSkeleton = {
  template: "vite-solid",
  framework: "solid",
  title: "Kirana on Vite + Solid",
  source: "src",
  document: "index.html",
  output: "dist",
  files: {
    "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kirana on Vite + Solid</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    "src/main.tsx": `import "@kirana-style/core/stylesheet.css"
import { render } from "solid-js/web"

import { App } from "./App"

render(() => <App />, document.getElementById("root")!)
`,
    "src/App.tsx": `import { css } from "@kirana-style/core"

const styles = {
  main: css({
    display: "grid",
    placeItems: "center",
    minHeight: "100svh",
    textAlign: "center",
  }),
  command: css({ fontFamily: "monospace" }),
}

export function App() {
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
    "src/vite-env.d.ts": `/// <reference types="vite/client" />
`,
  },
  dependencies: ["solid-js"],
  devDependencies: ["typescript", "vite", "vite-plugin-solid"],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
  typecheck: "tsc --noEmit",
  vite: {
    imports: ['import solid from "vite-plugin-solid"'],
    plugins: ["kirana()", "solid()"],
    note: "Kirana before Solid's plugin: `sx` compiles to `class`, as Solid's JSX spells it.",
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
}
