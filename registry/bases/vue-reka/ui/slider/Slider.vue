<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { slider } from "../../../../styles/slider.styles"

defineOptions({ inheritAttrs: false })

// A value is one number or several, as Base UI's: Reka's are always a list, so a single number goes
// in as one and comes back out as one. Reka's default `thumbAlignment="contain"` is Base UI's
// `edge`: the thumbs stay inside the track.
const {
  defaultValue,
  modelValue,
  min = 0,
  max = 100,
  orientation = "horizontal",
  disabled,
} = defineProps<{
  defaultValue?: number | number[]
  modelValue?: number | number[]
  min?: number
  max?: number
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
}>()
const emit = defineEmits<{ "update:modelValue": [value: number | number[]] }>()
const { sx, attrs } = useSx()

const list = (value: number | number[] | undefined) =>
  typeof value === "number" ? [value] : value
const single = computed(
  () => typeof modelValue === "number" || typeof defaultValue === "number"
)
/** A thumb per value, or two over the whole range when none is given. */
const thumbs = computed(
  () => (list(modelValue) ?? list(defaultValue) ?? [min, max]).length
)
</script>

<template>
  <SliderRoot
    data-slot="slider"
    as="div"
    :default-value="list(defaultValue) ?? [min, max]"
    :model-value="list(modelValue)"
    :min="min"
    :max="max"
    :orientation="orientation"
    :disabled="disabled"
    v-bind="attrs"
    :sx="[slider.root, sx]"
    @update:model-value="
      (value) =>
        value && emit('update:modelValue', single ? (value[0] ?? min) : value)
    "
  >
    <!-- Base UI's control, which Reka does not have: it holds the track and the thumbs, each a
      `div` as Base UI's. -->
    <div
      :data-orientation="orientation"
      :data-disabled="disabled ? '' : undefined"
      :sx="slider.control"
    >
      <SliderTrack as="div" data-slot="slider-track" :sx="slider.track">
        <SliderRange as="div" data-slot="slider-range" :sx="slider.range" />
      </SliderTrack>
      <SliderThumb
        v-for="index in thumbs"
        :key="index"
        as="div"
        data-slot="slider-thumb"
        :sx="slider.thumb"
      />
    </div>
  </SliderRoot>
</template>
