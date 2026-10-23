/**
 * Styles on a Vue component, merged with its caller's. A caller's `:sx` on a component reaches it as
 * a fallthrough `class`, which Vue would add to the root's own classes rather than merge: two
 * classes for one property, and the stylesheet's order deciding. A component turns fallthrough off
 * (`defineOptions({ inheritAttrs: false })`) and binds `useStyleAttrs(…)` instead: its own styles,
 * then the caller's classes, merged per property as Kirana merges `sx`, so the caller's win
 * (KF-019 in Kirana's feedback log). Every other attribute passes through.
 */
import { props } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { computed, normalizeClass, useAttrs } from "vue"
import type { StyleValue } from "vue"

export function useStyleAttrs(styles: () => Sx) {
  const attrs = useAttrs()
  return computed(() => {
    const { class: callerClass, style: callerStyle, ...rest } = attrs
    const merged = props(styles(), normalizeClass(callerClass))
    return {
      ...rest,
      class: merged.className,
      style: [merged.style, callerStyle] as StyleValue,
    }
  })
}
