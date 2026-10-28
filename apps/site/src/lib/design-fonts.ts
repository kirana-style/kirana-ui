/**
 * The design's families, for the site's pages and its React previews: the loader
 * (`@workspace/fonts`, a stylesheet per family) is fetched only when a design names a family the
 * page does not link, so a page in the default design carries none of it.
 */
import type { DesignSystem } from "@workspace/registry/core/config"

/** Inter and Geist, which every page links. */
const LINKED = new Set<string>(["inter", "geist", "inherit"])

export function loadDesignFonts(
  system: Pick<DesignSystem, "font" | "fontHeading">
): Promise<unknown> {
  if (LINKED.has(system.font) && LINKED.has(system.fontHeading))
    return Promise.resolve()
  return import("@workspace/fonts").then((fonts) =>
    fonts.loadDesignFonts(system)
  )
}
