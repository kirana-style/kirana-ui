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
  CommandShortcut,
} from "../../ui/command"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { space } from "../../../../core/scales"

const styles = {
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  wFit: css({ width: { "*": null, base: "fit-content" } }),
}

const open = ref(false)
</script>

<template>
  <Example title="With Shortcuts">
    <div :sx="[styles.flexCol4, example.row]">
      <Button @click="() => (open = true)" variant="outline" :sx="styles.wFit">
        Open Menu
      </Button>
      <CommandDialog v-model:open="open">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty> No results found. </CommandEmpty>
            <CommandGroup heading="Settings">
              <CommandItem>
                <IconPlaceholder
                  lucide="UserIcon"
                  tabler="IconUser"
                  hugeicons="UserIcon"
                  phosphor="UserIcon"
                  remixicon="RiUserLine"
                />
                <span> Profile </span>
                <CommandShortcut> ⌘P </CommandShortcut>
              </CommandItem>
              <CommandItem>
                <IconPlaceholder
                  lucide="CreditCardIcon"
                  tabler="IconCreditCard"
                  hugeicons="CreditCardIcon"
                  phosphor="CreditCardIcon"
                  remixicon="RiBankCardLine"
                />
                <span> Billing </span>
                <CommandShortcut> ⌘B </CommandShortcut>
              </CommandItem>
              <CommandItem>
                <IconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="SettingsIcon"
                  phosphor="GearIcon"
                  remixicon="RiSettingsLine"
                />
                <span> Settings </span>
                <CommandShortcut> ⌘S </CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  </Example>
</template>
