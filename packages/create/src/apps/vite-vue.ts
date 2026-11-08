import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const viteVue: AppSkeleton = {
  template: "vite-vue",
  framework: "vue",
  title: "Kirana on Vite + Vue",
  source: "src",
  document: "index.html",
  output: "dist",
  files: {
    "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kirana on Vite + Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    "src/main.ts": `import "@kirana-style/core/stylesheet.css"
import { createApp } from "vue"

import App from "./App.vue"

createApp(App).mount("#app")
`,
    "src/App.vue": `<script setup lang="ts">
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

<template>
  <main :sx="styles.main">
    <div>
      <h1>${WELCOME.heading}</h1>
      <p>${WELCOME.text}</p>
      <code :sx="styles.command">${WELCOME.command}</code>
    </div>
  </main>
</template>
`,
    "src/vite-env.d.ts": `/// <reference types="vite/client" />
`,
  },
  dependencies: ["vue"],
  devDependencies: ["@vitejs/plugin-vue", "typescript", "vite", "vue-tsc"],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
  typecheck: "vue-tsc --noEmit",
  vite: {
    imports: ['import vue from "@vitejs/plugin-vue"'],
    plugins: ["kirana()", "vue()"],
    note: "Kirana before Vue's plugin, so each component's script reaches it as source.",
  },
  tsconfig: {
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      moduleResolution: "bundler",
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
      types: ["@kirana-style/core/vue", "vite/client"],
    },
    include: ["src/**/*.ts", "src/**/*.vue", "*.ts"],
  },
}
