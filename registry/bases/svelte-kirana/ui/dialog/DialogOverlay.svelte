<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Dialog } from "@kirana-ui/svelte/dialog"

  import { dialog } from "../../../../styles/dialog.styles"
  import { backdropMotion } from "../../../../styles/overlay.styles"

  // Kirana UI's backdrop writes Base UI's first frame and exit (`data-starting-style`,
  // `data-ending-style`), which the backdrop's motion reads.
  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Dialog.Backdrop data-slot="dialog-overlay" {...rest} sx={[backdropMotion, dialog.overlay, className as Sx]} />
