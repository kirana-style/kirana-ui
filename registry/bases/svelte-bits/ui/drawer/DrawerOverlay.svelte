<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Dialog } from "bits-ui"

  import { drawer } from "../../../../styles/drawer.styles"

  // Bits UI's overlay writes Base UI's first frame and exit (`data-starting-style`,
  // `data-ending-style`), which the backdrop's motion reads.
  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Dialog.Overlay data-slot="drawer-overlay" {...rest} sx={[drawer.overlay, className as Sx]} />
