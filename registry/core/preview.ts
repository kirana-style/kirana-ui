/**
 * How a preview page takes its design: the item alone on a page, in the design its URL names
 * (`?preset=`, and upstream's individual axis parameters), changed live by the page that frames it
 * through shadcn/ui's message protocol, so either site's customizer can drive it. Framework-neutral:
 * the React routes and every preview app use it.
 *
 * The design is attributes on `<html>` (`documentAttributes`); nothing else changes when it does,
 * except the icon library, which the page hands to its icon provider.
 */
import {
  AXIS_ATTRIBUTES,
  CHARTS_ATTRIBUTE,
  POINTER_ATTRIBUTE,
  SURFACE_ATTRIBUTE,
} from "./attributes"
import { CHART_COLORS, DEFAULT_DESIGN_SYSTEM } from "./config"
import type { ChartColor, DesignSystem } from "./config"
import { LANGUAGES, isLanguage } from "./language"
import type { Language } from "./language"
import { PRESET_FIELDS, encodePreset, readDesignSystem } from "./preset"

/** The message a framing page sends with the design's parameters (upstream's `use-iframe-sync`). */
export const DESIGN_MESSAGE = "design-system-params"

/** The message a framed preview sends its parent when `D` is pressed: the parent toggles the mode. */
export const MODE_KEY_MESSAGE = "dark-mode-forward"

/**
 * The message a framing page sends a right-to-left demo with the language it is read in
 * (`{ type, language }`); the demo's page also takes it as `?lang=`.
 */
export const LANGUAGE_MESSAGE = "kirana-language"

/**
 * What a preview needs besides the design system: the reading direction, the pointer cursor, and
 * the language a right-to-left demo is read in (`lang`), whose direction then wins over `rtl`.
 */
export type PreviewOptions = {
  rtl: boolean
  pointer: boolean
  language?: Language
  /** The surface under a demo, as upstream's previews of chat parts set it (`bg-surface`). */
  surface?: boolean
  /**
   * The chart colours a page draws while the design keeps the default ones: upstream's charts
   * pages draw theirs in `theme-default`'s blue, whatever the site's colours (`?charts=blue`).
   */
  charts?: ChartColor
}

export type PreviewDesign = { system: DesignSystem; options: PreviewOptions }

type Params = { get: (name: string) => string | null }

const flag = (value: string | null) => value === "true" || value === "1"

/** The colour modes a framing page names as `?theme=` (the site's preview embed, the block viewer). */
const MODES = new Set(["light", "dark", "system"])

/**
 * The query without a colour mode in `theme`: `?theme=dark` is the mode a frame is shown in (the
 * colour-mode script reads it), never the design's colour theme, which is a colour (`theme=blue`).
 */
function withoutMode(params: Params): Params {
  return {
    get: (name) => {
      const value = params.get(name)
      return name === "theme" && value !== null && MODES.has(value)
        ? null
        : value
    },
  }
}

const language = (value: string | null) =>
  isLanguage(value) ? { language: value } : {}

const charts = (value: string | null) =>
  (CHART_COLORS as readonly string[]).includes(value ?? "")
    ? { charts: value as ChartColor }
    : {}

/** The reading direction of a preview's options: its language's, else `rtl`'s. */
export const previewDirection = (options: PreviewOptions) =>
  options.language
    ? LANGUAGES[options.language].dir
    : options.rtl
      ? "rtl"
      : "ltr"

/** The design a URL's query (or a message's parameters) asks for; unknown values fall back. */
export function readPreviewDesign(params: Params): PreviewDesign {
  return {
    system: readDesignSystem(withoutMode(params)).system,
    options: {
      rtl: flag(params.get("rtl")),
      pointer: flag(params.get("pointer")),
      ...language(params.get("lang")),
      ...(flag(params.get("surface")) ? { surface: true } : {}),
      ...charts(params.get("charts")),
    },
  }
}

/**
 * `<html>`'s attributes for a design: every axis's attribute, `dir`, and `data-pointer` when the
 * pointer cursor is on (`undefined` means absent).
 */
export function documentAttributes({
  system,
  options,
}: PreviewDesign): Record<string, string | undefined> {
  const attributes: Record<string, string | undefined> = {
    dir: previewDirection(options),
    // The demo's language, so its text takes the language's family (`page.body`).
    lang: options.language ?? "en",
    [POINTER_ATTRIBUTE]: options.pointer ? "" : undefined,
    [SURFACE_ATTRIBUTE]: options.surface ? "" : undefined,
    [CHARTS_ATTRIBUTE]: options.charts ? "" : undefined,
  }
  for (const [axis, attribute] of Object.entries(AXIS_ATTRIBUTES)) {
    attributes[attribute] = system[axis as keyof typeof AXIS_ATTRIBUTES]
  }
  if (options.charts && system.chartColor === DEFAULT_DESIGN_SYSTEM.chartColor)
    attributes[AXIS_ATTRIBUTES.chartColor] = options.charts
  return attributes
}

/** Writes the attributes on an element, removing the ones that are absent. */
export function applyDocumentAttributes(
  element: Element,
  attributes: Record<string, string | undefined>
) {
  for (const [name, value] of Object.entries(attributes)) {
    if (value === undefined) element.removeAttribute(name)
    else element.setAttribute(name, value)
  }
}

/** The site's colour-mode cookie (`THEME_COOKIE` in `packages/shell`), one name on every page. */
export const MODE_COOKIE = "kirana-theme"

/** The reader's design on the site, as a `k` preset code: what the customizer saves. */
export const DESIGN_COOKIE = "kui-preset"

/** A cookie's value in a `document.cookie` string, or `undefined`. */
export function cookieValue(cookie: string, name: string): string | undefined {
  const value = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1)
  return value === undefined ? undefined : decodeURIComponent(value)
}

/** Whether a query names a design: a preset code, or any axis on its own. */
export function namesDesign(params: Params): boolean {
  const design = withoutMode(params)
  return (
    design.get("preset") !== null ||
    PRESET_FIELDS.some((field) => design.get(field.key) !== null)
  )
}

/**
 * The design a page of the site is in: the one its URL names, when it names one (a shared link, a
 * framing page's preview); else the reader's saved design (`kui-preset`); else the default. The
 * reading direction, the pointer and a demo's language are always the URL's.
 */
export function readPageDesign(search: string, cookie: string): PreviewDesign {
  const params = new URLSearchParams(search)
  if (namesDesign(params)) return readPreviewDesign(params)
  const saved = cookieValue(cookie, DESIGN_COOKIE)
  return {
    system: readPreviewDesign(
      new URLSearchParams(saved ? { preset: saved } : {})
    ).system,
    options: readPreviewDesign(params).options,
  }
}

export type ColourMode = "light" | "dark" | "system"

/**
 * The colour mode a preview app renders in, for one that is not the site (whose root route reads
 * it on the server): the URL's `?theme=` first, as the block viewer names it, then the site's
 * cookie, then the system's.
 */
export function readColourMode(search: string, cookie: string): ColourMode {
  const isMode = (value: string | null | undefined): value is ColourMode =>
    value === "light" || value === "dark" || value === "system"
  const asked = new URLSearchParams(search).get("theme")
  if (isMode(asked)) return asked
  const saved = cookieValue(cookie, MODE_COOKIE)
  return isMode(saved) ? saved : "system"
}

/** The query that names a design: a `k` preset code and the options that are on. */
export function previewQuery({ system, options }: PreviewDesign) {
  const query = new URLSearchParams({ preset: encodePreset(system) })
  if (options.rtl) query.set("rtl", "true")
  if (options.pointer) query.set("pointer", "true")
  if (options.language) query.set("lang", options.language)
  if (options.surface) query.set("surface", "true")
  if (options.charts) query.set("charts", options.charts)
  return query.toString()
}

/**
 * Listens for the framing page's design. Upstream's message carries every parameter (its preset
 * code and each axis); the base and the item are the page's own, chosen by its URL, so they are
 * ignored. Returns the function that stops listening.
 */
export function listenForDesign(
  target: Window,
  onDesign: (design: PreviewDesign) => void
) {
  const onMessage = (event: MessageEvent) => {
    if (event.source !== target.parent || event.data?.type !== DESIGN_MESSAGE)
      return
    const data: Record<string, unknown> = event.data.data ?? {}
    onDesign(
      readPreviewDesign({
        get: (name) => (data[name] == null ? null : String(data[name])),
      })
    )
  }
  target.addEventListener("message", onMessage)
  return () => target.removeEventListener("message", onMessage)
}

/**
 * In a frame, `D` is the parent's colour-mode key, as on upstream's previews: the key is sent up
 * rather than handled here. Typing in a field is left alone. Returns the function that stops it.
 */
export function forwardModeKey(target: Window) {
  if (target.parent === target) return () => {}
  const onKey = (event: KeyboardEvent) => {
    if (event.key !== "d" && event.key !== "D") return
    if (event.metaKey || event.ctrlKey || event.altKey) return
    const element = event.target
    if (
      element instanceof HTMLElement &&
      (element.isContentEditable ||
        /^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName))
    )
      return
    event.preventDefault()
    target.parent.postMessage({ type: MODE_KEY_MESSAGE, key: event.key }, "*")
  }
  target.document.addEventListener("keydown", onKey)
  return () => target.document.removeEventListener("keydown", onKey)
}

/**
 * A preview app's whole wiring, for every framework: the design from the URL or the saved one,
 * put on `<html>`, then kept there as the framing page's messages and the site's colour mode
 * arrive; `D` forwarded to the parent; the URL rewritten with each design, so a reload keeps it.
 * `onDesign` hears each change, for what a framework's own state reads (the icon library, the
 * reading direction, a demo's language). Returns the first design.
 */
export function followPageDesign(
  onDesign: (design: PreviewDesign) => void = () => {}
): PreviewDesign {
  const root = document.documentElement
  const first = readPageDesign(location.search, document.cookie)
  root.dataset.mode = readColourMode(location.search, document.cookie)
  // The site's theme provider tells every page of the site a change of mode on this channel.
  if (typeof BroadcastChannel !== "undefined")
    new BroadcastChannel(MODE_COOKIE).onmessage = (event: MessageEvent) => {
      if (MODES.has(event.data)) root.dataset.mode = event.data
    }
  let current = first
  const follow = (next: PreviewDesign) => {
    current = next
    applyDocumentAttributes(root, documentAttributes(next))
    history.replaceState(null, "", `${location.pathname}?${previewQuery(next)}`)
    onDesign(next)
  }
  applyDocumentAttributes(root, documentAttributes(first))
  forwardModeKey(window)
  // A design names no language, no surface and no charts' colours: the demo keeps the ones it is
  // shown with.
  listenForDesign(window, (next) =>
    follow({
      ...next,
      options: {
        ...language(current.options.language ?? null),
        ...next.options,
        ...(current.options.surface ? { surface: true } : {}),
        ...charts(current.options.charts ?? null),
      },
    })
  )
  // A right-to-left demo's language, from the framing page's selector: the design stays.
  window.addEventListener("message", (event: MessageEvent) => {
    if (event.source !== window.parent) return
    const data = event.data as { type?: unknown; language?: unknown } | null
    if (data?.type !== LANGUAGE_MESSAGE || !isLanguage(data.language)) return
    follow({
      ...current,
      options: { ...current.options, language: data.language },
    })
  })
  return first
}

/**
 * A docs page frames each demo, so the frame's width is not the page's: upstream shows its docs
 * demos in the page itself, where a script asking `matchMedia` for the width (`useIsMobile`, a
 * drawer that opens from the side on a wide screen) reads the reader's window. The framing page
 * passes its width (`?pagewidth=`), and width queries are answered from it; CSS media queries
 * still read the frame. Call it before anything asks.
 */
export function answerWidthQueriesFrom(target: Window) {
  const width = Number(
    new URLSearchParams(target.location.search).get("pagewidth")
  )
  if (!width) return
  const original = target.matchMedia.bind(target)
  const rem = 16
  target.matchMedia = (query: string) => {
    const match = /^\(\s*(max|min)-width:\s*([\d.]+)(px|rem|em)\s*\)$/.exec(
      query.trim()
    )
    if (!match) return original(query)
    const limit = Number(match[2]) * (match[3] === "px" ? 1 : rem)
    const matches = match[1] === "max" ? width <= limit : width >= limit
    // The page's width does not change under the frame: nothing to listen for.
    const list = {
      matches,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }
    return list as unknown as MediaQueryList
  }
}
