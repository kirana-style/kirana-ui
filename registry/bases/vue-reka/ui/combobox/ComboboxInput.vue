<script setup lang="ts">
import { ComboboxAnchor, ComboboxInput, ComboboxTrigger } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { combobox } from "../../../../styles/combobox.styles"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../input-group"
import ComboboxClear from "./ComboboxClear.vue"
import { IN_CONTENT, useCombobox, followTypedQuery } from "./context"

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
const { labelOf } = useCombobox()
followTypedQuery()
// In the popup ("Combobox in Popup"), the trigger outside it is the anchor, not this input.
const inContent = inject(IN_CONTENT, false)
// The chosen item's label, as Base UI's input shows it, where Reka would show its value.
const display = (chosen: unknown) =>
  chosen === null || chosen === undefined || Array.isArray(chosen)
    ? ""
    : labelOf(String(chosen))
</script>

<template>
  <InputGroup :sx="[combobox.input, sx]">
    <!-- The input is Reka's anchor too, the element its popper places the popup against, as Base
         UI's popup is anchored on the input. -->
    <ComboboxInput v-if="inContent" as-child :display-value="display">
      <InputGroupInput :disabled="disabled" v-bind="attrs" />
    </ComboboxInput>
    <ComboboxAnchor v-else as-child>
      <ComboboxInput as-child :display-value="display">
        <InputGroupInput :disabled="disabled" v-bind="attrs" />
      </ComboboxInput>
    </ComboboxAnchor>
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
