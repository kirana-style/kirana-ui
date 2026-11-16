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
import type { Component, PropType, VNode, VNodeRef } from "vue"

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

/**
 * A component's first element: its `$el` when it is one, else the first after its anchor (a
 * fragment's). The DOM's `Element`, which this module's `Element` component shadows.
 */
function elementOf(target: unknown): globalThis.Element | null {
  const isElement = (node: unknown): node is globalThis.Element =>
    node instanceof globalThis.Element
  if (target === null || isElement(target)) return target
  let node = (target as { $el?: Node | null }).$el ?? null
  while (node && !isElement(node)) node = node.nextSibling
  return node
}

type Ref = (target: unknown) => void
const elementRefs = new WeakMap<Ref, Ref>()
/**
 * ui-sdk's ref, given the element of a component child: Vue hands a ref on a component its instance,
 * which ui-sdk reads as the element (LF-026). One wrapper per ref, so Vue does not detach and
 * reattach it on every render.
 */
function toElementRef(ref: Ref): Ref {
  let wrapped = elementRefs.get(ref)
  if (!wrapped) {
    wrapped = (target) => ref(elementOf(target))
    elementRefs.set(ref, wrapped)
  }
  return wrapped
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
    /**
     * Told the part's element as ui-sdk attaches it (a modal's content, whose animations end as it
     * closes): the component's `$el` can be an anchor, where ui-sdk renders a fragment.
     */
    element: {
      type: Function as PropType<(el: globalThis.Element | null) => void>,
      default: undefined,
    },
  },
  setup(props, { attrs, slots }) {
    // ui-sdk's ref with `element` told too: one wrapper per ref, so Vue does not reattach it.
    const told = new WeakMap<Ref, Ref>()
    const telling = (ref: unknown): VNodeRef | undefined => {
      if (!props.element || typeof ref !== "function")
        return ref as VNodeRef | undefined
      let wrapped = told.get(ref as Ref)
      if (!wrapped) {
        wrapped = (target) => {
          ;(ref as Ref)(target)
          props.element?.(elementOf(target))
        }
        told.set(ref as Ref, wrapped)
      }
      return wrapped
    }
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
            if (child) {
              const component = typeof child.type !== "string"
              const ref =
                component && typeof own.ref === "function"
                  ? toElementRef(own.ref as Ref)
                  : own.ref
              return cloneVNode(
                child,
                mergeProps(own, {
                  ref: telling(ref),
                  "data-slot": child.props?.["data-slot"] ?? slot,
                })
              )
            }
          }
          return h(
            props.tag,
            { ...own, ref: telling(own.ref), "data-slot": slot },
            h(children)
          )
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
