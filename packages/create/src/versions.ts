/**
 * The packages a skeleton names and their ranges, looked up on 2026-11-08 and 2026-11-09 (`npm view <name>
 * version`); Kirana's own come from this repository's catalog at build (`compose`'s `kirana`).
 * One table, so a bump is one line and every skeleton moves together.
 */
export const VERSIONS = {
  // Frameworks and their build.
  vite: "^8.3.0",
  react: "^19.3.0",
  "react-dom": "^19.3.0",
  "@types/react": "^19.3.0",
  "@types/react-dom": "^19.3.0",
  "@vitejs/plugin-react": "^6.1.2",
  "@tanstack/react-router": "^1.170.45",
  "@tanstack/react-start": "^1.169.3",
  "@tanstack/solid-router": "^1.170.43",
  "@tanstack/solid-start": "^1.169.5",
  "react-router": "^8.5.1",
  "@react-router/dev": "^8.5.1",
  "@react-router/node": "^8.5.1",
  isbot: "^5.2.2",
  astro: "^7.4.7",
  "@astrojs/react": "^7.1.4",
  "@inertiajs/react": "^3.11.0",
  "laravel-vite-plugin": "^3.2.1",
  next: "^16.3.6",
  postcss: "^8.5.28",
  vue: "^3.5.43",
  nuxt: "^4.6.4",
  "@vitejs/plugin-vue": "^6.0.9",
  "vue-tsc": "^3.2.0",
  svelte: "^5.57.1",
  "@sveltejs/kit": "^3.1.1",
  "@sveltejs/adapter-static": "^4.0.1",
  "@sveltejs/vite-plugin-svelte": "^7.3.0",
  "svelte-check": "^4.7.8",
  "solid-js": "^1.9.17",
  "vite-plugin-solid": "^2.11.14",
  "@solidjs/meta": "^0.29.4",
  "@solidjs/router": "^1.0.0",
  "@solidjs/start": "^2.0.6",
  nitro: "^3.0.260903-beta",
  "@angular/common": "^22.2.1",
  "@angular/compiler": "^22.2.1",
  "@angular/core": "^22.2.1",
  "@angular/platform-browser": "^22.2.1",
  "@angular/platform-server": "^22.2.1",
  "@angular/router": "^22.2.1",
  "@angular/build": "^22.2.1",
  "@angular/cli": "^22.2.1",
  "@angular/compiler-cli": "^22.2.1",
  "@analogjs/router": "^2.8.0",
  "@analogjs/platform": ">=2.8.0 <2.9.3 || ^2.9.4",
  "@analogjs/vite-plugin-angular": "^2.8.0",
  rxjs: "~7.8.0",
  tslib: "^2.3.0",
  // TypeScript 6: typescript-eslint and Angular's compiler do not take 7 yet.
  typescript: "~6.0.0",
  "@types/node": "^26.6.6",
  // Tooling.
  eslint: "^10.14.0",
  "@eslint/js": "^10.0.1",
  globals: "^17.14.0",
  "typescript-eslint": "^8.72.1",
  "eslint-plugin-react-hooks": "^7.1.1",
  "eslint-plugin-react-refresh": "^0.5.7",
  "eslint-plugin-vue": "^10.12.0",
  "eslint-plugin-svelte": "^3.24.1",
  "eslint-plugin-solid": "^0.19.0",
  "angular-eslint": "^22.6.0",
  prettier: "^3.9.10",
  "prettier-plugin-svelte": "^4.1.1",
  // Oxlint and Oxfmt at the releases Vite+ 1.8.0 runs, which this repository's own checks pass on.
  oxlint: "~1.94.0",
  oxfmt: "~0.79.0",
  "@biomejs/biome": "^2.6.6",
  turbo: "^2.11.10",
  "vite-plus": "1.8.0",
  // From 1.7.0 the core's version names the Vite it bundles (8.3.8), no longer Vite+'s own.
  "@voidzero-dev/vite-plus-core": "8.3.8001",
} as const

export type Versioned = keyof typeof VERSIONS

/**
 * What a Vite+ project's `vite` resolves to: Vite+'s core, at the version that names the Vite it
 * bundles (not Vite+'s own release since 1.7.0).
 */
export const VITE_PLUS_VITE = `npm:@voidzero-dev/vite-plus-core@${VERSIONS["@voidzero-dev/vite-plus-core"]}`

/**
 * Solid 2's packages, for the Solid 2 template (`vite-solid2`, which Solid on ui-sdk needs): its
 * `solid-js` cannot share Solid 1's entry above, so a skeleton names each as `{ name, version }`
 * (`solid2("solid-js")`). Looked up on 2026-11-20.
 */
export const SOLID_2 = {
  "solid-js": "^2.0.3",
  "@solidjs/web": "^2.0.3",
  "@solidjs/vite-plugin": "^3.0.1",
} as const

export const solid2 = (name: keyof typeof SOLID_2) => ({
  name,
  version: SOLID_2[name],
})

/**
 * What a Turborepo's root writes for `packageManager`, which turbo needs: `kirana-style ui init
 * --template` fills it with the package manager running it, at its version.
 */
export const PACKAGE_MANAGER = "{packageManager}"

/** Biome's schema is per release, so the package is pinned to the schema `biome.json` names. */
export const BIOME_VERSION = "2.6.6"
export const BIOME_SCHEMA = `https://biomejs.dev/schemas/${BIOME_VERSION}/schema.json`
