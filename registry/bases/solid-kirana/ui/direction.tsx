/**
 * The reading direction for every part inside, from a locale, as Solid's Ark UI parts take it:
 * `<DirectionProvider locale="ar">` is Base UI's `<DirectionProvider direction="rtl">`. It is
 * Kirana UI's provider for its parts, and the registry's own context for the parts that read it:
 * `useDirection()` gives an accessor of the locale and its `dir`, as Ark UI's
 * `useLocaleContext()` did.
 */
import { DirectionProvider as DirectionPrimitive } from "@kirana-ui/solid/direction"
import { createContext, createMemo, useContext } from "solid-js"
import type { Accessor } from "solid-js"
import type { JSX } from "@solidjs/web"

/** The reading direction a `DirectionProvider` gives the parts inside it. */
export type Direction = { locale: string; dir: "ltr" | "rtl" }

/** The scripts written right to left, by a locale's language. */
const RTL = new Set(["ar", "fa", "he", "ur", "ps", "dv", "yi", "ckb"])

function directionOf(locale: string): Direction {
  const language = locale.split("-")[0]!.toLowerCase()
  return { locale, dir: RTL.has(language) ? "rtl" : "ltr" }
}

const DirectionContext = createContext<Accessor<Direction> | null>(null)

function DirectionProvider(props: { locale?: string; children?: JSX.Element }) {
  const direction = createMemo(() => directionOf(props.locale ?? "en-US"))
  return (
    <DirectionContext value={direction}>
      <DirectionPrimitive direction={direction().dir}>
        {props.children}
      </DirectionPrimitive>
    </DirectionContext>
  )
}

/** The direction around a part: `en-US` and `ltr` outside any `DirectionProvider`. */
function useDirection(): Accessor<Direction> {
  return useContext(DirectionContext) ?? (() => directionOf("en-US"))
}

export { DirectionProvider, useDirection }
