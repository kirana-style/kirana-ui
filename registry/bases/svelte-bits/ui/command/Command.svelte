<script lang="ts">
  /**
   * cmdk's command menu on Bits UI's Command, which is cmdk's model: the items register from the
   * markup, what is typed filters and orders them (by value and keywords, with cmdk's score), groups
   * with no match leave, the first match is highlighted (`data-selected`, as cmdk writes it), and
   * choosing an item calls its `onSelect`.
   */
  import { Command } from "bits-ui"
  import type { Sx } from "@kirana-style/core"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { command } from "../../../../styles/command.styles"

  let {
    shouldFilter = true,
    dir,
    class: className,
    children,
    ...rest
  }: {
    shouldFilter?: boolean
    dir?: "ltr" | "rtl"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Command.Root
  {shouldFilter}
  loop
  data-slot="command"
  {...{ "cmdk-root": "" }}
  tabindex={-1}
  {dir}
  {...rest}
  sx={[command.root, className as Sx]}
>
  {@render children?.()}
</Command.Root>
