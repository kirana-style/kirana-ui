<script lang="ts">
  import { Dialog } from "bits-ui"
  import type { Snippet } from "svelte"

  /**
   * Bits UI's Dialog. `open` (or `bind:open`) and `defaultOpen`, read once; `onOpenChange` gets
   * `details.open`, the Ark UI parts' shape, where Bits passes the boolean.
   */
  let {
    open = $bindable(),
    defaultOpen = false,
    onOpenChange,
    children,
  }: {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (details: { open: boolean }) => void
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // The first value only, as Base UI's `defaultOpen`.
  // svelte-ignore state_referenced_locally
  let own = $state(defaultOpen)
  const current = $derived(open ?? own)
  const setOpen = (next: boolean) => {
    own = next
    open = next
    onOpenChange?.({ open: next })
  }
</script>

<!-- Closed, the popup leaves the page, as Base UI's does; Bits keeps it while its exit runs. -->
<Dialog.Root open={current} onOpenChange={setOpen}>
  {@render children?.()}
</Dialog.Root>
