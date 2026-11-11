<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialog } from "bits-ui"

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

  /**
   * Bits' inline style without its `contain: layout style`, which Base UI's popup has not; its
   * `outline: none` stays, as Base UI's popup draws no outline either.
   */
  const withoutContain = (style: unknown) =>
    typeof style === "string" ? style.replace(/(^|;)\s*contain:[^;]*/g, "$1") : undefined
</script>

<!-- The popup in the page's portal beside its backdrop, as Base UI's: no positioner around it. -->
<AlertDialog.Portal>
  <AlertDialogOverlay />
  <AlertDialog.Content data-slot="alert-dialog-content" data-size={size} {...rest} sx={[modalMotion, alertDialog.content, className as Sx]}>
    {#snippet child({ props })}
      <div {...props} style={withoutContain(props.style)}>
        {@render children?.()}
      </div>
    {/snippet}
  </AlertDialog.Content>
</AlertDialog.Portal>
