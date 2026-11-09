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
    // `init` reads no `.svelte` file as the script importing Kirana's stylesheet, so it prints the
    // design system's reset and the font as imports to add here by hand (KF-113, 0.4.1): the
    // reset is known, the font comes with the preset.
    "src/routes/+layout.svelte": `<script lang="ts">
  import "@kirana-style/core/stylesheet.css"
  import "@/components/ui/reset.css"

  let { children } = $props()
</script>

{@render children()}
`,
    // `app.html` is static, so `<html>`'s classes come from the server hook: what `init` writes
    // into a Vite app's entry, for SvelteKit's render (KF-113, 0.4.1).
    "src/hooks.server.ts": `import { props } from "@kirana-style/core"
import type { Handle } from "@sveltejs/kit/hooks"

import { htmlStyles } from "@/lib/kirana/document"

/**
 * The design system's styles on the document element, which the static app.html cannot take
 * itself. The tag is matched, not written: a source holding the tag's text reads as the document
 * to \`kirana-style ui init\`, which would set the attributes here instead of in app.html.
 */
export const handle: Handle = ({ event, resolve }) =>
  resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace(
        /<html(?=[\\s>])/,
        (tag) => \`\${tag} class="\${props(htmlStyles).className}"\`
      ),
  })
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
