/** Every app skeleton, by template. */
import type { Template } from "../catalog.ts"
import type { AppSkeleton } from "../app.ts"
import { analogAngular } from "./analog-angular.ts"
import { angularCli } from "./angular-cli.ts"
import { astroReact } from "./astro-react.ts"
import { laravelInertia } from "./laravel-inertia.ts"
import { nextTurbopack } from "./next-turbopack.ts"
import { nuxt } from "./nuxt.ts"
import { reactRouter } from "./react-router.ts"
import { solidStart } from "./solid-start.ts"
import { sveltekit } from "./sveltekit.ts"
import { tanstackStart } from "./tanstack-start.ts"
import { tanstackStartSolid } from "./tanstack-start-solid.ts"
import { viteReact } from "./vite-react.ts"
import { viteSolid } from "./vite-solid.ts"
import { viteSvelte } from "./vite-svelte.ts"
import { viteVue } from "./vite-vue.ts"

export const APPS: Record<Template, AppSkeleton> = {
  "vite-react": viteReact,
  "tanstack-start": tanstackStart,
  "react-router": reactRouter,
  "next-turbopack": nextTurbopack,
  "astro-react": astroReact,
  "laravel-inertia": laravelInertia,
  "vite-vue": viteVue,
  nuxt,
  "vite-svelte": viteSvelte,
  sveltekit,
  "vite-solid": viteSolid,
  "solid-start": solidStart,
  "tanstack-start-solid": tanstackStartSolid,
  "analog-angular": analogAngular,
  "angular-cli": angularCli,
}
