/**
 * A ui-sdk part rendered under the registry's slot name. ui-sdk writes its own `data-slot` on
 * every part (`tabs-tab`, `accordion-panel` …), which a prop cannot override; an element passed as
 * `render` can. So a part renders `tag` with the registry's slot (shadcn/ui's names, which the
 * styles and the examples read), as Base UI's part renders it, or the caller's own `render` with the
 * slot added (LF-023: a `data-slot` prop would be enough, were it kept). A `render` element that
 * names its own slot keeps it, as its props win on Base UI's part.
 */
import {
  cloneElement,
  createContext,
  createElement,
  isValidElement,
  use,
  useRef,
} from "react"
import type { ReactElement, Ref, RefObject } from "react"
import type { RenderProp } from "@ui-sdk/react/primitive"

export function slotRender<State>(
  slot: string,
  tag: string,
  render?: RenderProp<State>
): RenderProp<State> {
  if (render === undefined) return createElement(tag, { "data-slot": slot })
  // A function first: ui-sdk's `RenderProp` (0.1.0-beta.12) is `ReactElement<any>` or a function,
  // which `isValidElement` does not narrow.
  if (typeof render === "function")
    return (props, state) =>
      cloneElement(
        render(props, state) as ReactElement<Record<string, unknown>>,
        { "data-slot": slot }
      )
  return isValidElement<{ "data-slot"?: string }>(render) &&
    render.props["data-slot"] !== undefined
    ? render
    : cloneElement(render as ReactElement<Record<string, unknown>>, {
        "data-slot": slot,
      })
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

/**
 * Cancels the animations a scroll drives inside `el` (a scroll fade's), as a popup starts to close.
 * ui-sdk ends a popup's exit once every animation in its subtree has finished, and one a scroll
 * drives never does: Chromium reports its end as a percentage, which ui-sdk's fallback timer skips,
 * but Firefox reports it in milliseconds (181 s for a scroll fade), so the closed popup's invisible
 * layer stays over the page that long (LF-024). The content unmounts once closed, so the next open
 * starts them again.
 */
export function endScrollAnimations(el: Element | null) {
  if (!el) return
  for (const animation of el.getAnimations({ subtree: true })) {
    if (animation.timeline && animation.timeline !== document.timeline)
      animation.cancel()
  }
}

/** The content of the modal the nearest root opened (`useClosingRoot`), for `endScrollAnimations`. */
export const ClosingContent = createContext<RefObject<HTMLElement | null>>({
  current: null,
})

/**
 * A modal root's content ref and its `onOpenChange`, which ends the content's scroll-driven
 * animations as it closes (LF-024): the root provides the ref through `ClosingContent`, its content
 * takes `useClosingContent()` as its ref.
 */
export function useClosingRoot<Rest extends unknown[]>(
  onOpenChange?: (open: boolean, ...rest: Rest) => void
) {
  const content = useRef<HTMLElement | null>(null)
  const handle = (open: boolean, ...rest: Rest) => {
    if (!open) endScrollAnimations(content.current)
    onOpenChange?.(open, ...rest)
  }
  return [content, handle] as const
}

/** A ref that fills `into` (a root's, from context) and the caller's own. */
export function refInto<T extends HTMLElement>(
  into: RefObject<T | null>,
  own?: Ref<T>
) {
  return (node: T | null) => {
    into.current = node
    if (typeof own === "function") return own(node)
    if (own) own.current = node
  }
}

/** The ref a modal's content takes: the root's (`ClosingContent`), and the caller's own. */
export function useClosingContent<T extends HTMLElement>(own?: Ref<T>) {
  return refInto(use(ClosingContent) as RefObject<T | null>, own)
}

/**
 * The slot a part renders under: the one its caller hands it (a menubar names its dropdown menu's
 * parts `menubar-*`), else its own.
 */
export function slotOf(props: object, own: string): string {
  const handed = (props as { "data-slot"?: unknown })["data-slot"]
  return typeof handed === "string" ? handed : own
}
