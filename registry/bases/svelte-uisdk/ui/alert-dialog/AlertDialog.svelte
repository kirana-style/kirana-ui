<script lang="ts">
  import type { Snippet } from "svelte"
  import { AlertDialog } from "@ui-sdk/svelte/alert-dialog"

  import {
    endScrollAnimations,
    popupContainer,
  } from "../../../../lib/svelte/uisdk-slot"
  import { setContent } from "./context"

  /**
   * ui-sdk's alert dialog (it closes only by its buttons, as Base UI's): `open` bound, or given with `onOpenChange` called with
   * `{ open }`, as Svelte's Ark UI parts take it. Its popup renders in the body; as it closes, its
   * content's scroll-driven animations end (LF-024).
   */
  let {
    open = $bindable(),
    onOpenChange,
    children,
    ...rest
  }: {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (details: { open: boolean }) => void
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const content = $state({ el: null as HTMLElement | null })
  setContent(content)
</script>

<AlertDialog
  container={popupContainer()}
  {open}
  {...rest}
  onOpenChange={(next: boolean) => {
    // Before ui-sdk gathers what its exit waits for.
    if (!next) endScrollAnimations(content.el)
    open = next
    onOpenChange?.({ open: next })
  }}
>
  {@render children?.()}
</AlertDialog>
