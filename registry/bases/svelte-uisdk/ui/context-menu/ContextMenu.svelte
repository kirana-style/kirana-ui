<script lang="ts">
  import type { Snippet } from "svelte"
  import { Menu } from "@ui-sdk/svelte/menu"

  import { popupContainer } from "../../../../lib/svelte/uisdk-slot"

  /**
   * ui-sdk's menu, as the context menu's root (its trigger opens it on a right click). `open` is bound, or given with `onOpenChange` called with `{ open }`, as Svelte's Ark UI
   * parts take it. Its popup renders in the body, as Base UI's portal puts it.
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
</script>

<Menu
  container={popupContainer()}
  {open}
  {...rest}
  onOpenChange={(next: boolean) => {
    open = next
    onOpenChange?.({ open: next })
  }}
>
  {@render children?.()}
</Menu>
