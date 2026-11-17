/**
 * ui-sdk's parts for Svelte, beside `UisdkPart.svelte`: where a popup renders, Base UI's sides as
 * ui-sdk's, and the scroll animations a closing popup ends. React's and Vue's `uisdk-slot` have the
 * same.
 */

/**
 * Where a ui-sdk popup renders: the document's body, as Base UI's portal (and the Ark UI parts'
 * `Portal`) puts it, so it inherits the page's text styles rather than its trigger's
 * surroundings'. Nothing on the server, where no popup is open.
 */
export function popupContainer(): HTMLElement | undefined {
  return typeof document === "undefined" ? undefined : document.body
}

/** Base UI's sides: the physical four and the logical two, which ui-sdk names `start` and `end`. */
export type BaseSide =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "inline-start"
  | "inline-end"

/** A Base UI side as ui-sdk's: `inline-start` and `inline-end` are its `start` and `end`. */
export function sideOf(side: BaseSide | undefined) {
  return side === "inline-start"
    ? "start"
    : side === "inline-end"
      ? "end"
      : side
}

/**
 * Cancels the animations a scroll drives inside `el` (a scroll fade's), as a popup starts to close.
 * ui-sdk ends a popup's exit once every animation in its subtree has finished, and one a scroll
 * drives never does: Firefox reports its end in milliseconds (181 s for a scroll fade), so the
 * closed popup's invisible layer stays over the page that long (LF-024). The content unmounts once
 * closed, so the next open starts them again.
 */
export function endScrollAnimations(el: Element | null | undefined) {
  if (!el) return
  for (const animation of el.getAnimations({ subtree: true })) {
    if (animation.timeline && animation.timeline !== document.timeline)
      animation.cancel()
  }
}
