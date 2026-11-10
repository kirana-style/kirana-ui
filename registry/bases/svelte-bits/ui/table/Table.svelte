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

<div data-slot="table-container" sx={table.container}>
  <table data-slot="table" {...rest} class={className} sx={table.root}>
    {@render children?.()}
  </table>
</div>
