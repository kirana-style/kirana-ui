<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { command } from "../../../../styles/command.styles"
  import { useCommand } from "./context"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const ctx = useCommand()
</script>

{#if ctx.empty}
  <div data-slot="command-empty" {...{ "cmdk-empty": "" }} role="presentation" {...rest} class={className} sx={command.empty}>
    {@render children?.()}
  </div>
{/if}
