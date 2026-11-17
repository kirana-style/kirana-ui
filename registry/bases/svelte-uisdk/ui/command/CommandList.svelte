<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { CommandList } from "@ui-sdk/svelte/command"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
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

<UisdkPart part={CommandList} slotName="command-list" tag="div" cmdk-list aria-label="Suggestions" {...rest} sx={[command.list, className as Sx]}>
  <div {...{ "cmdk-list-sizer": "" }}>{@render children?.()}</div>
</UisdkPart>
