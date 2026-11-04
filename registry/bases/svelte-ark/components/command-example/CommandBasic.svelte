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
  } from "../../ui/command"
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

<Example title="Basic" {...rest} sx={[className as Sx]}>
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
</Example>
