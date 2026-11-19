import { createContext, mergeProps, splitProps, useContext } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Collapsible as CollapsiblePrimitive } from "@kirana-ui/solid/collapsible"
import { asRender } from "../../../lib/solid/element"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

/** Whether a closed panel stays in the page: Ark UI's `unmountOnExit={false}` on the root. */
const KeepPanel = createContext<() => boolean>()

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
  const [local, rest] = splitProps(mergeProps({ unmountOnExit: true }, props), [
    "onOpenChange",
    "lazyMount",
    "unmountOnExit",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <KeepPanel.Provider value={() => !local.unmountOnExit}>
      <CollapsiblePrimitive.Root
        render={asRender(local.asChild)}
        data-slot="collapsible"
        {...rest}
        onOpenChange={(open: boolean) => local.onOpenChange?.({ open })}
        {...styleProps(local.class, local.sx)}
      >
        {local.children}
      </CollapsiblePrimitive.Root>
    </KeepPanel.Provider>
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
  const [local, rest] = splitProps(props, [
    "keepMounted",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  const keep = useContext(KeepPanel)
  return (
    <CollapsiblePrimitive.Panel
      render={asRender(local.asChild)}
      data-slot="collapsible-content"
      keepMounted={local.keepMounted || keep?.()}
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
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
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  const asChild = (): AsChild<"button"> | undefined => {
    const render = local.asChild
    if (!render) return undefined
    return (childProps) =>
      render((userProps) => childProps({ type: "button", ...userProps }))
  }
  return (
    <CollapsiblePrimitive.Trigger
      render={asRender(asChild())}
      data-slot="collapsible-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </CollapsiblePrimitive.Trigger>
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
