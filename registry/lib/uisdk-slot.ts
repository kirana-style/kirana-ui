/**
 * A ui-sdk part rendered under the registry's slot name. ui-sdk writes its own `data-slot` on
 * every part (`tabs-tab`, `accordion-panel` …), which a prop cannot override; an element passed as
 * `render` can. So a part renders `tag` with the registry's slot (shadcn/ui's names, which the
 * styles and the examples read), as Base UI's part renders it, or the caller's own `render` with the
 * slot added (LF-023: a `data-slot` prop would be enough, were it kept).
 */
import { cloneElement, createElement, isValidElement } from "react"
import type { ReactElement } from "react"
import type { RenderProp } from "@ui-sdk/react/primitive"

export function slotRender<State>(
  slot: string,
  tag: string,
  render?: RenderProp<State>
): RenderProp<State> {
  if (render === undefined) return createElement(tag, { "data-slot": slot })
  if (isValidElement(render)) return cloneElement(render, { "data-slot": slot })
  return (props, state) =>
    cloneElement(
      render(props, state) as ReactElement<Record<string, unknown>>,
      {
        "data-slot": slot,
      }
    )
}

/**
 * Where a ui-sdk popup renders: the document's body, as Base UI's portal puts every popup, so it
 * inherits the page's text styles rather than those of its trigger's surroundings (a table cell's
 * `text-align` and `white-space`, a breadcrumb's font size). ui-sdk renders a popup in place by
 * default, in the top layer. Nothing on the server, where no popup is open.
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
