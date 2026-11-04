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

<!-- Closed, the popup leaves the page, as Base UI's does; Ark keeps it while its exit runs. -->
<Dialog.Root lazyMount unmountOnExit {...rest}>
  {@render children?.()}
</Dialog.Root>
