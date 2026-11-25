import { createContext, merge, omit, useContext } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Collapsible as CollapsiblePrimitive } from "@kirana-ui/solid/collapsible"
import { asRender } from "../../../lib/solid2/element"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/** Whether a closed panel stays in the page: Ark UI's `unmountOnExit={false}` on the root. */
const KeepPanel = createContext<(() => boolean) | null>(null)

/**
 * Kirana UI's collapsible, with Solid's Ark UI part's props: `open`, `defaultOpen`, and
 * `onOpenChange({ open })`. Unstyled, as upstream's: a caller's `sx` is all it draws. A closed
 * panel leaves the page, as Base UI's does, unless `unmountOnExit` is `false`.
 */
function Collapsible(props: {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  lazyMount?: boolean
  unmountOnExit?: boolean
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = merge(props, {
    get unmountOnExit() {
      return props.unmountOnExit ?? true
    },
  })
  const rest = omit(
    local,
    "onOpenChange",
    "lazyMount",
    "unmountOnExit",
    "asChild",
    "class",
    "sx",
    "children"
  )
  return (
    <KeepPanel value={() => !local.unmountOnExit}>
      <CollapsiblePrimitive.Root
        render={asRender(local.asChild)}
        data-slot="collapsible"
        {...rest}
        onOpenChange={(open: boolean) => local.onOpenChange?.({ open })}
        {...styleProps(local.class, local.sx)}
      >
        {local.children}
      </CollapsiblePrimitive.Root>
    </KeepPanel>
  )
}

function CollapsibleContent(props: {
  /** In the page while closed, `hidden`, as Base UI's panel with its `keepMounted`. */
  keepMounted?: boolean
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "keepMounted", "asChild", "class", "sx", "children")
  const keep = useContext(KeepPanel)
  return (
    <CollapsiblePrimitive.Panel
      render={asRender(props.asChild)}
      data-slot="collapsible-content"
      keepMounted={props.keepMounted || keep?.()}
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </CollapsiblePrimitive.Panel>
  )
}

/**
 * Rendered as the caller's element (`asChild`), the trigger is a `type="button"` under the
 * caller's own props, so a button it draws submits no form.
 */
function CollapsibleTrigger(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  const asChild = (): AsChild<"button"> | undefined => {
    const render = props.asChild
    if (!render) return undefined
    return (childProps) =>
      render((userProps) => childProps({ type: "button", ...userProps }))
  }
  return (
    <CollapsiblePrimitive.Trigger
      render={asRender(asChild())}
      data-slot="collapsible-trigger"
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </CollapsiblePrimitive.Trigger>
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
