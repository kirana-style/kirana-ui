<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Button } from "../ui/button"
  import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "../ui/command"
  import { space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
    wFit: css({ width: { "*": null, base: "fit-content" } }),
  }

  let open = $state(false)
</script>

<div sx={page.example}>
  <div sx={styles.flexCol4}>
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
          <CommandGroup heading="Suggestions">
            <CommandItem>
              Calendar
            </CommandItem>
            <CommandItem>
              Search Emoji
            </CommandItem>
            <CommandItem>
              Calculator
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  </div>
</div>
