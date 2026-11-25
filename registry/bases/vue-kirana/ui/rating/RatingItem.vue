<script setup lang="ts">
import { Rating } from "@kirana-ui/vue/rating"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { ratingItem } from "../../../../styles/rating.styles"

defineOptions({ inheritAttrs: false })

const { place } = defineProps<{ place: number }>()
const { sx, attrs } = useSx()
</script>

<template>
  <!-- One star, at `place`. Its icon (the slot, a star by default) is drawn twice: empty, and filled
       over it, whole or by half. -->
  <Rating.Item
    data-slot="rating-item"
    :place="place"
    v-bind="attrs"
    :sx="[ratingItem.item, sx]"
  >
    <slot>
      <IconPlaceholder
        lucide="StarIcon"
        tabler="IconStar"
        hugeicons="StarIcon"
        phosphor="StarIcon"
        remixicon="RiStarLine"
      />
    </slot>
    <span data-slot="rating-item-fill" aria-hidden="true" :sx="ratingItem.fill">
      <slot>
        <IconPlaceholder
          lucide="StarIcon"
          tabler="IconStar"
          hugeicons="StarIcon"
          phosphor="StarIcon"
          remixicon="RiStarLine"
        />
      </slot>
    </span>
  </Rating.Item>
</template>
