/** Every app skeleton, by template. */
import type { Template } from "../catalog.ts"
import type { AppSkeleton } from "../app.ts"
import { analogAngular } from "./analog-angular.ts"
import { angularCli } from "./angular-cli.ts"
import { nextTurbopack } from "./next-turbopack.ts"
import { solidStart } from "./solid-start.ts"
import { tanstackStart } from "./tanstack-start.ts"
import { viteReact } from "./vite-react.ts"
import { viteSolid } from "./vite-solid.ts"
import { viteSvelte } from "./vite-svelte.ts"
import { viteVue } from "./vite-vue.ts"

export const APPS: Record<Template, AppSkeleton> = {
  "vite-react": viteReact,
  "tanstack-start": tanstackStart,
  "next-turbopack": nextTurbopack,
  "vite-vue": viteVue,
  "vite-svelte": viteSvelte,
  "vite-solid": viteSolid,
  "solid-start": solidStart,
  "analog-angular": analogAngular,
  "angular-cli": angularCli,
}
