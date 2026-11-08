import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const viteSvelte: AppSkeleton = {
  template: "vite-svelte",
  framework: "svelte",
  title: "Kirana on Vite + Svelte",
  source: "src",
  document: "index.html",
  output: "dist",
  files: {
    "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kirana on Vite + Svelte</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    "src/main.ts": `import "@kirana-style/core/stylesheet.css"
import { mount } from "svelte"

import App from "./App.svelte"

mount(App, { target: document.getElementById("app")! })
`,
    "src/App.svelte": `<script lang="ts">
  import { css } from "@kirana-style/core"

  const styles = {
    main: css({
      display: "grid",
      placeItems: "center",
      minHeight: "100svh",
      textAlign: "center",
    }),
    command: css({ fontFamily: "monospace" }),
  }
</script>

<main sx={styles.main}>
  <div>
    <h1>${WELCOME.heading}</h1>
    <p>${WELCOME.text}</p>
    <code sx={styles.command}>${WELCOME.command}</code>
  </div>
</main>
`,
    "src/vite-env.d.ts": `/// <reference types="vite/client" />
`,
    "svelte.config.js": `import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

export default { preprocess: vitePreprocess() }
`,
  },
  dependencies: ["svelte"],
  devDependencies: [
    "@sveltejs/vite-plugin-svelte",
    "svelte-check",
    "typescript",
    "vite",
  ],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
  typecheck: "svelte-check --tsconfig ./tsconfig.json",
  vite: {
    imports: ['import { svelte } from "@sveltejs/vite-plugin-svelte"'],
    plugins: ["kirana()", "svelte()"],
    note: "Kirana before Svelte, so Svelte compiles the rewritten component.",
  },
  tsconfig: {
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      verbatimModuleSyntax: true,
      allowImportingTsExtensions: true,
      types: ["@kirana-style/core/svelte", "vite/client"],
    },
    include: ["src/**/*.ts", "src/**/*.svelte", "*.ts"],
  },
}
