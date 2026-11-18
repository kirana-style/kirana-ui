<script setup lang="ts">
import { Command } from "@kirana-ui/vue/command"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { command } from "../../../../styles/command.styles"
import { InputGroup, InputGroupAddon } from "../input-group"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
</script>

<template>
  <div data-slot="command-input-wrapper" :sx="command.inputWrapper">
    <InputGroup :sx="command.inputGroup">
      <Command.Input
        data-slot="command-input"
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
