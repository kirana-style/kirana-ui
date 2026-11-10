<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Accordion } from "bits-ui"

  import { accordion } from "../../../../styles/accordion.styles"

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

<Accordion.Content {...rest}>
  <!-- Bits keeps a closed panel's element, `hidden`: it leaves the page here, as Base UI's, once
       Bits has run its exit. `--height` is the panel's measured height as Ark UI names it, which
       the panel's motion reads (`accordion.contentArk`, on Bits' `data-state`). -->
  {#snippet child({ props })}
    {#if !props.hidden}
      <div
        {...props}
        style="--height: var(--bits-accordion-content-height); {props.style ?? ''}"
        data-slot="accordion-content"
        sx={[accordion.content, accordion.contentArk]}
      >
        <div class={className} sx={accordion.contentInner}>
          {@render children?.()}
        </div>
      </div>
    {/if}
  {/snippet}
</Accordion.Content>
