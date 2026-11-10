import { nextTick, ref } from "vue"
import type { InjectionKey } from "vue"

/**
 * Which of an accordion's panels are in the page, as a collapsible's (`../collapsible/panel.ts`):
 * a panel enters the page a frame before Reka opens its item, so Reka runs its opening motion, and
 * leaves once its exit has run, as Base UI's panel leaves the page while closed.
 */
export function useAccordionPanels(initial: string[]) {
  const mounted = ref(new Set(initial))
  /** Opened, waiting a frame for its panel to mount before Reka is told. */
  const pending = ref(new Set<string>())
  const elements = new Map<string, Element>()
  let open: string[] = initial

  const settle = (value: string) => {
    if (open.includes(value)) return
    const element = elements.get(value)
    if (
      !element
        ?.getAnimations()
        .some((animation) => animation.playState === "running")
    ) {
      const next = new Set(mounted.value)
      next.delete(value)
      mounted.value = next
    }
  }

  /** The values Reka is told, from the ones asked for. */
  const request = (next: string[]) => {
    const added = next.filter((value) => !mounted.value.has(value))
    const removed = open.filter((value) => !next.includes(value))
    open = next
    if (added.length) {
      mounted.value = new Set([...mounted.value, ...added])
      pending.value = new Set([...pending.value, ...added])
      requestAnimationFrame(() => {
        const left = new Set(pending.value)
        for (const value of added) left.delete(value)
        pending.value = left
      })
    }
    for (const value of removed)
      void nextTick(() => requestAnimationFrame(() => settle(value)))
  }

  return {
    pending,
    request,
    panels: {
      isMounted: (value: string) => mounted.value.has(value),
      attach: (value: string, element: Element | undefined) => {
        if (element) elements.set(value, element)
        else elements.delete(value)
      },
      settle,
    },
  }
}

export type AccordionPanels = ReturnType<typeof useAccordionPanels>["panels"]

export const ACCORDION_PANELS: InjectionKey<AccordionPanels> =
  Symbol("accordion-panels")
