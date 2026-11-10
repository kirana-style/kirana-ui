<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tabs } from "bits-ui"

  import { tabs } from "../../../../styles/tabs.styles"

  // Bits' required `value` is declared here and passed on, so a project's type checker sees it.
  let {
    value,
    class: className,
    children,
    ...rest
  }: {
    value: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Tabs.Content {value} {...rest}>
  <!-- Only the chosen panel is in the page, as Base UI's: Bits keeps the others, `hidden`. -->
  {#snippet child({ props })}
    {#if !props.hidden}
      <div {...props} data-slot="tabs-content" class={className} sx={tabs.content}>
        {@render children?.()}
      </div>
    {/if}
  {/snippet}
</Tabs.Content>
