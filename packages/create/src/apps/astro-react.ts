import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const astroReact: AppSkeleton = {
  template: "astro-react",
  framework: "react",
  title: "Kirana on Astro with React",
  source: "src",
  document: "src/layouts/Layout.astro",
  output: "dist",
  files: {
    "astro.config.mjs": `import react from "@astrojs/react"
import kirana from "@kirana-style/astro"
import { defineConfig } from "astro/config"

// Kirana ahead of React, so an island reaches React's compiler with \`sx\` already a class.
export default defineConfig({ integrations: [kirana(), react()] })
`,
    "src/layouts/Layout.astro": `---
import "@kirana-style/core/stylesheet.css"

/** The layout every page renders in: the root document, which \`kirana-style ui init\` sets up. */
const { title } = Astro.props
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
`,
    "src/pages/index.astro": `---
import Welcome from "../components/Welcome.tsx"
import Layout from "../layouts/Layout.astro"
---

<Layout title="Kirana on Astro with React">
  <Welcome client:load />
</Layout>
`,
    "src/components/Welcome.tsx": `import { css } from "@kirana-style/core"

const styles = {
  main: css({
    display: "grid",
    placeItems: "center",
    minHeight: "100svh",
    textAlign: "center",
  }),
  command: css({ fontFamily: "monospace" }),
}

/** A React island: rendered on the server, hydrated with \`client:load\`. */
export default function Welcome() {
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
  dependencies: ["@astrojs/react", "astro", "react", "react-dom"],
  devDependencies: ["@types/react", "@types/react-dom", "typescript"],
  kirana: { devDependencies: ["@kirana-style/astro"] },
  scripts: {
    dev: "astro dev",
    build: "astro build",
    preview: "astro preview",
  },
  // `astro check` reads `.astro` files too, through its language server; `tsc` the islands.
  typecheck: "tsc --noEmit",
  tsconfig: {
    extends: "astro/tsconfigs/strict",
    compilerOptions: {
      jsx: "react-jsx",
      jsxImportSource: "react",
      noEmit: true,
      types: ["@kirana-style/core/react"],
    },
    include: [".astro/types.d.ts", "src"],
    exclude: ["dist"],
  },
  ignore: [".astro/"],
}
