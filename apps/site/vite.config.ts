import { readdirSync } from "node:fs"
import { fileURLToPath } from "node:url"

import { build } from "vite-plus"
import type { Plugin } from "vite-plus"
import { defineAppConfig } from "@workspace/vite-config"

const REGISTRY = fileURLToPath(new URL("../../registry/", import.meta.url))

/**
 * Every React preview page, `/preview/react/<base>/<item>`: each base's examples and blocks, the
 * items its `previews.ts` maps.
 */
function previewPages() {
  return ["base", "aria"].flatMap((base) => {
    const folder = `${REGISTRY}bases/react-${base}/`
    const examples = readdirSync(`${folder}examples`)
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => file.slice(0, -4))
    const blocks = readdirSync(`${folder}blocks`)
    return [...examples, ...blocks].map(
      (item) => `/preview/react/${base}/${item}`
    )
  })
}

/**
 * `__DESIGN_SCRIPT__`: `registry/core/design-script.ts` bundled on its own and minified, as a string
 * the root writes inline before the first paint (X-7). Bundled apart from the app so it carries the
 * decoder and nothing else. A constant rather than a virtual module, which Kirana's resolver cannot
 * follow from the root's styled module (KF-045, a workaround until a Kirana release fixes it); a
 * change to the script needs the dev server restarted.
 */
function designScript(): Plugin {
  return {
    name: "design-script",
    async config() {
      const output = await build({
        configFile: false,
        logLevel: "silent",
        build: {
          write: false,
          minify: true,
          lib: {
            entry: `${REGISTRY}core/design-script.ts`,
            formats: ["iife"],
            name: "designScript",
          },
        },
      })
      const [bundle] = Array.isArray(output) ? output : [output]
      const code = "output" in bundle ? bundle.output[0].code.trim() : ""
      return { define: { __DESIGN_SCRIPT__: JSON.stringify(code) } }
    },
  }
}

// The site deploys as the Cloudflare Worker `ui` (wrangler.jsonc), its pages prerendered into the
// static files the Worker's assets serve: those reached from `/`, and every preview.
export default defineAppConfig({
  cloudflare: true,
  prerender: true,
  pages: previewPages(),
  plugins: [designScript()],
})
