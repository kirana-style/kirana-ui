<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { sheet } from "../../../../styles/sheet.styles"

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

<div data-slot="sheet-footer" {...rest} class={className} sx={sheet.footer}>
  {@render children?.()}
</div>
