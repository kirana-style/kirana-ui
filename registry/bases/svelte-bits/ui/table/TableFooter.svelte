<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { table } from "../../../../styles/table.styles"

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

<tfoot data-slot="table-footer" {...rest} class={className} sx={table.footer}>
  {@render children?.()}
</tfoot>
