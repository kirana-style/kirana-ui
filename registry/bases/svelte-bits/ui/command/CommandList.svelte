<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Command } from "bits-ui"

  import { command } from "../../../../styles/command.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- cmdk's list and its sizer: Bits' list and viewport. -->
<Command.List
  data-slot="command-list"
  {...{ "cmdk-list": "" }}
  aria-label="Suggestions"
  {...rest}
  sx={[command.list, className as Sx]}
>
  <Command.Viewport {...{ "cmdk-list-sizer": "" }}>
    {@render children?.()}
  </Command.Viewport>
</Command.List>
