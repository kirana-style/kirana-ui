<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { AlertDialog } from "@kirana-ui/svelte/alert-dialog"

  import { alertDialog } from "../../../../styles/alert-dialog.styles"
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

<AlertDialog.Backdrop data-slot="alert-dialog-overlay" {...rest} sx={[backdropMotion, alertDialog.overlay, className as Sx]} />
