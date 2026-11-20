import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"
import { solid2 } from "../versions.ts"

/**
 * Vite + Solid 2, from Kirana's `vite-solid2` example: Solid 2's JSX is its DOM runtime's
 * (`jsxImportSource: "@solidjs/web"`), from which Kirana's compiler knows Solid and compiles `sx`
 * to `class`, and `@kirana-style/core/solid` types `sx` there. The template Solid on ui-sdk needs.
 */
export const viteSolid2: AppSkeleton = {
  template: "vite-solid2",
  framework: "solid",
  title: "Kirana on Vite + Solid 2",
  source: "src",
  document: "index.html",
  output: "dist",
  files: {
    "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kirana on Vite + Solid 2</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    "src/main.tsx": `import "@kirana-style/core/stylesheet.css"
import { render } from "@solidjs/web"

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
  dependencies: [solid2("solid-js"), solid2("@solidjs/web")],
  devDependencies: ["typescript", "vite", solid2("@solidjs/vite-plugin")],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
  typecheck: "tsc --noEmit",
  vite: {
    imports: ['import solid from "@solidjs/vite-plugin"'],
    plugins: ["kirana()", "solid()"],
    note: "Kirana before Solid's plugin: `sx` compiles to `class`, as Solid's JSX spells it.",
  },
  tsconfig: {
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      jsx: "preserve",
      // In this file, not one it extends: Kirana reads it here to know Solid 2's JSX.
      jsxImportSource: "@solidjs/web",
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      types: ["vite/client", "@kirana-style/core/solid"],
    },
    include: ["src", "*.ts"],
  },
}
