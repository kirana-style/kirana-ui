import type { TourStep as TourStepPrimitive } from "@kirana-ui/vue"
import type { TourShownStep } from "@kirana-ui/vue/tour"
import { defineComponent, provide } from "vue"
import type { InjectionKey, PropType } from "vue"

/** A step: the primitive's (`id`, `target`, `side`, `align`), with what `TourContent` draws by itself. */
export type TourStep = TourStepPrimitive & {
  title?: string
  description?: string
}

/** The step shown, for the parts inside the popup: its progress and its next button's label. */
export const TOUR_SHOWN: InjectionKey<() => TourShownStep | undefined> =
  Symbol("TourShown")

/** Provides the step the popup's slot was given to the parts inside it. It draws no element. */
export const TourShownProvider = defineComponent({
  props: {
    shown: { type: Object as PropType<TourShownStep>, required: true },
  },
  setup(props, { slots }) {
    provide(TOUR_SHOWN, () => props.shown)
    return () => slots.default?.()
  },
})
