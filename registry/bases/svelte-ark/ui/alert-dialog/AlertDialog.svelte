<script lang="ts">
  import type { Snippet } from "svelte"

  // Ark's Svelte package exports these Dialog parts only as `Dialog.*` (LF-009).
  import { Dialog } from "@ark-ui/svelte"

  let {
    children,
    ...rest
  }: {
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<!-- Ark UI's Dialog as an alert: its role, and no closing from outside, as Base UI's AlertDialog.
       Closed, the popup leaves the page, as Base UI's does. -->
<Dialog.Root role="alertdialog" closeOnInteractOutside={false} lazyMount unmountOnExit {...rest}>
  {@render children?.()}
</Dialog.Root>
