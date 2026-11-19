import { createContext, createMemo, useContext } from "solid-js"
import type { Accessor } from "solid-js"
import type { JSX } from "@solidjs/web"

/**
 * The reading direction for every part inside, from a locale as Solid's Ark UI parts take it:
 * `<DirectionProvider locale="ar">` is Base UI's `<DirectionProvider direction="rtl">`, and
 * `useDirection()` gives an accessor of the locale and its `dir`, as Ark's `useLocaleContext()`.
 * ui-sdk has no provider: its parts read the direction the element is laid out in (`dir`), so the
 * provider only answers `useDirection()` for the parts and examples that ask.
 */
type Direction = { locale: string; dir: "ltr" | "rtl" }

/** The scripts written right to left, by a locale's language. */
const RTL = new Set(["ar", "fa", "he", "ur", "ps", "dv", "yi", "ckb"])

function directionOf(locale: string): Direction {
  const language = locale.split("-")[0]!.toLowerCase()
  return { locale, dir: RTL.has(language) ? "rtl" : "ltr" }
}

const DirectionContext = createContext<Accessor<Direction> | null>(null)

function DirectionProvider(props: { locale?: string; children?: JSX.Element }) {
  const direction = createMemo(() => directionOf(props.locale ?? "en-US"))
  return <DirectionContext value={direction}>{props.children}</DirectionContext>
}

/** The nearest `DirectionProvider`'s locale and `dir`, `en-US` and left to right without one. */
function useDirection(): Accessor<Direction> {
  return useContext(DirectionContext) ?? (() => directionOf("en-US"))
}

export { DirectionProvider, useDirection }
export type { Direction }
