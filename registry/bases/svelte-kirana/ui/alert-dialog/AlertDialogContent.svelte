<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialog } from "@kirana-ui/svelte/alert-dialog"

  import { alertDialog } from "../../../../styles/alert-dialog.styles"
  import { modalMotion } from "../../../../styles/overlay.styles"
  import AlertDialogOverlay from "./AlertDialogOverlay.svelte"

  let {
    size = "default",
    class: className,
    children,
    ...rest
  }: {
    size?: "default" | "sm"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- The popup in the page's portal beside its backdrop, as Base UI's: no positioner around it. -->
<AlertDialog.Portal>
  <AlertDialogOverlay />
  <AlertDialog.Popup data-slot="alert-dialog-content" data-size={size} {...rest} sx={[modalMotion, alertDialog.content, className as Sx]}>
    {#snippet child({ props })}
      <div {...props}>
        {@render children?.()}
      </div>
    {/snippet}
  </AlertDialog.Popup>
</AlertDialog.Portal>
