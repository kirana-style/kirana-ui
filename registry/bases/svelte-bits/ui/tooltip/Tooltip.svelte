<script lang="ts">
  import { untrack } from "svelte"
  import type { Snippet } from "svelte"
  import { Tooltip } from "bits-ui"

  /**
   * Bits UI's tooltip, taking Ark UI's props: `open` (bound or with `onOpenChange`, which gets
   * `{ open }`), `defaultOpen`, `openDelay`. It opens at once, as shadcn/ui's `TooltipProvider`
   * (`delay = 0`) does. Bits' root needs a provider, which Base UI's does not, so each tooltip brings
   * its own.
   */
  let {
    open = $bindable(),
    defaultOpen = false,
    openDelay = 0,
    onOpenChange,
    children,
    ...rest
  }: {
    open?: boolean
    defaultOpen?: boolean
    openDelay?: number
    onOpenChange?: (details: { open: boolean }) => void
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Read once, as Base UI reads a default.
  let own = $state(untrack(() => defaultOpen))
  const get = () => open ?? own
  const set = (next: boolean) => {
    own = next
    open = next
    onOpenChange?.({ open: next })
  }
</script>

<Tooltip.Provider delayDuration={openDelay}>
  <!-- Closed, the popup leaves the page, as Base UI's does; Bits keeps it while its exit runs. -->
  <Tooltip.Root bind:open={get, set} {...rest}>
    {@render children?.()}
  </Tooltip.Root>
</Tooltip.Provider>
