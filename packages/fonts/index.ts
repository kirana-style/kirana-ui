/**
 * Each family of the design system's font axes (`registry/core/config.ts`'s `FONTS`), loaded when
 * a design names it: its Fontsource stylesheet, the package its font item installs
 * (`/r/font-<name>.json`). Every app links Inter and Geist from the start (the default and the
 * site's own), so a page carries no other family until its design, or a picker pointed at one,
 * asks for it; then the browser fetches the files its text uses.
 */
import type { DesignSystem, Font } from "@workspace/registry/core/config"

const LOADERS: Record<Font, () => Promise<unknown>> = {
  inter: () => import("@fontsource-variable/inter"),
  "noto-sans": () => import("@fontsource-variable/noto-sans"),
  "nunito-sans": () => import("@fontsource-variable/nunito-sans"),
  figtree: () => import("@fontsource-variable/figtree"),
  roboto: () => import("@fontsource-variable/roboto"),
  raleway: () => import("@fontsource-variable/raleway"),
  "dm-sans": () => import("@fontsource-variable/dm-sans"),
  "public-sans": () => import("@fontsource-variable/public-sans"),
  outfit: () => import("@fontsource-variable/outfit"),
  "jetbrains-mono": () => import("@fontsource-variable/jetbrains-mono"),
  geist: () => import("@fontsource-variable/geist"),
  "geist-mono": () => import("@fontsource-variable/geist-mono"),
  lora: () => import("@fontsource-variable/lora"),
  merriweather: () => import("@fontsource-variable/merriweather"),
  "playfair-display": () => import("@fontsource-variable/playfair-display"),
  "noto-serif": () => import("@fontsource-variable/noto-serif"),
  "roboto-slab": () => import("@fontsource-variable/roboto-slab"),
  oxanium: () => import("@fontsource-variable/oxanium"),
  manrope: () => import("@fontsource-variable/manrope"),
  "space-grotesk": () => import("@fontsource-variable/space-grotesk"),
  montserrat: () => import("@fontsource-variable/montserrat"),
  "ibm-plex-sans": () => import("@fontsource-variable/ibm-plex-sans"),
  "source-sans-3": () => import("@fontsource-variable/source-sans-3"),
  "instrument-sans": () => import("@fontsource-variable/instrument-sans"),
  "eb-garamond": () => import("@fontsource-variable/eb-garamond"),
  "instrument-serif": () => import("@fontsource/instrument-serif"),
}

/** Inter and Geist are every app's from the start. */
const LINKED = new Set<Font>(["inter", "geist"])

const loaded = new Map<Font, Promise<unknown>>()

/** Loads each family once. */
export function loadFonts(fonts: readonly Font[]): Promise<unknown[]> {
  return Promise.all(
    fonts
      .filter((font) => !LINKED.has(font))
      .map((font) => {
        let pending = loaded.get(font)
        if (!pending) {
          pending = LOADERS[font]()
          loaded.set(font, pending)
        }
        return pending
      })
  )
}

/** The families a design shows: its font, and its heading font when that is its own. */
export function loadDesignFonts(
  system: Pick<DesignSystem, "font" | "fontHeading">
): Promise<unknown[]> {
  return loadFonts(
    system.fontHeading === "inherit"
      ? [system.font]
      : [system.font, system.fontHeading]
  )
}
