<script lang="ts">
  import { DrawerRoot, useLocaleContext } from "@ark-ui/svelte"
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { DRAWER } from "./context"
  import type { DrawerContext, SwipeDirection } from "./context"

  let {
    modal = true,
    showSwipeHandle = false,
    snapPoints,
    swipeDirection = "down",
    disablePointerDismissal = false,
    children,
    ...rest
  }: {
    modal?: boolean
    showSwipeHandle?: boolean
    snapPoints?: (number | string)[]
    swipeDirection?: SwipeDirection
    /** Base UI's name for staying open on a click outside. */
    disablePointerDismissal?: boolean
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Zag's sides are logical (`start`, `end`) and it writes the physical one; Base UI's are physical.
  const locale = useLocaleContext()
  const logicalDirection = $derived.by(() => {
    if (swipeDirection === "up" || swipeDirection === "down") return swipeDirection
    const rtl = locale?.()?.dir === "rtl"
    return (swipeDirection === "left") !== rtl ? "start" : "end"
  })

  // Base UI focuses a drawer's popup when it opens, not its first tabbable element (a dialog's):
  // a chart or a field inside would take the focus, and with it its focus ring or keyboard tooltip.
  const contentId = $props.id()
  const focusContent = () => document.getElementById(contentId)

  setContext<DrawerContext>(DRAWER, {
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

<!-- Closed, the popup leaves the page, as Base UI's does; Ark keeps it while its exit runs. -->
<DrawerRoot
  {modal}
  {snapPoints}
  swipeDirection={logicalDirection}
  closeOnInteractOutside={!disablePointerDismissal}
  ids={{ content: contentId }}
  initialFocusEl={focusContent}
  lazyMount
  unmountOnExit
  {...rest}
>
  {@render children?.()}
</DrawerRoot>
