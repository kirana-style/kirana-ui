<script setup lang="ts">
import { Otp } from "@kirana-ui/vue/otp"
import { useSx } from "@kirana-style/core/vue"
import { onBeforeUnmount, onMounted, ref } from "vue"

import { inputOtp } from "../../../../styles/input-otp.styles"

defineOptions({ inheritAttrs: false })

/**
 * Kirana UI's code input, with Vue's Ark UI parts' props (`max-length`, `v-model`,
 * `default-value`): one input the code is typed in, laid over the cells as React's `input-otp`
 * lays it, which carries the slot React's does.
 */
const { maxLength, defaultValue } = defineProps<{
  maxLength: number
  defaultValue?: string
}>()
const model = defineModel<string | undefined>({ default: undefined })
const { sx, attrs } = useSx()

// The container's height, which the input's font follows (`--root-height`), as `input-otp`
// measures it.
const root = ref<{ $el?: HTMLElement } | HTMLElement>()
const height = ref(0)
let observer: ResizeObserver | undefined
onMounted(() => {
  const element =
    root.value instanceof HTMLElement ? root.value : root.value?.$el
  if (!element) return
  observer = new ResizeObserver(() => (height.value = element.offsetHeight))
  observer.observe(element)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <Otp.Root
    ref="root"
    :length="maxLength"
    mode="alphanumeric"
    :default-value="defaultValue"
    :value="model"
    :style="{ '--root-height': `${height}px` }"
    :sx="[inputOtp.container, inputOtp.containerKirana]"
    @value-change="(value: string) => (model = value)"
  >
    <slot />
    <Otp.Input
      data-slot="input-otp"
      spellcheck="false"
      v-bind="attrs"
      :sx="[inputOtp.input, inputOtp.inputKirana, sx]"
    />
  </Otp.Root>
</template>
