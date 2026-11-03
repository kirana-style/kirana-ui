<script setup lang="ts">
import { ComboboxInput, ComboboxTrigger } from "@ark-ui/vue"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { combobox } from "../../../../styles/combobox.styles"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../input-group"
import ComboboxClear from "./ComboboxClear.vue"

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
</script>

<template>
  <InputGroup :sx="[combobox.input, sx]">
    <ComboboxInput as-child>
      <InputGroupInput :disabled="disabled" v-bind="attrs" />
    </ComboboxInput>
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
