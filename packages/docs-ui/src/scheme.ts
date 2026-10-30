/**
 * The colour scheme the site shows, readable by anything under `<html>`: the site's own marker
 * (`@workspace/shell`'s, which `themeDocumentProps` anchors on `<html>` with `data-mode="light" |
 * "dark" | "system"`), so the frame and the site read one relation. It is for what `light-dark()`
 * cannot switch: an image per scheme, as a brand logo has.
 */
export { schemeMarker } from "@workspace/shell/scheme-marker"
