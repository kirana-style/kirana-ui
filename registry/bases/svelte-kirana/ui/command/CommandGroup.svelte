<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Command } from "@kirana-ui/svelte/command"

  import { command } from "../../../../styles/command.styles"

  let {
    heading,
    class: className,
    children,
    ...rest
  }: {
    heading?: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- Hidden while none of its items is shown, as cmdk's. -->
<Command.Group data-slot="command-group" {...{ "cmdk-group": "" }} {...rest} sx={[command.group, className as Sx]}>
  {#if heading}
    <Command.GroupHeading {...{ "cmdk-group-heading": "" }}>{heading}</Command.GroupHeading>
  {/if}
  <div {...{ "cmdk-group-items": "" }}>
    {@render children?.()}
  </div>
</Command.Group>
