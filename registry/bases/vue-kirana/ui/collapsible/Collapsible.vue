<script setup lang="ts">
import { Collapsible } from "@kirana-ui/vue/collapsible"
import { useSx } from "@kirana-style/core/vue"

defineOptions({ inheritAttrs: false })

/** Kirana UI's collapsible, with Vue's Ark UI parts' `open`, `v-model:open` and `open-change`. */
const { defaultOpen } = defineProps<{ defaultOpen?: boolean }>()
const open = defineModel<boolean | undefined>("open", { default: undefined })
const emit = defineEmits<{ openChange: [details: { open: boolean }] }>()
const { sx, attrs } = useSx()
</script>

<template>
  <!-- Unstyled, as upstream's: a caller's `sx` is all they draw. -->
  <Collapsible.Root
    data-slot="collapsible"
    :default-open="defaultOpen"
    v-bind="attrs"
    :open="open"
    :sx="sx"
    @open-change="
      (value: boolean) => ((open = value), emit('openChange', { open: value }))
    "
  >
    <slot />
  </Collapsible.Root>
</template>
