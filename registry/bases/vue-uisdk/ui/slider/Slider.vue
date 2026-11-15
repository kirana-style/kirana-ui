<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from "@ui-sdk/vue/slider"
import { useSx } from "@kirana-style/core/vue"

import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { slider } from "../../../../styles/slider.styles"
import { computed } from "vue"

defineOptions({ inheritAttrs: false })

/**
 * ui-sdk's slider: `v-model` and `default-value`, a number or a list as Ark UI's part takes them,
 * one thumb per value; each thumb is told which value it moves, which ui-sdk does not take from
 * their order.
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
const value = defineModel<number | number[] | undefined>({ default: undefined })
const thumbs = computed(() => {
  const shape = value.value ?? defaultValue
  return Array.isArray(shape) ? shape.length : shape === undefined ? 2 : 1
})

const { sx, attrs } = useSx()
</script>

<template>
  <UisdkPart
    :part="Slider"
    name="slider"
    tag="div"
    :default-value="defaultValue ?? [min, max]"
    :model-value="value"
    :min="min"
    :max="max"
    @update:model-value="(next: number | number[]) => (value = next)"
    v-bind="attrs"
    :sx="[slider.root, sx]"
  >
    <SliderControl :sx="slider.control">
      <UisdkPart
        :part="SliderTrack"
        name="slider-track"
        tag="div"
        :sx="slider.track"
      >
        <UisdkPart
          :part="SliderIndicator"
          name="slider-range"
          tag="div"
          :sx="slider.range"
        />
      </UisdkPart>
      <UisdkPart
        v-for="index in thumbs"
        :key="index"
        :part="SliderThumb"
        name="slider-thumb"
        tag="div"
        :index="index - 1"
        :sx="slider.thumb"
      />
    </SliderControl>
  </UisdkPart>
</template>
