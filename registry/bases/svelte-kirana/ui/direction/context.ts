import { getContext, setContext } from "svelte"

/** The reading direction a `DirectionProvider` gives the parts inside it. */
export type Direction = { locale: string; dir: "ltr" | "rtl" }

const DIRECTION = Symbol("direction")

/** The scripts written right to left, by a locale's language. */
const RTL = new Set(["ar", "fa", "he", "ur", "ps", "dv", "yi", "ckb"])

export function directionOf(locale: string): Direction {
  const language = locale.split("-")[0]!.toLowerCase()
  return { locale, dir: RTL.has(language) ? "rtl" : "ltr" }
}

export function setDirection(direction: () => Direction) {
  setContext(DIRECTION, direction)
}

/**
 * The direction around a part, as Ark UI's `useLocaleContext()` gives it: an accessor of the
 * locale and its `dir`, `en-US` and `ltr` outside any `DirectionProvider`. A part on Bits UI
 * passes `useDirection()().dir` to its primitive's `dir`, read in a `$derived` so it follows.
 */
export function useDirection(): () => Direction {
  return (
    getContext<(() => Direction) | undefined>(DIRECTION) ??
    (() => directionOf("en-US"))
  )
}
