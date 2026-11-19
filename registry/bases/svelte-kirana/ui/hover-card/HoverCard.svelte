<script lang="ts">
  import { untrack } from "svelte"
  import type { Snippet } from "svelte"
  import { HoverCard } from "@kirana-ui/svelte/hover-card"

  /**
   * Kirana UI's hover card, taking Ark UI's props as Svelte's other parts do: `open` (bound or with
   * `onOpenChange`, which gets `{ open }`), `defaultOpen` for one that keeps its own. It renders no
   * element; the rest goes to Kirana UI's root.
   */
  let {
    open = $bindable(),
    defaultOpen = false,
    onOpenChange,
    openDelay,
    closeDelay,
    children,
    ...rest
  }: {
    open?: boolean
    defaultOpen?: boolean
    /** Svelte's Ark UI parts' delays, the root's `delay` and `closeDelay`. */
    openDelay?: number
    closeDelay?: number
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

<HoverCard.Root bind:open={get, set} delay={openDelay} {closeDelay} {...rest}>
  {@render children?.()}
</HoverCard.Root>
