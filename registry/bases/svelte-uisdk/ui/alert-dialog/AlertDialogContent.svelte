<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialogContent } from "@ui-sdk/svelte/alert-dialog"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { modalMotion } from "../../../../styles/overlay.styles"
  import { alertDialog } from "../../../../styles/alert-dialog.styles"
  import { useContent } from "./context"
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

  const content = useContent()
</script>

<AlertDialogOverlay />
<UisdkPart
  part={AlertDialogContent}
  slotName="alert-dialog-content"
  data-size={size}
  element={(el: HTMLElement | null) => content && (content.el = el)}
  {...rest}
  sx={[modalMotion, alertDialog.content, className as Sx]}
>
  {@render children?.()}
</UisdkPart>
