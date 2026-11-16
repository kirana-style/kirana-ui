<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import { Card, CardContent } from "../ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import CommandBasic from "../components/command-example/CommandBasic.vue"
import CommandWithShortcuts from "../components/command-example/CommandWithShortcuts.vue"
import CommandWithGroups from "../components/command-example/CommandWithGroups.vue"
import CommandManyItems from "../components/command-example/CommandManyItems.vue"

const styles = {
  wFullP0: css({
    width: { "*": null, base: "100%" },
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
}
</script>

<template>
  <ExampleWrapper>
    <!-- CommandInline -->
    <Example title="Inline">
      <Card :sx="styles.wFullP0">
        <CardContent :sx="styles.p0">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty> No results found. </CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <IconPlaceholder
                    lucide="CalendarIcon"
                    tabler="IconCalendar"
                    hugeicons="CalendarIcon"
                    phosphor="CalendarBlankIcon"
                    remixicon="RiCalendarLine"
                  />
                  <span> Calendar </span>
                </CommandItem>
                <CommandItem>
                  <IconPlaceholder
                    lucide="SmileIcon"
                    tabler="IconMoodSmile"
                    hugeicons="SmileIcon"
                    phosphor="SmileyIcon"
                    remixicon="RiEmotionLine"
                  />
                  <span> Search Emoji </span>
                </CommandItem>
                <CommandItem>
                  <IconPlaceholder
                    lucide="CalculatorIcon"
                    tabler="IconCalculator"
                    hugeicons="CalculatorIcon"
                    phosphor="CalculatorIcon"
                    remixicon="RiCalculatorLine"
                  />
                  <span> Calculator </span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
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
        </CardContent>
      </Card>
    </Example>
    <CommandBasic />
    <CommandWithShortcuts />
    <CommandWithGroups />
    <CommandManyItems />
  </ExampleWrapper>
</template>
