import { css } from "@kirana-style/core"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { Button } from "../ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  wFit: css({ width: { "*": null, base: "fit-content" } }),
}

export default function CommandWithGroups() {
  const [open, setOpen] = React.useState(false)

  return (
    <div sx={page.example}>
      <div sx={styles.flexCol4}>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          sx={styles.wFit}
        >
          Open Menu
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <IconPlaceholder
                    lucide="CalendarIcon"
                    tabler="IconCalendar"
                    hugeicons="CalendarIcon"
                    phosphor="CalendarIcon"
                    remixicon="RiCalendarLine"
                  />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <IconPlaceholder
                    lucide="SmileIcon"
                    tabler="IconMoodSmile"
                    hugeicons="SmileIcon"
                    phosphor="SmileyIcon"
                    remixicon="RiEmotionLine"
                  />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <IconPlaceholder
                    lucide="CalculatorIcon"
                    tabler="IconCalculator"
                    hugeicons="CalculatorIcon"
                    phosphor="CalculatorIcon"
                    remixicon="RiCalculatorLine"
                  />
                  <span>Calculator</span>
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
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <IconPlaceholder
                    lucide="CreditCardIcon"
                    tabler="IconCreditCard"
                    hugeicons="CreditCardIcon"
                    phosphor="CreditCardIcon"
                    remixicon="RiBankCardLine"
                  />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <IconPlaceholder
                    lucide="SettingsIcon"
                    tabler="IconSettings"
                    hugeicons="SettingsIcon"
                    phosphor="TerminalIcon"
                    remixicon="RiSettingsLine"
                  />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </div>
  )
}
