<script setup lang="ts">
import { ListboxFilter } from "reka-ui"
import { useSx } from "@kirana-style/core/vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { command } from "../../../../styles/command.styles"
import { InputGroup, InputGroupAddon } from "../input-group"
import { useCommand } from "./context"

defineOptions({ inheritAttrs: false })

const { sx, attrs } = useSx()
const { query } = useCommand()
</script>

<template>
  <div data-slot="command-input-wrapper" :sx="command.inputWrapper">
    <InputGroup :sx="command.inputGroup">
      <!-- Reka's filter: the arrow keys move the highlight and Enter chooses it, from the input. -->
      <ListboxFilter v-model="query" as-child>
        <input
          data-slot="command-input"
          cmdk-input
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          type="text"
          v-bind="attrs"
          :sx="[command.input, sx]"
        />
      </ListboxFilter>
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
