<script setup lang="ts">
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchRoot,
  SwitchThumb,
} from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { computed } from "vue"

import { switchStyles } from "../../../../styles/switch.styles"

defineOptions({ inheritAttrs: false })

// `id` names the hidden input, so a `<Label for>` beside the switch reaches it.
const {
  id,
  defaultChecked,
  size = "default",
} = defineProps<{
  id?: string
  /** Base UI's boolean: Ark's own takes `"indeterminate"` too, so a bare attribute would not read as `true`. */
  defaultChecked?: boolean
  size?: "sm" | "default"
}>()
const { sx, attrs } = useSx()
// `aria-invalid`, as upstream's demos mark an invalid control: Ark's `invalid`, which marks the box.
const invalid = computed(() =>
  [true, "true", ""].includes(attrs.value["aria-invalid"] as never)
)
</script>

<template>
  <SwitchRoot
    :default-checked="defaultChecked"
    :invalid="invalid || undefined"
    v-bind="attrs"
    :ids="id ? { hiddenInput: id } : undefined"
    :sx="switchStyles.wrapper"
  >
    <SwitchControl
      data-slot="switch"
      :data-size="size"
      :sx="[switchStyles.root, sx]"
    >
      <SwitchThumb data-slot="switch-thumb" :sx="switchStyles.thumb" />
    </SwitchControl>
    <SwitchHiddenInput />
  </SwitchRoot>
</template>
