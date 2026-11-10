<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { drawer } from "../../../../styles/drawer.styles"

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

<div data-slot="drawer-footer" {...rest} class={className} sx={drawer.footer}>
  {@render children?.()}
</div>
