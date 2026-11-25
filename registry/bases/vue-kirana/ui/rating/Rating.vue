<script setup lang="ts">
import { Rating } from "@kirana-ui/vue/rating"
import { useSx } from "@kirana-style/core/vue"

import { rating } from "../../../../styles/rating.styles"
import RatingItem from "./RatingItem.vue"
import RatingItems from "./RatingItems.vue"

defineOptions({ inheritAttrs: false })

type RatingVariants = NonNullable<Parameters<typeof rating>[0]>

/**
 * A score from a row of stars, drawn from `count`; a slot replaces the stars. Its other props are
 * the primitive root's (`v-model:value`, `default-value`, `allow-half`, `read-only` …).
 */
const { size = "default" } = defineProps<{ size?: RatingVariants["size"] }>()
const { sx, attrs } = useSx()
</script>

<template>
  <Rating.Root
    data-slot="rating"
    :data-size="size"
    v-bind="attrs"
    :sx="[rating({ size }), sx]"
  >
    <slot>
      <RatingItems v-slot="{ place }">
        <RatingItem :place="place" />
      </RatingItems>
    </slot>
  </Rating.Root>
</template>
