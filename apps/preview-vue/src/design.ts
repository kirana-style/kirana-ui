/**
 * The preview's design: the URL's or the reader's saved one, then the framing page's messages
 * (`followPageDesign`). It lives on `<html>` as attributes; the app reads it only for the icon
 * library, the reading direction and a right-to-left demo's language.
 */
import {
  followPageDesign,
  readPageDesign,
} from "@workspace/registry/core/preview.ts"
import { loadDesignFonts, loadLanguageFont } from "@workspace/fonts"
import { ref } from "vue"

export const design = ref(readPageDesign(location.search, document.cookie))

/** A right-to-left demo's family (Noto Sans Arabic or Hebrew), as upstream's previews read them. */
function loadLanguage(language: string | undefined) {
  if (language && language !== "en") void loadLanguageFont(language)
}

/** Puts the design on `<html>` and keeps it there as messages arrive. */
export function followDesign() {
  const first = followPageDesign((next) => {
    design.value = next
    void loadDesignFonts(next.system)
    loadLanguage(next.options.language)
  })
  void loadDesignFonts(first.system)
  loadLanguage(first.options.language)
}
