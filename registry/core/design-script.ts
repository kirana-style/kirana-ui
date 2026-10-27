/**
 * The design a preview's URL names, written on `<html>` before the first paint: what a static
 * preview page runs inline, first in `<head>` (X-7). The site bundles this module on its own at
 * build time, so the script carries the preset decoder and the attributes, not the encoder or
 * anything a page renders.
 */
import {
  applyDocumentAttributes,
  documentAttributes,
  readPreviewDesign,
} from "./preview"

applyDocumentAttributes(
  document.documentElement,
  documentAttributes(readPreviewDesign(new URLSearchParams(location.search)))
)
