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
  CommandShortcut,
} from "../ui/command"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  wFit: css({ width: { "*": null, base: "fit-content" } }),
}

export default function CommandWithShortcuts() {
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
            <CommandList
              renderEmptyState={() => (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
            >
              <CommandGroup heading="Settings">
                <CommandItem textValue="Profile">
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
                <CommandItem textValue="Billing">
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
                <CommandItem textValue="Settings">
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
