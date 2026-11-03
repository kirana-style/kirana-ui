<script setup lang="ts">
import {
  SliderControl,
  SliderHiddenInput,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { computed, onMounted, onUnmounted, ref } from "vue"

import { slider } from "../../../../styles/slider.styles"

defineOptions({ inheritAttrs: false })

// A value is one number or several, as Base UI's: Ark's are always a list, so a single number goes
// in as one and comes back out as one.
const {
  defaultValue,
  modelValue,
  min = 0,
  max = 100,
} = defineProps<{
  defaultValue?: number | number[]
  modelValue?: number | number[]
  min?: number
  max?: number
}>()
const emit = defineEmits<{ "update:modelValue": [value: number | number[]] }>()
const { sx, attrs } = useSx()

const list = (value: number | number[] | undefined) =>
  typeof value === "number" ? [value] : value
const single = computed(
  () => typeof modelValue === "number" || typeof defaultValue === "number"
)
/**
 * The thumbs' size, which Ark's `contain` needs to keep them inside the track (Base UI's `edge`)
 * and which each style sets: measured from the first thumb, and again as it changes.
 */
const root = ref<{ $el?: Element }>()
const thumbSize = ref<{ width: number; height: number }>()
let observer: ResizeObserver | undefined
onMounted(() => {
  const thumb = root.value?.$el?.querySelector('[data-slot="slider-thumb"]')
  if (!thumb) return
  observer = new ResizeObserver(() => {
    const { width, height } = thumb.getBoundingClientRect()
    thumbSize.value = { width, height }
  })
  observer.observe(thumb)
})
onUnmounted(() => observer?.disconnect())

/** A thumb per value, or two over the whole range when none is given. */
const thumbs = computed(
  () => (list(modelValue) ?? list(defaultValue) ?? [min, max]).length
)
</script>

<template>
  <!-- `thumbAlignment="contain"`, Base UI's `edge`: the thumbs stay inside the track. -->
  <SliderRoot
    data-slot="slider"
    :default-value="list(defaultValue)"
    :model-value="list(modelValue)"
    :min="min"
    :max="max"
    ref="root"
    thumb-alignment="contain"
    :thumb-size="thumbSize"
    v-bind="attrs"
    :sx="[slider.root, sx]"
    @update:model-value="
      emit('update:modelValue', single ? ($event[0] ?? min) : $event)
    "
  >
    <SliderControl :sx="slider.control">
      <SliderTrack data-slot="slider-track" :sx="slider.track">
        <SliderRange data-slot="slider-range" :sx="slider.range" />
      </SliderTrack>
      <SliderThumb
        v-for="index in thumbs"
        :key="index"
        :index="index - 1"
        data-slot="slider-thumb"
        :sx="slider.thumb"
      >
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </SliderRoot>
</template>
