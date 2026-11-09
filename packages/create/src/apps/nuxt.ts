import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const nuxt: AppSkeleton = {
  template: "nuxt",
  framework: "vue",
  title: "Kirana on Nuxt",
  // Nuxt maps `@/*` and `~/*` to `app/` itself, in the tsconfigs `nuxt prepare` writes.
  source: null,
  // Nuxt renders `<html>` from `<Html>` in app.vue, which `init` does not read as the document:
  // it prints the attributes and styles to put there (KF-112, 0.4.1).
  document: "app/app.vue",
  output: ".output/public",
  files: {
    "nuxt.config.ts": `import kirana from "@kirana-style/vite"

export default defineNuxtConfig({
  css: ["@kirana-style/core/stylesheet.css"],
  vite: { plugins: [kirana()] },
})
`,
    "app/app.vue": `<script setup lang="ts">
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
  <!-- Nuxt's <Html> renders the document's <html>: the design system's attributes and styles go here. -->
  <Html lang="en">
    <Body>
      <main :sx="styles.main">
        <div>
          <h1>${WELCOME.heading}</h1>
          <p>${WELCOME.text}</p>
          <code :sx="styles.command">${WELCOME.command}</code>
        </div>
      </main>
    </Body>
  </Html>
</template>
`,
  },
  dependencies: ["nuxt", "vue"],
  devDependencies: ["typescript", "vue-tsc"],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: {
    dev: "nuxt dev",
    build: "nuxt build",
    generate: "nuxt generate",
    preview: "nuxt preview",
    postinstall: "nuxt prepare",
  },
  typecheck: "nuxt typecheck",
  // Nuxt 4's starter: it references what `nuxt prepare` writes in `.nuxt`.
  tsconfig: {
    files: [],
    references: [
      { path: "./.nuxt/tsconfig.app.json" },
      { path: "./.nuxt/tsconfig.server.json" },
      { path: "./.nuxt/tsconfig.shared.json" },
      { path: "./.nuxt/tsconfig.node.json" },
    ],
  },
  ignore: [".nuxt/", ".output/", ".data/"],
}
