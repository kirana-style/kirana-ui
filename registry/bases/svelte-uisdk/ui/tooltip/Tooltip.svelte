<script lang="ts">
  import type { Snippet } from "svelte"
  import { Tooltip } from "@ui-sdk/svelte/tooltip"

  import { popupContainer } from "../../../../lib/svelte/uisdk-slot"

  /**
   * ui-sdk's tooltip, taking Ark UI's root's props: `openDelay` is its `delay`, `0` as upstream's site opens a tooltip at once. `open` is bound, or given with `onOpenChange` called with `{ open }`, as Svelte's Ark UI
   * parts take it. Its popup renders in the body, as Base UI's portal puts it.
   */
  let {
    open = $bindable(),
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
</script>

<Tooltip
  container={popupContainer()}
  delay={openDelay}
  {open}
  {...rest}
  onOpenChange={(next: boolean) => {
    open = next
    onOpenChange?.({ open: next })
  }}
>
  {@render children?.()}
</Tooltip>
