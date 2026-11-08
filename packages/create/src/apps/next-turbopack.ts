import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const nextTurbopack: AppSkeleton = {
  template: "next-turbopack",
  framework: "react",
  title: "Kirana on Next.js",
  source: ".",
  document: "app/layout.tsx",
  output: ".next/static",
  files: {
    "next.config.mjs": `import { withKirana } from "@kirana-style/next"

// Next.js on Turbopack, its default bundler: the loader compiles modules, and @kirana-style/postcss
// writes the stylesheet at \`@kirana;\` in app/globals.css.
export default withKirana({})
`,
    "postcss.config.mjs": `// Turbopack runs loaders, not plugins: the stylesheet is compiled here, into \`@kirana;\`.
export default { plugins: { "@kirana-style/postcss": {} } }
`,
    "app/globals.css": `/* Kirana's stylesheet, compiled from the project by @kirana-style/postcss. */
@kirana;
`,
    "app/layout.tsx": `import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = { title: "Kirana on Next.js" }

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`,
    "app/page.tsx": `import { css } from "@kirana-style/core"

const styles = {
  main: css({
    display: "grid",
    placeItems: "center",
    minHeight: "100svh",
    textAlign: "center",
  }),
  command: css({ fontFamily: "monospace" }),
}

export default function Page() {
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
    "next-env.d.ts": `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
`,
  },
  dependencies: ["next", "react", "react-dom"],
  devDependencies: [
    "@types/node",
    "@types/react",
    "@types/react-dom",
    "postcss",
    "typescript",
  ],
  kirana: { devDependencies: ["@kirana-style/next", "@kirana-style/postcss"] },
  scripts: { dev: "next dev", build: "next build", start: "next start" },
  typecheck: "tsc --noEmit",
  // Next.js's own compiler options, as `next` writes them on a first run.
  tsconfig: {
    compilerOptions: {
      target: "ES2017",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      allowImportingTsExtensions: true,
      plugins: [{ name: "next" }],
      types: ["@kirana-style/core/react"],
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"],
  },
  ignore: [".next/", "next-env.d.ts"],
}
