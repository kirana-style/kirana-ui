<script lang="ts">
  import { Drawer } from "@kirana-ui/svelte/drawer"
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { DRAWER } from "./context.svelte"
  import type { DrawerOptions, SnapPoint, SwipeDirection } from "./context.svelte"

  /**
   * Base UI's drawer on Kirana UI's. Base UI's API:
   * `swipeDirection` (the edge it leaves by, `down` by default), `snapPoints`, `modal` (`false`
   * leaves the page usable), `showSwipeHandle`, `disablePointerDismissal`, `open` or
   * `defaultOpen`; `onOpenChange` gets `details.open`, the Ark UI parts' shape.
   */
  let {
    open = $bindable(),
    defaultOpen = false,
    onOpenChange,
    modal = true,
    showSwipeHandle = false,
    snapPoints,
    swipeDirection = "down",
    disablePointerDismissal = false,
    children,
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

  // The first value only, as Base UI's `defaultOpen`.
  // svelte-ignore state_referenced_locally
  let own = $state(defaultOpen)
  const current = $derived(open ?? own)
  const setOpen = (next: boolean) => {
    own = next
    open = next
    onOpenChange?.({ open: next })
  }

  setContext<DrawerOptions>(DRAWER, {
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
  })
</script>

<!-- Kirana UI's drawer: the swipe, the snap points and the nested drawers are its own, and it
     writes Base UI's variables for the styles. Base UI's `disablePointerDismissal` is its
     `dismissible`, inverted. -->
<Drawer.Root
  open={current}
  onOpenChange={(next: boolean) => setOpen(next)}
  {modal}
  {snapPoints}
  {swipeDirection}
  dismissible={disablePointerDismissal ? false : undefined}
>
  {@render children?.()}
</Drawer.Root>
