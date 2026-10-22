import { relation } from "@kirana-style/core"

/**
 * The colour mode the page shows, readable by anything under `<html>`: each app applies
 * `schemeMarker.anchor` to its root element with `data-mode="light" | "dark" | "system"`. It is for
 * what `light-dark()` cannot switch: which icon a theme control shows, an image per scheme.
 *
 * A file of its own (D-062): only the apps' roots (the anchor) and the theme controls in
 * `@workspace/shell` (the readers) import it.
 */
export const schemeMarker = relation("scheme")
