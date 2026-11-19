<script lang="ts">
  import { untrack } from "svelte"
  import type { Snippet } from "svelte"
  import { Popover } from "@kirana-ui/svelte/popover"

  /**
   * Kirana UI's popover, taking Ark UI's props as Svelte's other parts do: `open` (bound or with
   * `onOpenChange`, which gets `{ open }`), `defaultOpen` for one that keeps its own. It renders no
   * element; the rest goes to Kirana UI's root.
   */
  let {
    open = $bindable(),
    defaultOpen = false,
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

  // Read once, as Base UI reads a default.
  let own = $state(untrack(() => defaultOpen))
  const get = () => open ?? own
  const set = (next: boolean) => {
    own = next
    open = next
    onOpenChange?.({ open: next })
  }
</script>

<Popover.Root bind:open={get, set} {...rest}>
  {@render children?.()}
</Popover.Root>
