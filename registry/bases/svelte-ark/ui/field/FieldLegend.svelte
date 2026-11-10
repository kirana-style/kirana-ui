<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { field } from "../../../../styles/field.styles"

  let {
    variant = "legend",
    class: className,
    children,
    ...rest
  }: {
    variant?: "legend" | "label"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<legend data-slot="field-legend" data-variant={variant} {...rest} class={className} sx={field.legend}>
  {@render children?.()}
</legend>
