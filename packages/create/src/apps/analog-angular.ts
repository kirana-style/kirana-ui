import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const analogAngular: AppSkeleton = {
  template: "analog-angular",
  framework: "angular",
  title: "Kirana on Analog",
  source: "src",
  document: "index.html",
  output: "dist/analog/public",
  files: {
    "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kirana on Analog</title>
    <base href="/" />
  </head>
  <body>
    <app-root></app-root>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    "src/main.ts": `import "@kirana-style/core/stylesheet.css"
import { bootstrapApplication } from "@angular/platform-browser"
import { provideFileRouter } from "@analogjs/router"

import { App } from "./app/app"

bootstrapApplication(App, { providers: [provideFileRouter()] })
`,
    "src/vite-env.d.ts": `/// <reference types="vite/client" />
`,
    "src/app/app.ts": `import { Component } from "@angular/core"
import { RouterOutlet } from "@angular/router"

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  template: \`<router-outlet />\`,
})
export class App {}
`,
    "src/app/pages/index.page.ts": `import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
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

@Component({
  selector: "app-home",
  imports: [SxDirective],
  template: \`<main [sx]="styles.main">
    <div>
      <h1>${WELCOME.heading}</h1>
      <p>${WELCOME.text}</p>
      <code [sx]="styles.command">${WELCOME.command}</code>
    </div>
  </main>\`,
})
export default class Home {
  protected readonly styles = styles
}
`,
    "tsconfig.app.json": `{
  "extends": "./tsconfig.json",
  "compilerOptions": { "outDir": "./out-tsc/app", "types": [] },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts", "src/app/pages/**/*.page.ts"]
}
`,
  },
  dependencies: [
    "@analogjs/router",
    "@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/platform-browser",
    "@angular/platform-server",
    "@angular/router",
    "rxjs",
    "tslib",
  ],
  devDependencies: [
    "@analogjs/platform",
    "@analogjs/vite-plugin-angular",
    "@angular/build",
    "@angular/compiler-cli",
    { name: "typescript", version: "~6.0.0" },
    "vite",
  ],
  kirana: { dependencies: ["@kirana-style/angular"] },
  scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
  typecheck: "tsc -p tsconfig.app.json --noEmit",
  vite: {
    imports: [
      'import analog from "@analogjs/platform"',
      'import { kiranaAngular } from "@kirana-style/angular/vite"',
    ],
    plugins: [
      "analog({ ssr: false, static: true, prerender: { routes: [] } })",
      "kiranaAngular()",
    ],
    options: [
      'build: { target: ["es2022"] }',
      'resolve: { mainFields: ["module"], tsconfigPaths: true }',
    ],
    note: "Kirana after Analog: Angular compiles each file from disk, and Kirana compiles what it emitted.",
  },
  tsconfig: {
    compileOnSave: false,
    compilerOptions: {
      ignoreDeprecations: "6.0",
      strict: true,
      experimentalDecorators: true,
      moduleResolution: "bundler",
      isolatedModules: true,
      importHelpers: true,
      target: "ES2022",
      module: "ES2022",
      lib: ["ES2022", "dom"],
      useDefineForClassFields: false,
      skipLibCheck: true,
      allowImportingTsExtensions: true,
    },
    angularCompilerOptions: {
      strictInjectionParameters: true,
      strictInputAccessModifiers: true,
      strictTemplates: true,
    },
  },
  ignore: [".kirana/", "out-tsc/"],
}
