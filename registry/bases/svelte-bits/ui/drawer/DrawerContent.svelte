<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import { Dialog } from "bits-ui"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { drawer } from "../../../../styles/drawer.styles"
  import { DRAWER, toPixels } from "./context.svelte"
  import type { DrawerState } from "./context.svelte"
  import DrawerOverlay from "./DrawerOverlay.svelte"
  import DrawerSwipeHandle from "./DrawerSwipeHandle.svelte"

  /**
   * The drawer itself: Base UI's popup in its viewport, its content wrapped as Base UI's
   * (`drawer-content`), the swipe handle above it when asked for. A swipe toward its edge moves it
   * (`--drawer-swipe-movement-*`) and, past half its size or quick enough, closes it, or moves it
   * to the next snap point down; a swipe back moves it to the next snap point up.
   */
  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const drawerState = getContext<DrawerState | undefined>(DRAWER)
  if (!drawerState) throw new Error("DrawerContent must be used within a Drawer.")
  const options = drawerState.options
  const axis = $derived(
    options.swipeDirection === "down" || options.swipeDirection === "up" ? "y" : "x"
  )
  const sign = $derived(
    options.swipeDirection === "up" || options.swipeDirection === "left" ? -1 : 1
  )

  let popup = $state<HTMLElement | null>(null)
  let swiping = $state(false)
  /** How far a swipe has moved it toward its edge, in pixels. */
  let movement = $state(0)

  // A nested drawer counts itself on the one it opens over.
  $effect(() => {
    const parent = drawerState.parent
    if (!parent || !options.open) return
    parent.nested += 1
    return () => {
      parent.nested -= 1
    }
  })

  // The popup's size, as it changes, for the custom properties below.
  let height = $state(0)
  let width = $state(0)
  $effect(() => {
    const element = popup
    if (!element) return
    const observer = new ResizeObserver(() => {
      height = element.offsetHeight
      width = element.offsetWidth
    })
    observer.observe(element)
    return () => observer.disconnect()
  })

  // Base UI's custom properties, on the popup and its backdrop.
  const snapOffset = $derived.by(() => {
    const points = options.snapPoints
    if (!points?.length || !height) return 0
    return Math.max(0, height - toPixels(points[Math.min(drawerState.snap, points.length - 1)]!))
  })
  const progress = $derived.by(() => {
    const size = axis === "y" ? height : width
    return size > 0 ? Math.min(1, Math.max(0, movement / size)) : 0
  })
  const overlayStyle = $derived(
    [
      `--drawer-swipe-progress: ${drawerState.hasSnapPoints ? 1 : progress}`,
      "--drawer-swipe-strength: 1",
      drawerState.hasSnapPoints ? `--drawer-height: ${height}px` : "",
    ]
      .filter(Boolean)
      .join("; ")
  )

  /** A swipe: the pointer moving it toward its edge, then letting go. */
  function press(event: PointerEvent) {
    const target = event.target as HTMLElement
    const element = popup
    if (
      !element ||
      event.button !== 0 ||
      target.closest("input, textarea, select, button, a, [contenteditable]")
    )
      return
    const vertical = axis === "y"
    const direction = sign
    const start = vertical ? event.clientY : event.clientX
    const time = performance.now()
    element.setPointerCapture(event.pointerId)
    const move = (next: PointerEvent) => {
      const delta = ((vertical ? next.clientY : next.clientX) - start) * direction
      swiping = true
      // Toward its edge it follows the pointer; away from it, a quarter as far.
      movement = delta >= 0 ? delta : delta / 4
    }
    const end = (last: PointerEvent) => {
      element.removeEventListener("pointermove", move)
      element.removeEventListener("pointerup", end)
      element.removeEventListener("pointercancel", end)
      const delta = ((vertical ? last.clientY : last.clientX) - start) * direction
      const speed = delta / Math.max(1, performance.now() - time)
      const size = vertical ? element.offsetHeight : element.offsetWidth
      swiping = false
      movement = 0
      const points = options.snapPoints
      if (points?.length) {
        // Between snap points: down to the next, or closed from the first; up to the one before.
        if (delta > size / 4 || speed > 0.5) {
          if (drawerState!.snap === 0) options.setOpen(false)
          else drawerState!.snap -= 1
        } else if (delta < -size / 4 || speed < -0.5)
          drawerState!.snap = Math.min(points.length - 1, drawerState!.snap + 1)
        return
      }
      if (delta > size / 2 || speed > 0.5) options.setOpen(false)
    }
    element.addEventListener("pointermove", move)
    element.addEventListener("pointerup", end)
    element.addEventListener("pointercancel", end)
  }
</script>

<Dialog.Portal>
  {#if options.modal}
    <DrawerOverlay data-snap-points={drawerState.hasSnapPoints ? "" : undefined} style={overlayStyle} />
  {/if}
  <!-- Base UI focuses a drawer's popup when it opens, not its first tabbable element (a dialog's):
       a chart or a field inside would take the focus, and with it its focus ring or keyboard tooltip.
       A drawer that is not modal leaves the page usable: no focus trap, no scroll lock. -->
  <Dialog.Content
    trapFocus={options.modal}
    preventScroll={options.modal}
    onOpenAutoFocus={(event: Event) => {
      event.preventDefault()
      popup?.focus({ preventScroll: true })
    }}
    onInteractOutside={(event: Event) => {
      if (options.disablePointerDismissal) event.preventDefault()
    }}
    {...rest}
    sx={[drawer.popup, drawer.motion, className as Sx]}
  >
    {#snippet child({ props })}
      <!-- Base UI's viewport around the popup, in the page only while the popup is. -->
      <div data-slot="drawer-viewport" data-modal={String(options.modal)} sx={drawer.viewport}>
        <div
          {...props}
          bind:this={popup}
          data-slot="drawer-popup"
          tabindex="-1"
          data-swipe-direction={options.swipeDirection}
          data-swipe-axis={axis}
          data-snap-points={drawerState.hasSnapPoints ? "" : undefined}
          data-nested-drawer-open={drawerState.nested ? "" : undefined}
          data-swiping={swiping ? "" : undefined}
          onpointerdown={press}
          style:--drawer-swipe-movement-x={axis === "x" ? `${sign * movement}px` : "0px"}
          style:--drawer-swipe-movement-y={axis === "y" ? `${sign * movement}px` : "0px"}
          style:--drawer-swipe-progress={String(progress)}
          style:--nested-drawers={String(drawerState.nested)}
          style:--drawer-snap-point-offset={`${snapOffset}px`}
          style:--drawer-swipe-strength="1"
          style:--drawer-frontmost-height={`${height}px`}
          style:--drawer-height={drawerState.nested ? `${height}px` : undefined}
        >
          {#if options.showSwipeHandle}
            <DrawerSwipeHandle />
          {/if}
          <div data-slot="drawer-content" sx={drawer.content}>
            {@render children?.()}
          </div>
        </div>
      </div>
    {/snippet}
  </Dialog.Content>
</Dialog.Portal>
