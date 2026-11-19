/**
 * A ui-sdk part rendered under the registry's slot, on Solid 2. ui-sdk writes its own `data-slot`
 * on every part over the caller's (LF-023); its `render` hands the part's props to an element of the
 * caller's, which writes what it likes after them. So the part renders through it: as `tag` (the
 * element Base UI's part renders) under `slotName`, or a slot the caller hands it (`data-slot`),
 * or, with `asChild` (the Ark UI parts' render function, which every Solid base takes), as the
 * caller's own element, the registry's slot written over the part's. The rest of the props are the
 * part's: its options, and the classes and attributes ui-sdk merges onto the element. The part's
 * content (its children, or ui-sdk's own given its state, as a progress value's text) and its ref
 * come with the props `render` is handed.
 */
import { Dynamic } from "@solidjs/web"
import type { JSX } from "@solidjs/web"
import { omit, onCleanup } from "solid-js"
import type { Component } from "solid-js"

type Tag = keyof JSX.IntrinsicElements

/** What `asChild`'s function returns, to spread: its class one string, as a part's `class` takes. */
export type AsChildProps = Omit<JSX.HTMLAttributes<any>, "class"> & {
  class?: string
}

/**
 * Ark UI's `asChild`: called with the props as a function that merges what the caller gives it
 * under them; the element it returns spreads them (`<a {...props()} />`).
 */
export type AsChild<T extends Tag = "div"> = (
  props: (userProps?: JSX.IntrinsicElements[T]) => AsChildProps
) => JSX.Element

/** The ref ui-sdk binds a part's element with. */
type Bind = (el: Element | null) => void

/** Elements waiting to enter the document, each with the ref ui-sdk binds it with. */
const waiting = new Map<Element, Bind>()
let watcher: MutationObserver | undefined

function bindWaiting() {
  for (const [el, bind] of waiting) {
    if (!el.isConnected) continue
    waiting.delete(el)
    bind(el)
  }
  if (!waiting.size) {
    watcher?.disconnect()
    watcher = undefined
  }
}

/**
 * ui-sdk's ref (the last of the refs its `render` is handed, after the caller's own), handed the
 * part's element only once the element is in the document. ui-sdk binds an element it is handed
 * detached once Solid settles, or else on the next microtask, in the document or not: under a
 * `<Loading>` boundary still waiting on another lazy module (a preview page's toaster), the
 * element is then still in its template's document, which has no `documentElement`: the
 * resizable handle's binding throws on it, and a command highlights none of its items, out of the
 * document (LF-035). A detached element waits here, watched until it is inserted; the caller's ref
 * is called at once, as Solid calls it.
 */
function whenConnected(ref: unknown): unknown {
  if (Array.isArray(ref))
    return [...ref.slice(0, -1), whenConnected(ref.at(-1))]
  if (typeof ref !== "function" || typeof MutationObserver === "undefined")
    return ref
  const bind = ref as Bind
  let pending: Element | undefined
  onCleanup(() => {
    if (pending && waiting.get(pending) === bind) waiting.delete(pending)
  })
  return (el: Element | null) => {
    if (!el || el.isConnected) return bind(el)
    pending = el
    waiting.set(el, bind)
    watcher ??= new MutationObserver(bindWaiting)
    watcher.observe(document, { childList: true, subtree: true })
  }
}

export function UisdkPart(props: {
  /** The ui-sdk part (`CollapsibleTrigger` …). */
  // `any`: each part's props are its own.
  part: Component<any>
  /** The registry's slot, shadcn/ui's name, which the styles read. Not `name`, a form field's. */
  slotName: string
  /** The element it renders, as Base UI's part renders it. */
  tag?: string
  // `any`: an `asChild` typed for any element.
  asChild?: AsChild<any>
  [attribute: string]: unknown
}) {
  const rest = omit(props, "part", "slotName", "tag", "asChild")
  const slot = () =>
    typeof props["data-slot"] === "string" ? props["data-slot"] : props.slotName
  return (
    <Dynamic
      component={props.part}
      {...rest}
      render={(given: Record<string, unknown>) => {
        const asChild = props.asChild
        // In a spread, not `ref={…}`: Solid compiles that into a function, and ui-sdk's is a list.
        const connected = { ref: whenConnected(given.ref) }
        return asChild ? (
          asChild(
            (userProps) =>
              ({
                ...userProps,
                ...given,
                ...connected,
                "data-slot": slot(),
              }) as AsChildProps
          )
        ) : (
          <Dynamic
            component={props.tag ?? "div"}
            {...given}
            {...connected}
            data-slot={slot()}
          />
        )
      }}
    />
  )
}

/**
 * Where a ui-sdk popup renders: the document's body, as Base UI's portal (and the Ark UI parts'
 * `Portal`) puts it, so it inherits the page's text styles rather than its trigger's surroundings'.
 * Nothing on the server, where no popup is open.
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
