import { relation } from "@kirana-style/core"

/**
 * The colour mode the page shows, readable by anything under `<html>`: the site's root applies
 * `schemeMarker.anchor` with `data-mode="light" | "dark" | "system"` (`themeDocumentProps`). It is
 * for what `light-dark()` cannot switch: which icon a theme control shows, an image per scheme.
 *
 * A file of its own, so a reader imports the marker and nothing else.
 */
export const schemeMarker = relation("scheme")
