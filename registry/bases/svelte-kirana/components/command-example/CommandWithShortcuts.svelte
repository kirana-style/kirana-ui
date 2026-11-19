<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

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
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { space } from "../../../../core/scales"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
    wFit: css({ width: { "*": null, base: "fit-content" } }),
  }

  let open = $state(false)
</script>

<Example title="With Shortcuts" {...rest} sx={className as Sx}>
  <div sx={[styles.flexCol4, example.row]}>
    <Button onclick={() => (open = true)} variant="outline" sx={styles.wFit}>
      Open Menu
    </Button>
    <CommandDialog open={open} onOpenChange={(details: { open: typeof open }) => (open = details.open)}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>
            No results found.
          </CommandEmpty>
          <CommandGroup heading="Settings">
            <CommandItem>
              <IconPlaceholder lucide="UserIcon" tabler="IconUser" hugeicons="UserIcon" phosphor="UserIcon" remixicon="RiUserLine" />
              <span>
                Profile
              </span>
              <CommandShortcut>
                ⌘P
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconPlaceholder lucide="CreditCardIcon" tabler="IconCreditCard" hugeicons="CreditCardIcon" phosphor="CreditCardIcon" remixicon="RiBankCardLine" />
              <span>
                Billing
              </span>
              <CommandShortcut>
                ⌘B
              </CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconPlaceholder lucide="SettingsIcon" tabler="IconSettings" hugeicons="SettingsIcon" phosphor="GearIcon" remixicon="RiSettingsLine" />
              <span>
                Settings
              </span>
              <CommandShortcut>
                ⌘S
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  </div>
</Example>
