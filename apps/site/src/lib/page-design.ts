import { useMemo, useSyncExternalStore } from "react"
import { useRouterState } from "@tanstack/react-router"

import { resolveDesignSystem } from "@workspace/registry/core/config"
import type { DesignSystem } from "@workspace/registry/core/config"
import { encodePreset } from "@workspace/registry/core/preset"
import {
  DESIGN_COOKIE,
  DESIGN_MESSAGE,
  applyDocumentAttributes,
  documentAttributes,
  namesDesign,
  readPageDesign,
} from "@workspace/registry/core/preview"
import type { PreviewDesign } from "@workspace/registry/core/preview"

/**
 * The reader's design on the site (KUI-AXS-004): the URL's when it names one, else the saved
 * `kui-preset` cookie, else the default, as the inline script read it before the first paint.
 *
 * A change (`setDesign`) writes `<html>`'s attributes at once, saves the cookie, replaces the
 * design in a URL that names one (or a reload would undo it), and sends it to every preview framed
 * on the page with upstream's `design-system-params` message. Components that read the design
 * (`usePageDesign`) render again; the page itself does not.
 */
let version = 0
const listeners = new Set<() => void>()

const subscribe = (onChange: () => void) => {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

const YEAR = 60 * 60 * 24 * 365

/** A framed preview's reading direction and pointer, from its address (same origin). */
function frameOptions(frame: HTMLIFrameElement) {
  try {
    const params = new URLSearchParams(frame.contentWindow?.location.search)
    return {
      ...(params.get("rtl") ? { rtl: params.get("rtl") } : {}),
      ...(params.get("pointer") ? { pointer: params.get("pointer") } : {}),
    }
  } catch {
    return {}
  }
}

/** Sends a design to every preview framed on the page, each with its own options. */
function frameDesign(code: string) {
  for (const frame of document.querySelectorAll("iframe")) {
    frame.contentWindow?.postMessage(
      { type: DESIGN_MESSAGE, data: { preset: code, ...frameOptions(frame) } },
      location.origin
    )
  }
}

/**
 * Shows a design on the page and its previews without saving it, as a picker does while the pointer
 * rests on a value; `null` shows the saved one again.
 */
export function previewDesign(asked: DesignSystem | null) {
  const saved = readPageDesign(location.search, document.cookie)
  const system = asked ? resolveDesignSystem(asked).system : saved.system
  applyDocumentAttributes(
    document.documentElement,
    documentAttributes({ system, options: saved.options })
  )
  frameDesign(encodePreset(system))
}

export function setDesign(asked: DesignSystem) {
  const current = readPageDesign(location.search, document.cookie)
  const system = resolveDesignSystem(asked).system
  const design: PreviewDesign = { system, options: current.options }
  const code = encodePreset(system)
  applyDocumentAttributes(document.documentElement, documentAttributes(design))
  document.cookie = `${DESIGN_COOKIE}=${code}; path=/; max-age=${YEAR}; samesite=lax`
  const url = new URL(location.href)
  if (namesDesign(url.searchParams)) {
    // The design by its code alone; the page's other options stay.
    const kept = new URLSearchParams()
    for (const name of ["rtl", "pointer", "theme"]) {
      const value = url.searchParams.get(name)
      // A `theme` that is a colour mode stays; one that is a colour was the design's.
      if (
        value !== null &&
        (name !== "theme" || /^(light|dark|system)$/.test(value))
      )
        kept.set(name, value)
    }
    kept.set("preset", code)
    url.search = kept.toString()
    history.replaceState(history.state, "", url)
  }
  frameDesign(code)
  version++
  for (const listener of listeners) listener()
}

/**
 * The design a page is in. Its first render is the prerendered page's, the default, so it
 * hydrates; then the URL's or the saved one. Read again when the router moves (a preview takes a
 * framing page's design through its URL) and when the reader changes it.
 */
export function usePageDesign(): PreviewDesign {
  const search = useRouterState({
    select: ({ location }) => location.searchStr,
  })
  const changed = useSyncExternalStore(
    subscribe,
    () => version,
    () => -1
  )
  return useMemo(
    () =>
      changed < 0
        ? readPageDesign("", "")
        : // The address as it is now: `setDesign` replaces it outside the router.
          readPageDesign(window.location.search, document.cookie),
    // oxlint-disable-next-line react-hooks/exhaustive-deps -- `search` is when to read it again.
    [search, changed]
  )
}
