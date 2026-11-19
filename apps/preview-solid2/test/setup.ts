/**
 * The page every test mounts into, as the preview app's own page is (`src/main.tsx`): the fonts,
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

document.documentElement.className =
  props(root, axes.anchor, page.document).class ?? ""
document.body.className = props(page.body).class ?? ""
