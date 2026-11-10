<script lang="ts">
  import type { ClassValue } from "svelte/elements"

  import { command } from "../../../../styles/command.styles"
  import { useCommand } from "./context"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const ctx = useCommand()
</script>

<!-- Hidden while something is typed, as cmdk's (`alwaysRender` aside). -->
{#if !ctx.query}
  <div data-slot="command-separator" {...{ "cmdk-separator": "" }} role="separator" {...rest} class={className} sx={command.separator}></div>
{/if}
