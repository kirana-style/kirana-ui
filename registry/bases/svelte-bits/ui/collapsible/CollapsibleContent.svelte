<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Collapsible } from "bits-ui"
  import { getContext } from "svelte"

  import { KEEP_PANEL } from "./context"
  import type { KeepPanel } from "./context"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const keep = getContext<KeepPanel | undefined>(KEEP_PANEL)
</script>

<Collapsible.Content {...rest}>
  <!-- Bits keeps a closed panel's element, `hidden`: it leaves the page here, as Base UI's, once
       Bits has run its exit, unless the root keeps it. `--height` is the panel's measured height as
       Ark UI names it, which the panels' motion reads. -->
  {#snippet child({ props })}
    {#if !props.hidden || keep?.()}
      <!-- The slot first, so a part built on it names its own (Trace's). -->
      <div
        data-slot="collapsible-content"
        {...props}
        style="--height: var(--bits-collapsible-content-height); {props.style ?? ''}"
        class={className}
      >
        {@render children?.()}
      </div>
    {/if}
  {/snippet}
</Collapsible.Content>
