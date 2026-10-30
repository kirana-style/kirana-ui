/**
 * One React item alone on its page, `/preview/react/<base>/<item>`, in the design its URL names
 * (`?preset=`, upstream's axis parameters, `rtl`, `pointer`), on the server, which prerenders it,
 * and in the browser, which hydrates it.
 */
import { Suspense, lazy, startTransition, useEffect, useState } from "react"
import type { ComponentType } from "react"
import { DirectionProvider } from "@base-ui/react/direction-provider"
import { css } from "@kirana-style/core"
import { I18nProvider } from "react-aria-components"

import type { DesignSystem } from "@workspace/registry/core/config"
import { LANGUAGES } from "@workspace/registry/core/language"
import {
  followPageDesign,
  previewDirection,
  readPageDesign,
} from "@workspace/registry/core/preview"
import { LanguageProvider } from "@workspace/registry/lib/language"
import type { PreviewDesign } from "@workspace/registry/core/preview"
import { IconLibraryProvider } from "@workspace/registry/icons/icon-placeholder"

type Previews = Record<string, () => Promise<{ default: ComponentType }>>

/**
 * Each base's map of items: small, since each item is its own chunk, loaded only on its own page.
 */
const BASES: Record<string, () => Promise<{ previews: Previews }>> = {
  base: () => import("@workspace/registry/bases/react-base/previews"),
  aria: () => import("@workspace/registry/bases/react-aria/previews"),
}

/** Every page the app has, as `[base, item]`. */
export async function previewPages(): Promise<[string, string][]> {
  const pages = await Promise.all(
    Object.entries(BASES).map(async ([base, load]) =>
      Object.keys((await load()).previews).map((item): [string, string] => [
        base,
        item,
      ])
    )
  )
  return pages.flat()
}

/** An item's component, or `undefined` for a name its base does not have. */
export async function loadItem(
  base: string,
  item: string
): Promise<ComponentType | undefined> {
  const previews = (await BASES[base]?.())?.previews
  return previews && item in previews
    ? (await previews[item]()).default
    : undefined
}

/**
 * The element the page renders into, out of the layout: the item lays out as `<body>`'s child, as
 * upstream's preview page draws it.
 */
export const frame = css({ display: "contents" })

/**
 * Sonner's toaster, as upstream's site mounts it on every page (`top-center`): loaded after the
 * page, since only the items that call `toast()` need it.
 */
const SonnerToaster = lazy(() =>
  import("@workspace/registry/bases/react-base/ui/sonner").then((module) => ({
    default: module.Toaster,
  }))
)

/** Base UI's toaster, which upstream's preview page mounts beside every Base UI item. */
const BaseToaster = lazy(() =>
  import("@workspace/registry/bases/react-base/ui/toast").then((module) => ({
    default: module.Toaster,
  }))
)

/** Inter and Geist, which the page links. */
const LINKED = new Set<string>(["inter", "geist", "inherit"])

/** The design's families, the loader fetched only when a design names one the page does not link. */
function loadDesignFonts(system: Pick<DesignSystem, "font" | "fontHeading">) {
  if (LINKED.has(system.font) && LINKED.has(system.fontHeading)) return
  void import("@workspace/fonts").then((fonts) => fonts.loadDesignFonts(system))
}

/**
 * The page's design. The first render is the prerendered page's, the default, so it hydrates; then
 * the URL's or the saved one, which the inline script has already written on `<html>`, and every
 * design a framing page sends (`followPageDesign`). Only what `<html>` does not carry reads it: the
 * direction and the icon library.
 */
function usePreviewDesign(): [PreviewDesign, boolean] {
  const [design, setDesign] = useState(() => readPageDesign("", ""))
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    const first = followPageDesign((next) => {
      setDesign(next)
      loadDesignFonts(next.system)
    })
    loadDesignFonts(first.system)
    startTransition(() => {
      setDesign(first)
      setHydrated(true)
    })
  }, [])
  return [design, hydrated]
}

export function Preview({ base, Item }: { base: string; Item: ComponentType }) {
  const [design, hydrated] = usePreviewDesign()
  const { language } = design.options
  const dir = previewDirection(design.options)
  const locale = language
    ? LANGUAGES[language].locale
    : dir === "rtl"
      ? "ar"
      : "en-US"
  return (
    <DirectionProvider direction={dir}>
      <I18nProvider locale={locale}>
        <IconLibraryProvider library={design.system.iconLibrary}>
          {/* A right-to-left demo's language; one that the URL does not name is the demo's own. */}
          <LanguageProvider language={language}>
            <Item />
          </LanguageProvider>
          {hydrated && (
            <Suspense>
              <SonnerToaster position="top-center" />
              {base === "base" && <BaseToaster />}
            </Suspense>
          )}
        </IconLibraryProvider>
      </I18nProvider>
    </DirectionProvider>
  )
}
