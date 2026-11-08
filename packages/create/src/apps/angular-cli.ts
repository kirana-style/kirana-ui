import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const angularCli: AppSkeleton = {
  template: "angular-cli",
  framework: "angular",
  title: "Kirana on the Angular CLI",
  source: "src",
  document: "src/index.html",
  output: "dist/app/browser",
  files: {
    "angular.json": `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": { "analytics": false },
  "newProjectRoot": "projects",
  "projects": {
    "app": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@kirana-style/angular:application",
          "options": {
            "browser": "src/main.ts",
            "index": "src/index.html",
            "tsConfig": "tsconfig.app.json",
            "outputPath": "dist/app"
          },
          "configurations": {
            "production": { "outputHashing": "all" },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@kirana-style/angular:dev-server",
          "configurations": {
            "production": { "buildTarget": "app:build:production" },
            "development": { "buildTarget": "app:build:development" }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  }
}
`,
    "src/index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kirana on the Angular CLI</title>
    <base href="/" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
`,
    "src/main.ts": `import "@kirana-style/core/stylesheet.css"
import { bootstrapApplication } from "@angular/platform-browser"

import { App } from "./app/app"

bootstrapApplication(App)
`,
    "src/app/app.ts": `import { Component } from "@angular/core"
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
  selector: "app-root",
  imports: [SxDirective],
  template: \`<main [sx]="styles.main">
    <div>
      <h1>${WELCOME.heading}</h1>
      <p>${WELCOME.text}</p>
      <code [sx]="styles.command">${WELCOME.command}</code>
    </div>
  </main>\`,
})
export class App {
  protected readonly styles = styles
}
`,
    "tsconfig.app.json": `{
  "extends": "./tsconfig.json",
  "compilerOptions": { "outDir": "./out-tsc/app", "types": [] },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts"]
}
`,
  },
  dependencies: [
    "@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/platform-browser",
    "rxjs",
    "tslib",
  ],
  devDependencies: [
    "@angular/build",
    "@angular/cli",
    "@angular/compiler-cli",
    { name: "typescript", version: "~6.0.0" },
  ],
  kirana: { dependencies: ["@kirana-style/angular"] },
  scripts: { dev: "ng serve", build: "ng build" },
  typecheck: "tsc -p tsconfig.app.json --noEmit",
  tsconfig: {
    compileOnSave: false,
    compilerOptions: {
      strict: true,
      experimentalDecorators: true,
      moduleResolution: "bundler",
      isolatedModules: true,
      importHelpers: true,
      target: "ES2022",
      module: "preserve",
      skipLibCheck: true,
      allowImportingTsExtensions: true,
    },
    angularCompilerOptions: {
      strictInjectionParameters: true,
      strictInputAccessModifiers: true,
      strictTemplates: true,
    },
  },
  ignore: [".kirana/", ".angular/", "out-tsc/"],
}
