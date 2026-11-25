<script setup lang="ts">
import type { Align, Side } from "@kirana-ui/vue"
import { Tour } from "@kirana-ui/vue/tour"
import type { TourShownStep } from "@kirana-ui/vue/tour"
import { useSx } from "@kirana-style/core/vue"

import { backdropMotion, popupMotion } from "../../../../styles/overlay.styles"
import { popover } from "../../../../styles/popover.styles"
import { tour } from "../../../../styles/tour.styles"
import { TourShownProvider } from "./context"
import type { TourStep } from "./context"
import TourClose from "./TourClose.vue"
import TourDescription from "./TourDescription.vue"
import TourFooter from "./TourFooter.vue"
import TourHeader from "./TourHeader.vue"
import TourNext from "./TourNext.vue"
import TourPrevious from "./TourPrevious.vue"
import TourProgress from "./TourProgress.vue"
import TourTitle from "./TourTitle.vue"

defineOptions({ inheritAttrs: false })

/**
 * The spotlight over the page and the popup by the step's target, with its arrow and a close button
 * in its corner. Given nothing in its slot, it draws the step's `title` and `description`, its
 * progress and the Back and Next buttons; its slot is given the step shown.
 */
const {
  side,
  align,
  sideOffset = 12,
  alignOffset = 0,
  showCloseButton = true,
} = defineProps<{
  side?: Side
  align?: Align
  sideOffset?: number
  alignOffset?: number
  showCloseButton?: boolean
}>()
defineSlots<{ default?: (props: TourShownStep<TourStep>) => unknown }>()
const { sx, attrs } = useSx()

/** The step the popup shows, as the page wrote it. */
const stepOf = (shown: TourShownStep) => shown.step as TourStep | undefined
</script>

<template>
  <Tour.Portal>
    <Tour.Spotlight
      data-slot="tour-spotlight"
      :sx="[backdropMotion, tour.spotlight]"
    />
    <Tour.Positioner
      :side="side"
      :align="align"
      :side-offset="sideOffset"
      :align-offset="alignOffset"
      :sx="popover.positioner"
    >
      <Tour.Popup
        v-slot="shown"
        data-slot="tour-content"
        v-bind="attrs"
        :sx="[popupMotion, popover.content, tour.content, sx]"
      >
        <TourShownProvider :shown="shown">
          <Tour.Arrow data-slot="tour-arrow" :sx="tour.arrow" />
          <slot
            :step="stepOf(shown)"
            :index="shown.index"
            :current="shown.current"
            :total="shown.total"
          >
            <TourHeader>
              <TourTitle>{{ stepOf(shown)?.title }}</TourTitle>
              <TourDescription v-if="stepOf(shown)?.description != null">
                {{ stepOf(shown)?.description }}
              </TourDescription>
            </TourHeader>
            <TourFooter>
              <TourProgress />
              <TourPrevious />
              <TourNext />
            </TourFooter>
          </slot>
          <TourClose v-if="showCloseButton" />
        </TourShownProvider>
      </Tour.Popup>
    </Tour.Positioner>
  </Tour.Portal>
</template>
