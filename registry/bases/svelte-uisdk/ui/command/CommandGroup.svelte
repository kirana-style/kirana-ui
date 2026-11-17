<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { CommandGroup, CommandGroupLabel } from "@ui-sdk/svelte/command"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
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

<!-- A group with no match leaves the list, as cmdk's. Its heading is cmdk's, with no slot. -->
<UisdkPart
  part={CommandGroup}
  slotName="command-group"
  {...{ "cmdk-group": "" }}
  {...rest}
  sx={[command.group, className as Sx]}
>
  {#if heading}
    <CommandGroupLabel>
      {#snippet render({ props }: { props: Record<PropertyKey, unknown> })}
        <div {...props} data-slot={undefined} {...{ "cmdk-group-heading": "" }}>{heading}</div>
      {/snippet}
    </CommandGroupLabel>
  {/if}
  <div {...{ "cmdk-group-items": "" }}>{@render children?.()}</div>
</UisdkPart>
