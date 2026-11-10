<script lang="ts">
  import { Dialog } from "bits-ui"
  import { getContext, setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { DRAWER, DrawerState } from "./context.svelte"
  import type { SnapPoint, SwipeDirection } from "./context.svelte"

  /**
   * Base UI's drawer on Bits UI's Dialog, which has no drawer of its own. Base UI's API:
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

  const drawerState = new DrawerState(
    {
      get snapPoints() {
        return snapPoints
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
      get disablePointerDismissal() {
        return disablePointerDismissal
      },
      get open() {
        return current
      },
      setOpen,
    },
    getContext<DrawerState | undefined>(DRAWER)
  )
  setContext(DRAWER, drawerState)
</script>

<Dialog.Root open={current} onOpenChange={setOpen}>
  {@render children?.()}
</Dialog.Root>
