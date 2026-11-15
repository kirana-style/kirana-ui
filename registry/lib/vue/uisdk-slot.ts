/**
 * A ui-sdk part rendered under the registry's slot, for Vue. ui-sdk writes its own `data-slot` on
 * every part over the caller's (LF-023); its `render` slot hands the part's attributes to an element
 * of the caller's, which can name its own. So `UisdkPart` renders `part` through that slot: as
 * `tag` (the element Base UI's part renders) under `name`, or a slot the caller hands it
 * (`data-slot`, as a menubar names its menus' parts), or, with `asChild` (the Ark UI parts' prop),
 * as the caller's own element with the part's attributes merged in.
 */
import {
  cloneVNode,
  Comment,
  defineComponent,
  Fragment,
  h,
  mergeProps,
  Text,
} from "vue"
import type { Component, PropType, VNode } from "vue"

/**
 * The first element among a slot's nodes, as Ark UI's `as-child` takes it: a slot passed on (a
 * part's `<slot />`) arrives as a fragment, read through; text and comments are skipped.
 */
function firstElement(nodes: VNode[]): VNode | undefined {
  for (const node of nodes) {
    if (node.type === Comment || node.type === Text) continue
    if (node.type === Fragment)
      return Array.isArray(node.children)
        ? firstElement(node.children as VNode[])
        : undefined
    return node
  }
  return undefined
}

export const UisdkPart = defineComponent({
  name: "UisdkPart",
  inheritAttrs: false,
  props: {
    /** The ui-sdk part (`Separator`, `CheckboxIndicator` …). */
    part: { type: [Object, Function] as PropType<Component>, required: true },
    /** The registry's slot, shadcn/ui's name, which the styles read. */
    name: { type: String, required: true },
    /** The element it renders, as Base UI's part renders it. */
    tag: { type: String, default: "div" },
    /** Its child as its element (Ark UI's `as-child`). */
    asChild: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const slot =
        typeof attrs["data-slot"] === "string" ? attrs["data-slot"] : props.name
      return h(props.part, attrs, {
        ...slots,
        render: ({
          props: own,
          children,
        }: {
          props: Record<string, unknown>
          children: Component
        }) => {
          if (props.asChild) {
            const child = firstElement(slots.default?.() ?? [])
            // A child that names its own slot keeps it, as its props win on Base UI's part.
            if (child)
              return cloneVNode(
                child,
                child.props?.["data-slot"] === undefined
                  ? mergeProps(own, { "data-slot": slot })
                  : own
              )
          }
          return h(props.tag, { ...own, "data-slot": slot }, h(children))
        },
      })
    }
  },
})

/**
 * A plain element with Ark UI's `as-child`, for the parts on no ui-sdk part (Button, Badge, Item …),
 * where Vue's Ark UI parts render Ark's factory (`ark.button`): `as` (`div` by default), or its
 * child with the attributes merged in.
 */
export const Element = defineComponent({
  name: "UisdkElement",
  inheritAttrs: false,
  props: {
    as: { type: String, default: "div" },
    asChild: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () => {
      if (props.asChild) {
        const child = firstElement(slots.default?.() ?? [])
        // A child that names its own slot keeps it (Pagination's link inside a Button).
        if (child) {
          const { "data-slot": slot, ...rest } = attrs
          return cloneVNode(
            child,
            child.props?.["data-slot"] === undefined
              ? { ...rest, "data-slot": slot }
              : rest
          )
        }
      }
      return h(props.as, attrs, slots.default?.())
    }
  },
})

/**
 * Where a ui-sdk popup renders: the document's body, as Base UI's portal (and the Ark UI parts'
 * `Teleport`) puts it, so it inherits the page's text styles rather than its trigger's
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
