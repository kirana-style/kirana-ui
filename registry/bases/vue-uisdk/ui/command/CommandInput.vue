<script setup lang="ts">
import { CommandInput } from "@ui-sdk/vue/command"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { UisdkPart } from "../../../../lib/vue/uisdk-slot"
import { command } from "../../../../styles/command.styles"
import { InputGroup, InputGroupAddon } from "../input-group"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="command-input-wrapper" :sx="command.inputWrapper">
    <InputGroup :sx="command.inputGroup">
      <UisdkPart
        :part="CommandInput"
        slot-name="command-input"
        tag="input"
        cmdk-input
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        v-bind="attrs"
        :sx="[command.input, sx]"
      />
      <InputGroupAddon>
        <IconPlaceholder
          lucide="SearchIcon"
          tabler="IconSearch"
          hugeicons="SearchIcon"
          phosphor="MagnifyingGlassIcon"
          remixicon="RiSearchLine"
          :sx="command.inputIcon"
        />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
