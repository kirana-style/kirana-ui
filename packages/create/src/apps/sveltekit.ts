import type { AppSkeleton } from "../app.ts"
import { WELCOME } from "../app.ts"

export const sveltekit: AppSkeleton = {
  template: "sveltekit",
  framework: "svelte",
  title: "Kirana on SvelteKit",
  source: "src",
  document: "src/app.html",
  output: "build",
  files: {
    "src/app.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kirana on SvelteKit</title>
    %sveltekit.head%
  </head>
  <body>
    <div>%sveltekit.body%</div>
  </body>
</html>
`,
    // Where SvelteKit imports Kirana's stylesheet: `init` imports the design system's reset and
    // the fonts here after it, and writes `src/hooks.server.ts`, which gives the static app.html's
    // `<html>` the design system's styles.
    "src/routes/+layout.svelte": `<script lang="ts">
  import "@kirana-style/core/stylesheet.css"

  let { children } = $props()
</script>

{@render children()}
`,
    "src/routes/+layout.ts": `// A static site: every page is rendered at build time. Drop it for a server.
export const prerender = true
`,
    "src/routes/+page.svelte": `<script lang="ts">
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

<main sx={styles.main}>
  <div>
    <h1>${WELCOME.heading}</h1>
    <p>${WELCOME.text}</p>
    <code sx={styles.command}>${WELCOME.command}</code>
  </div>
</main>
`,
  },
  dependencies: [],
  devDependencies: [
    "@sveltejs/adapter-static",
    "@sveltejs/kit",
    "@sveltejs/vite-plugin-svelte",
    "svelte",
    "svelte-check",
    "typescript",
    "vite",
  ],
  kirana: { devDependencies: ["@kirana-style/vite"] },
  scripts: {
    dev: "vite dev",
    build: "vite build",
    preview: "vite preview",
    prepare: "svelte-kit sync || echo ''",
  },
  // `svelte-kit sync` has run: at install (`prepare`) and by every build.
  typecheck: "svelte-check --tsconfig ./tsconfig.json",
  vite: {
    imports: [
      'import adapter from "@sveltejs/adapter-static"',
      'import { sveltekit } from "@sveltejs/kit/vite"',
    ],
    plugins: ["kirana()", "sveltekit({ adapter: adapter() })"],
    note: "Kirana before SvelteKit, so every component reaches Svelte already compiled. SvelteKit 3 takes its configuration here, and refuses a svelte.config.js.",
  },
  // SvelteKit 3's starter: it extends the `$app/tsconfig` that `svelte-kit sync` writes, and
  // maps no alias of its own (`$lib` became a package.json import), so `@/*` goes here.
  tsconfig: {
    extends: "$app/tsconfig",
    compilerOptions: {
      strict: true,
      allowImportingTsExtensions: true,
      // `types` replaces the starter's, so SvelteKit's own stay in it.
      types: ["$app/types", "@kirana-style/core/svelte"],
    },
    // The components too: Vite resolves a tsconfig alias only in a file the tsconfig compiles.
    include: ["src", "src/**/*.svelte", "*.ts"],
  },
  ignore: [".svelte-kit/", "build/"],
}
