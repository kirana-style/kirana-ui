import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  CollapsibleContent as ArkCollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger as ArkCollapsibleTrigger,
} from "@ark-ui/solid"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type {
  CollapsibleContentProps,
  CollapsibleRootProps,
  CollapsibleTriggerProps,
} from "@ark-ui/solid"

function Collapsible(props: {
  asChild?: CollapsibleRootProps["asChild"]
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
  // Unstyled, as upstream's: a caller's `sx` is all it draws.
  return (
    <CollapsibleRoot
      asChild={local.asChild}
      data-slot="collapsible"
      lazyMount
      unmountOnExit
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </CollapsibleRoot>
  )
}

function CollapsibleContent(props: {
  asChild?: CollapsibleContentProps["asChild"]
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
  return (
    <ArkCollapsibleContent
      asChild={local.asChild}
      data-slot="collapsible-content"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </ArkCollapsibleContent>
  )
}

function CollapsibleTrigger(props: {
  asChild?: CollapsibleTriggerProps["asChild"]
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
  return (
    <ArkCollapsibleTrigger
      asChild={local.asChild}
      data-slot="collapsible-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </ArkCollapsibleTrigger>
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
