/**
 * A React preview page's design and colour mode, written on `<html>` before the first paint: the
 * page is prerendered in the default design and the system's mode, and this puts the URL's design
 * (or the reader's saved one) and mode (`?theme=`, or the site's cookie) on it first (X-7). What
 * `design-script.ts` is to the site's pages, where the site's own script writes the mode.
 */
import {
  applyDocumentAttributes,
  documentAttributes,
  readColourMode,
  readPageDesign,
} from "./preview"

const root = document.documentElement
applyDocumentAttributes(
  root,
  documentAttributes(readPageDesign(location.search, document.cookie))
)
root.dataset.mode = readColourMode(location.search, document.cookie)
