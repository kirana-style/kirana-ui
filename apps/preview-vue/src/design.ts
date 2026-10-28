/**
 * The preview's design: the URL's or the reader's saved one, then the framing page's messages
 * (`followPageDesign`). It lives on `<html>` as attributes; the app reads it only for the icon
 * library and the reading direction.
 */
import {
  followPageDesign,
  readPageDesign,
} from "@workspace/registry/core/preview.ts"
import { ref } from "vue"

export const design = ref(readPageDesign(location.search, document.cookie))

/** Puts the design on `<html>` and keeps it there as messages arrive. */
export function followDesign() {
  followPageDesign((next) => {
    design.value = next
  })
}
