import { nextTick, ref, watch } from "vue"
import type { InjectionKey, Ref } from "vue"

/**
 * When a panel is in the page. Base UI's panel leaves the page while closed; Reka UI keeps its
 * element, `hidden`, and skips the opening motion of a panel mounted open. So the part keeps the
 * panel in the page only while it is open or leaving, and opens Reka a frame after the panel
 * mounts, so Reka measures it and runs its motion as for a panel that was there all along.
 */
export function usePanelPresence(
  requested: () => boolean,
  keep: () => boolean
) {
  /** Whether the panel is in the page. */
  const mounted = ref(keep() || requested())
  /** What Reka is told: open a frame after the panel mounts, closed at once. */
  const open = ref(requested())
  let element: Element | undefined

  const settle = () => {
    if (open.value || keep()) return
    // Reka's exit runs as a CSS animation; a panel with none leaves at once.
    if (
      !element
        ?.getAnimations()
        .some((animation) => animation.playState === "running")
    )
      mounted.value = false
  }

  watch(requested, (now) => {
    if (now) {
      const was = mounted.value
      mounted.value = true
      if (was) open.value = true
      else requestAnimationFrame(() => (open.value = requested()))
    } else {
      open.value = false
      void nextTick(() => requestAnimationFrame(settle))
    }
  })

  // A panel asked to stay (`keepMounted`, which a part inside may ask for after the root is set up).
  watch(keep, (now) => {
    if (now) mounted.value = true
  })

  return {
    mounted,
    open,
    /** The panel's element, from its part, and the end of its exit. */
    panel: {
      attach: (next: Element | undefined) => (element = next),
      settle,
    },
  }
}

export type Panel = ReturnType<typeof usePanelPresence>["panel"] & {
  mounted: Ref<boolean>
}

/** A collapsible's panel, which its root keeps in the page (`usePanelPresence`). */
export const COLLAPSIBLE_PANEL: InjectionKey<Panel> =
  Symbol("collapsible-panel")
