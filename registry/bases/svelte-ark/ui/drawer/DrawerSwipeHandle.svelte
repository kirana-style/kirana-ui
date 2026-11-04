<script lang="ts">
  import type { Sx } from "@kirana-style/core"
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

<div data-slot="drawer-swipe-handle" aria-hidden="true" {...rest} sx={[drawer.swipeHandle, className as Sx]}></div>
