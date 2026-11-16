<script setup lang="ts">
import { ComboboxInput, ComboboxTrigger } from "@ui-sdk/vue/combobox"
import { useSx } from "@kirana-style/core/vue"
import { inject } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { elementOf, UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { combobox } from "../../../../styles/combobox.styles"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../input-group"
import ComboboxClear from "./ComboboxClear.vue"
import { ANCHORS, IN_CONTENT } from "./context"

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

// The input's group places the popup, as Base UI's does; in the popup ("Combobox in Popup") the
// trigger outside it does instead.
const anchors = inject(ANCHORS, undefined)
const inContent = inject(IN_CONTENT, false)
const anchor = (group: unknown) => {
  if (anchors && !inContent) anchors.input = elementOf(group)
}
</script>

<template>
  <InputGroup :ref="anchor" :sx="[combobox.input, sx]">
    <UisdkPart
      :part="ComboboxInput"
      slot-name="input-group-control"
      tag="input"
      as-child
      v-bind="attrs"
    >
      <InputGroupInput :disabled="disabled" />
    </UisdkPart>
    <InputGroupAddon align="inline-end">
      <!-- The trigger renders the InputGroup's button, so the button keeps its own styles. -->
      <UisdkPart
        v-if="showTrigger"
        :part="ComboboxTrigger"
        slot-name="input-group-button"
        tag="button"
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
      </UisdkPart>
      <ComboboxClear v-if="showClear" :disabled="disabled" />
    </InputGroupAddon>
    <slot />
  </InputGroup>
</template>
