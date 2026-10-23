/**
 * The preview's design: read from the URL once, then from the framing page's messages. It lives on
 * `<html>` as attributes; the app reads it only for the icon library and the reading direction.
 */
import {
  applyDocumentAttributes,
  documentAttributes,
  forwardModeKey,
  listenForDesign,
  previewQuery,
  readColourMode,
  readPreviewDesign,
} from "@workspace/registry/core/preview.ts"
import { ref } from "vue"

export const design = ref(
  readPreviewDesign(new URLSearchParams(location.search))
)

/** Puts the design on `<html>` and keeps it there as messages arrive. */
export function followDesign() {
  const root = document.documentElement
  root.dataset.mode = readColourMode(location.search, document.cookie)
  applyDocumentAttributes(root, documentAttributes(design.value))
  forwardModeKey(window)
  listenForDesign(window, (next) => {
    design.value = next
    applyDocumentAttributes(root, documentAttributes(next))
    // The URL takes the design too, so a reload keeps it.
    history.replaceState(null, "", `${location.pathname}?${previewQuery(next)}`)
  })
}
