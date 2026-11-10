<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Collapsible } from "bits-ui"
  import { setContext, untrack } from "svelte"

  import { KEEP_PANEL } from "./context"
  import type { KeepPanel } from "./context"

  /**
   * Bits UI's collapsible, taking Svelte's Ark UI parts' props: `open`, `defaultOpen`, and
   * `onOpenChange` called with `{ open }`. Unstyled, as upstream's: a caller's `sx` is all it draws.
   * A closed panel leaves the page, as Base UI's does, unless `unmountOnExit` is `false`.
   */
  let {
    defaultOpen,
    open,
    onOpenChange,
    lazyMount: _lazyMount,
    unmountOnExit = true,
    class: className,
    children,
    ...rest
  }: {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (details: { open: boolean }) => void
    lazyMount?: boolean
    unmountOnExit?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  let own = $state(untrack(() => defaultOpen ?? false))
  setContext<KeepPanel>(KEEP_PANEL, () => !unmountOnExit)
</script>

<Collapsible.Root
  data-slot="collapsible"
  {...rest}
  open={open ?? own}
  onOpenChange={(next) => {
    own = next
    onOpenChange?.({ open: next })
  }}
  sx={className as Sx}
>
  {@render children?.()}
</Collapsible.Root>
