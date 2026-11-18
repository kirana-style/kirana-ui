<script setup lang="ts">
import { Slider } from "@kirana-ui/vue/slider"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { slider } from "../../../../styles/slider.styles"

defineOptions({ inheritAttrs: false })

/**
 * Kirana UI's slider, with Vue's Ark UI parts' `v-model` and `default-value` (a number or a list),
 * its thumbs counted as React's: one per value of a list, and for one number upstream's
 * `[min, max]`, both drawing it.
 */
const {
  defaultValue,
  min = 0,
  max = 100,
} = defineProps<{
  defaultValue?: number | number[]
  min?: number
  max?: number
}>()
const model = defineModel<number | number[] | undefined>({ default: undefined })
const { sx, attrs } = useSx()
const thumbs = computed(() =>
  Array.isArray(model.value)
    ? model.value.length
    : Array.isArray(defaultValue)
      ? defaultValue.length
      : 2
)
</script>

<template>
  <Slider.Root
    data-slot="slider"
    :default-value="defaultValue"
    :value="model"
    :min="min"
    :max="max"
    thumb-alignment="edge"
    v-bind="attrs"
    :sx="[slider.root, sx]"
    @value-change="(value: number | number[]) => (model = value)"
  >
    <Slider.Control :sx="slider.control">
      <Slider.Track data-slot="slider-track" :sx="slider.track">
        <Slider.Indicator data-slot="slider-range" :sx="slider.range" />
      </Slider.Track>
      <Slider.Thumb
        v-for="index in thumbs"
        :key="index"
        data-slot="slider-thumb"
        :sx="slider.thumb"
      />
    </Slider.Control>
  </Slider.Root>
</template>
