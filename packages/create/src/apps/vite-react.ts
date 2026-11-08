import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

const main = `import { css } from "@kirana-style/core"

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
`

export const viteReact: AppSkeleton = {
  template: "vite-react",
  framework: "react",
  title: "Kirana on Vite + React",
  source: "src",
  document: "index.html",
  output: "dist",
  files: {
    "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kirana on Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    "src/main.tsx": `import "@kirana-style/core/stylesheet.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
`,
    "src/App.tsx": main,
  },
  dependencies: ["react", "react-dom"],
  devDependencies: [
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "typescript",
    "vite",
  ],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
  typecheck: "tsc --noEmit",
  vite: {
    imports: ['import react from "@vitejs/plugin-react"'],
    plugins: ["kirana()", "react()"],
    note: "Kirana before React's plugin, so components reach it as source.",
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
}
