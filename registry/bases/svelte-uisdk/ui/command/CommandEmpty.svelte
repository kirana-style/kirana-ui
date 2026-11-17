<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { CommandEmpty } from "@ui-sdk/svelte/command"

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

<!-- Shown while nothing matches, as cmdk's. ui-sdk keeps its live region in the page so the
     message is announced when it appears: until then it carries no slot and no style. -->
<CommandEmpty>
  {#snippet render({
    props,
    state,
  }: {
    props: Record<PropertyKey, unknown>
    state: { empty: boolean }
  })}
    {#if state.empty}
      <div
        {...props}
        {...rest}
        data-slot="command-empty"
        {...{ "cmdk-empty": "" }}
        class={className}
        sx={command.empty}
      >
        {@render children?.()}
      </div>
    {:else}
      <div {...props} data-slot={undefined}></div>
    {/if}
  {/snippet}
</CommandEmpty>
