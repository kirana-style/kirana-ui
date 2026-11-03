<script setup lang="ts">
import { ComboboxControl, ComboboxInput, ComboboxTrigger } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"
import { computed, inject, watchEffect } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { combobox } from "../../../../styles/combobox.styles"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../input-group"
import ComboboxClear from "./ComboboxClear.vue"
import { IN_CONTENT, useCombobox } from "./context"

defineOptions({ inheritAttrs: false })

const {
  disabled = false,
  showTrigger = true,
  showClear = false,
} = defineProps<{
  disabled?: boolean
  showTrigger?: boolean
  showClear?: boolean
}>()
const { sx, attrs } = useSx()
// A caller's id goes to the root, which writes it on the input as Zag's own.
const { inputId } = useCombobox()
// In the popup ("Combobox in Popup"), the trigger outside it is the anchor, not this input.
const inContent = inject(IN_CONTENT, false)
watchEffect(() => (inputId.value = attrs.value.id as string | undefined))
const rest = computed(() => {
  const { id: _id, ...others } = attrs.value
  return others
})
</script>

<template>
  <InputGroup :sx="[combobox.input, sx]">
    <!-- The input is Ark's control too, the element Zag places the popup against: Base UI's popup
         is anchored on the input, and without a control Zag falls back to the trigger. -->
    <ComboboxInput v-if="inContent" as-child>
      <InputGroupInput :disabled="disabled" v-bind="rest" />
    </ComboboxInput>
    <ComboboxControl v-else as-child>
      <ComboboxInput as-child>
        <InputGroupInput :disabled="disabled" v-bind="rest" />
      </ComboboxInput>
    </ComboboxControl>
    <InputGroupAddon align="inline-end">
      <!-- The trigger renders the InputGroup's button, so the button keeps its own styles. -->
      <ComboboxTrigger
        v-if="showTrigger"
        data-slot="input-group-button"
        :disabled="disabled"
        as-child
      >
        <InputGroupButton size="icon-xs" variant="ghost" :sx="combobox.trigger">
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            :sx="combobox.triggerIcon"
          />
        </InputGroupButton>
      </ComboboxTrigger>
      <ComboboxClear v-if="showClear" :disabled="disabled" />
    </InputGroupAddon>
    <slot />
  </InputGroup>
</template>
