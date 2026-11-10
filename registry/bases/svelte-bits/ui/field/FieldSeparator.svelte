<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { field } from "../../../../styles/field.styles"
  import { Separator } from "../separator"

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

<div data-slot="field-separator" data-content={!!children} {...rest} class={className} sx={field.separator}>
  <Separator sx={field.separatorLine} />
  {#if children}
    <span data-slot="field-separator-content" sx={field.separatorContent}>
      {@render children?.()}
    </span>
  {/if}
</div>
