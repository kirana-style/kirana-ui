/**
 * The page's design, written on `<html>` before the first paint: the URL's when it names one, else
 * the reader's saved design (`kui-preset`), else the default (`readPageDesign`). What every page of
 * the site runs inline, first in `<head>` (X-7). The site bundles this module on its own at build
 * time, so the script carries the preset decoder and the attributes, not the encoder or anything a
 * page renders.
 */
import {
  applyDocumentAttributes,
  documentAttributes,
  readPageDesign,
} from "./preview"

applyDocumentAttributes(
  document.documentElement,
  documentAttributes(readPageDesign(location.search, document.cookie))
)
