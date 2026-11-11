<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Command } from "bits-ui"

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

<!-- A group with no match leaves the list, as cmdk's (Bits marks it `hidden`). -->
<Command.Group data-slot="command-group" {...{ "cmdk-group": "" }} {...rest}>
  {#snippet child({ props })}
    <div {...props} class={className} sx={command.group}>
      {#if heading}
        <Command.GroupHeading {...{ "cmdk-group-heading": "" }} aria-hidden="true">
          {heading}
        </Command.GroupHeading>
      {/if}
      <Command.GroupItems {...{ "cmdk-group-items": "" }}>
        {@render children?.()}
      </Command.GroupItems>
    </div>
  {/snippet}
</Command.Group>
