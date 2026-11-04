import { createSignal } from "solid-js"
import { css } from "@kirana-style/core"
import { IconPlaceholder } from "../ui/icon-placeholder"
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

export default function CommandShortcuts() {
  const styles = {
    flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
    wFit: css({ width: { "*": null, base: "fit-content" } }),
  }

  const [open, setOpen] = createSignal(false)

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
        <CommandDialog
          open={open()}
          onOpenChange={(details: { open: ReturnType<typeof open> }) =>
            setOpen(details.open)
          }
        >
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
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
