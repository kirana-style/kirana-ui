/**
 * The typeset preview's fonts, each loaded when it is picked: the site's own pages carry Inter and
 * Geist only (`styles/registry.css`), so the others are a stylesheet each, fetched by the preview
 * the first time a typeset names it.
 */
import type { TypesetFont } from "@/lib/typeset"

const LOADERS: Record<TypesetFont, () => Promise<unknown>> = {
  geist: async () => {},
  inter: async () => {},
  "ibm-plex-sans": () => import("@fontsource-variable/ibm-plex-sans"),
  lora: () => import("@fontsource-variable/lora"),
  merriweather: () => import("@fontsource-variable/merriweather"),
  "noto-serif": () => import("@fontsource-variable/noto-serif"),
  "geist-mono": () => import("@fontsource-variable/geist-mono"),
  "jetbrains-mono": () => import("@fontsource-variable/jetbrains-mono"),
}

const loaded = new Map<TypesetFont, Promise<unknown>>()

/** Loads each font once. */
export function loadFonts(fonts: readonly TypesetFont[]) {
  return Promise.all(
    fonts.map((font) => {
      let pending = loaded.get(font)
      if (!pending) {
        pending = LOADERS[font]()
        loaded.set(font, pending)
      }
      return pending
    })
  )
}
