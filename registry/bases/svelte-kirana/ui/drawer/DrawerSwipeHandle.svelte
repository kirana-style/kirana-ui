<script lang="ts">
  import type { ClassValue } from "svelte/elements"

  import { drawer } from "../../../../styles/drawer.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="drawer-swipe-handle" aria-hidden="true" {...rest} class={className} sx={drawer.swipeHandle}></div>
