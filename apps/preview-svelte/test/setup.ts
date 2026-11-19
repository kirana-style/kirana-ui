/**
 * The page every test mounts into, as the preview app's own page is (`src/main.ts`): the fonts,
 * Kirana's and the registry's stylesheets, the root's tokens on `<html>` and the page's body.
 */
import "@fontsource-variable/inter"
import "@fontsource-variable/geist"
import "@kirana-style/core/stylesheet.css"
import "@workspace/registry/styles/reset.css"
import "@workspace/registry/styles/typeset.css"
import { props } from "@kirana-style/core"
import { axes } from "@workspace/registry/core/axes.ts"
import { root } from "@workspace/registry/core/root.ts"
import { page } from "@workspace/registry/styles/page.styles.ts"

document.documentElement.className = props(root, axes.anchor, page.document)
  .className as string
document.body.className = props(page.body).className as string

// Kirana UI Primitives' `Part` draws a void element (a control's native `input`, the avatar's
// `img`) with a children block, which Svelte warns of in development on every render (PF-040).
// Nothing a base can reach: those elements are the primitives' own. Kept out of the tests' output
// until the primitives' release that fixes it.
const warn = console.warn.bind(console)
console.warn = (...args: unknown[]) => {
  if (String(args[0]).includes("dynamic_void_element_content")) return
  warn(...args)
}
