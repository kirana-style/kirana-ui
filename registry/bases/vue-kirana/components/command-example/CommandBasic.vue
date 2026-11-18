<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { Example } from "../../components/example"
import { example } from "../../../../styles/example.styles"
import { Button } from "../../ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command"
import { space } from "../../../../core/scales"

const styles = {
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  wFit: css({ width: { "*": null, base: "fit-content" } }),
}

const open = ref(false)
</script>

<template>
  <Example title="Basic">
    <div :sx="[styles.flexCol4, example.row]">
      <Button @click="() => (open = true)" variant="outline" :sx="styles.wFit">
        Open Menu
      </Button>
      <CommandDialog v-model:open="open">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty> No results found. </CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem> Calendar </CommandItem>
              <CommandItem> Search Emoji </CommandItem>
              <CommandItem> Calculator </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  </Example>
</template>
