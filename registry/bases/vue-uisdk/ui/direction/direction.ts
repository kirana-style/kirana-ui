import { computed, inject } from "vue"
import type { ComputedRef, InjectionKey } from "vue"

type Direction = { locale: string; dir: "ltr" | "rtl" }

/** The locale and direction a `DirectionProvider` gives, as Ark UI's locale context. */
export const DIRECTION: InjectionKey<ComputedRef<Direction>> =
  Symbol("direction")

/** The nearest `DirectionProvider`'s locale and `dir`, left to right without one. */
export function useDirection(): ComputedRef<Direction> {
  return inject(
    DIRECTION,
    computed(() => ({ locale: "en-US", dir: "ltr" as const }))
  )
}
