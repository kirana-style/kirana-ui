import { getContext, setContext } from "svelte"
import type { Snippet } from "svelte"
import type { TourStep as TourStepPrimitive } from "@kirana-ui/svelte"
import type { TourShownStep } from "@kirana-ui/svelte/tour"

/** A step: the primitive's (`id`, `target`, `side`, `align`), with what `TourContent` draws by itself. */
export type TourStep = TourStepPrimitive & {
  title?: string | Snippet
  description?: string | Snippet
}

/** The step shown, for the parts inside the popup: its progress and its next button's label. */
const KEY = Symbol("tour-shown")

export const setTourShown = (shown: () => TourShownStep) =>
  setContext(KEY, shown)
export const useTourShown = () =>
  getContext<(() => TourShownStep) | undefined>(KEY) ?? (() => null)
