/**
 * How a preview page takes its design: the item alone on a page, in the design its URL names
 * (`?preset=`, and upstream's individual axis parameters), changed live by the page that frames it
 * through shadcn/ui's message protocol, so either site's customizer can drive it. Framework-neutral:
 * the React routes and every preview app use it.
 *
 * The design is attributes on `<html>` (`documentAttributes`); nothing else changes when it does,
 * except the icon library, which the page hands to its icon provider.
 */
import { AXIS_ATTRIBUTES, POINTER_ATTRIBUTE } from "./attributes"
import type { DesignSystem } from "./config"
import { encodePreset, readDesignSystem } from "./preset"

/** The message a framing page sends with the design's parameters (upstream's `use-iframe-sync`). */
export const DESIGN_MESSAGE = "design-system-params"

/** The message a framed preview sends its parent when `D` is pressed: the parent toggles the mode. */
export const MODE_KEY_MESSAGE = "dark-mode-forward"

/** What a preview needs besides the design system: the reading direction and the pointer cursor. */
export type PreviewOptions = { rtl: boolean; pointer: boolean }

export type PreviewDesign = { system: DesignSystem; options: PreviewOptions }

type Params = { get: (name: string) => string | null }

const flag = (value: string | null) => value === "true" || value === "1"

/** The design a URL's query (or a message's parameters) asks for; unknown values fall back. */
export function readPreviewDesign(params: Params): PreviewDesign {
  return {
    system: readDesignSystem(params).system,
    options: {
      rtl: flag(params.get("rtl")),
      pointer: flag(params.get("pointer")),
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
    dir: options.rtl ? "rtl" : "ltr",
    [POINTER_ATTRIBUTE]: options.pointer ? "" : undefined,
  }
  for (const [axis, attribute] of Object.entries(AXIS_ATTRIBUTES)) {
    attributes[attribute] = system[axis as keyof typeof AXIS_ATTRIBUTES]
  }
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
  const saved = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${MODE_COOKIE}=`))
    ?.slice(MODE_COOKIE.length + 1)
  return isMode(saved) ? saved : "system"
}

/** The query that names a design: a `k` preset code and the options that are on. */
export function previewQuery({ system, options }: PreviewDesign) {
  const query = new URLSearchParams({ preset: encodePreset(system) })
  if (options.rtl) query.set("rtl", "true")
  if (options.pointer) query.set("pointer", "true")
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
