/**
 * The preview's design: the URL's or the reader's saved one (`readPageDesign`) once, then the
 * framing page's messages. It lives on
 * `<html>` as attributes; the app reads it only for the icon library and the reading direction.
 */
import {
  applyDocumentAttributes,
  documentAttributes,
  MODE_COOKIE,
  forwardModeKey,
  listenForDesign,
  previewQuery,
  readColourMode,
  readPageDesign,
} from "@workspace/registry/core/preview.ts"
import { ref } from "vue"

export const design = ref(readPageDesign(location.search, document.cookie))

/** Puts the design on `<html>` and keeps it there as messages arrive. */
export function followDesign() {
  const root = document.documentElement
  root.dataset.mode = readColourMode(location.search, document.cookie)
  // The site's theme provider tells every page of the site a change of mode on this channel.
  if (typeof BroadcastChannel !== "undefined")
    new BroadcastChannel(MODE_COOKIE).onmessage = (event: MessageEvent) => {
      if (
        event.data === "light" ||
        event.data === "dark" ||
        event.data === "system"
      )
        root.dataset.mode = event.data
    }
  applyDocumentAttributes(root, documentAttributes(design.value))
  forwardModeKey(window)
  listenForDesign(window, (next) => {
    design.value = next
    applyDocumentAttributes(root, documentAttributes(next))
    // The URL takes the design too, so a reload keeps it.
    history.replaceState(null, "", `${location.pathname}?${previewQuery(next)}`)
  })
}
