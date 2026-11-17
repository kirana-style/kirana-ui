<script lang="ts">
  import type { Snippet } from "svelte"
  import { Drawer } from "@ui-sdk/svelte/drawer"

  import {
    endScrollAnimations,
    popupContainer,
  } from "../../../../lib/svelte/uisdk-slot"
  import { setDrawer } from "./context"
  import type { DrawerContext, SnapPoint, SwipeDirection } from "./context"

  /**
   * ui-sdk's drawer, with Svelte's Ark UI part's props: `swipeDirection` (the edge it leaves
   * through) is ui-sdk's `side`, `disablePointerDismissal` its `closeOnOutsidePress` inverted,
   * `snapPoints` as fractions or lengths, which ui-sdk reads the same; `open` is bound, or given
   * with `onOpenChange` called with `{ open }`. Its popup renders in the body; as it closes, the
   * content's scroll-driven animations end (LF-024).
   */
  let {
    open = $bindable(),
    onOpenChange,
    modal = true,
    showSwipeHandle = false,
    snapPoints,
    swipeDirection = "down",
    disablePointerDismissal,
    children,
    ...rest
  }: {
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (details: { open: boolean }) => void
    modal?: boolean
    showSwipeHandle?: boolean
    snapPoints?: SnapPoint[]
    swipeDirection?: SwipeDirection
    disablePointerDismissal?: boolean
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const SIDES = {
    up: "top",
    down: "bottom",
    left: "left",
    right: "right",
  } as const

  const context: DrawerContext = $state({
    get hasSnapPoints() {
      return (snapPoints?.length ?? 0) > 0
    },
    get modal() {
      return modal
    },
    get showSwipeHandle() {
      return showSwipeHandle
    },
    get swipeDirection() {
      return swipeDirection
    },
    content: null,
  })
  setDrawer(context)
</script>

<Drawer
  container={popupContainer()}
  {modal}
  snapPoints={snapPoints as never}
  side={SIDES[swipeDirection]}
  closeOnOutsidePress={disablePointerDismissal === undefined
    ? undefined
    : !disablePointerDismissal}
  {open}
  {...rest}
  onOpenChange={(next: boolean) => {
    // Before ui-sdk gathers what its exit waits for (LF-024).
    if (!next) endScrollAnimations(context.content)
    open = next
    onOpenChange?.({ open: next })
  }}
>
  {@render children?.()}
</Drawer>
