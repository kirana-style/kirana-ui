<script lang="ts">
  import type { Snippet } from "svelte"
  import { HoverCard } from "@ui-sdk/svelte/hover-card"

  import { popupContainer } from "../../../../lib/svelte/uisdk-slot"

  /**
   * ui-sdk's hover card, taking Ark UI's root's props: `openDelay` and `closeDelay` are its `delay` and `closeDelay`. `open` is bound, or given with `onOpenChange` called with `{ open }`, as Svelte's Ark UI
   * parts take it. Its popup renders in the body, as Base UI's portal puts it.
   */
  let {
    open = $bindable(),
    openDelay,
    closeDelay,
    onOpenChange,
    children,
    ...rest
  }: {
    open?: boolean
    defaultOpen?: boolean
    openDelay?: number
    closeDelay?: number
    onOpenChange?: (details: { open: boolean }) => void
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<HoverCard
  container={popupContainer()}
  delay={openDelay}
  {closeDelay}
  {open}
  {...rest}
  onOpenChange={(next: boolean) => {
    open = next
    onOpenChange?.({ open: next })
  }}
>
  {@render children?.()}
</HoverCard>
