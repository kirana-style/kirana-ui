<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Dialog } from "bits-ui"

  import { sheet } from "../../../../styles/sheet.styles"

  // Bits UI's overlay writes Base UI's first frame and exit (`data-starting-style`,
  // `data-ending-style`), which the sheet's backdrop motion reads.
  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Dialog.Overlay data-slot="sheet-overlay" {...rest} sx={[sheet.overlay, className as Sx]} />
