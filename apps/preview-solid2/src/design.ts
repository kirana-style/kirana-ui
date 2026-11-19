/**
 * The preview's design, Svelte's `design.svelte.ts` as a Solid signal: the URL's or the reader's
 * saved one, then the framing page's messages (`followPageDesign`). It lives on `<html>` as
 * attributes; the app reads it for the icon library and a right-to-left demo's language.
 */
import { loadDesignFonts, loadLanguageFont } from "@workspace/fonts"
import {
  followPageDesign,
  readPageDesign,
} from "@workspace/registry/core/preview.ts"
import { createSignal } from "solid-js"

const [design, setDesign] = createSignal(
  readPageDesign(location.search, document.cookie)
)
export { design }

/** A right-to-left demo's family (Noto Sans Arabic or Hebrew), as upstream's previews read them. */
function loadLanguage(language: string | undefined) {
  if (language && language !== "en") void loadLanguageFont(language)
}

/** Puts the design on `<html>` and keeps it there as messages arrive. */
export function followDesign() {
  const first = followPageDesign((next) => {
    setDesign(next)
    void loadDesignFonts(next.system)
    loadLanguage(next.options.language)
  })
  void loadDesignFonts(first.system)
  loadLanguage(first.options.language)
}
