<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Command } from "@kirana-ui/svelte/command"

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

<Command.List data-slot="command-list" {...{ "cmdk-list": "" }} aria-label="Suggestions" {...rest} sx={[command.list, className as Sx]}>
  <div {...{ "cmdk-list-sizer": "" }}>{@render children?.()}</div>
</Command.List>
