import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { ark } from "@ark-ui/solid"
import { item } from "../../../styles/item.styles"
import { Separator } from "./separator"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { PolymorphicProps } from "@ark-ui/solid"

type ItemVariants = NonNullable<Parameters<typeof item.root>[0]>

function Item(props: {
  variant?: ItemVariants["variant"]
  size?: ItemVariants["size"]
  asChild?: PolymorphicProps<"div">["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default", size: "default" } as const, props),
    ["variant", "size", "asChild", "class", "sx", "children"]
  )
  return (
    <ark.div
      data-slot="item"
      data-variant={local.variant}
      data-size={local.size}
      {...rest}
      {...styleProps(
        local.class,
        item.scope,
        item.root({ variant: local.variant, size: local.size }),
        local.sx
      )}
      asChild={local.asChild}
    >
      {local.children}
    </ark.div>
  )
}

function ItemActions(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="item-actions"
      {...rest}
      {...styleProps(local.class, item.actions, local.sx)}
    >
      {local.children}
    </div>
  )
}

function ItemContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="item-content"
      {...rest}
      {...styleProps(local.class, item.content, local.sx)}
    >
      {local.children}
    </div>
  )
}

function ItemDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <p
      data-slot="item-description"
      {...rest}
      {...styleProps(local.class, item.description, local.sx)}
    >
      {local.children}
    </p>
  )
}

function ItemFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="item-footer"
      {...rest}
      {...styleProps(local.class, item.footer, local.sx)}
    >
      {local.children}
    </div>
  )
}

function ItemGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="item-group"
      role="list"
      {...rest}
      {...styleProps(local.class, item.group, local.sx)}
    >
      {local.children}
    </div>
  )
}

function ItemHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="item-header"
      {...rest}
      {...styleProps(local.class, item.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

type ItemMediaVariants = NonNullable<Parameters<typeof item.media>[0]>

function ItemMedia(props: {
  variant?: ItemMediaVariants["variant"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ variant: "default" } as const, props),
    ["variant", "class", "sx", "children"]
  )
  return (
    <div
      data-slot="item-media"
      data-variant={local.variant}
      {...rest}
      {...styleProps(
        local.class,
        item.media({ variant: local.variant }),
        local.sx
      )}
    >
      {local.children}
    </div>
  )
}

function ItemSeparator(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      {...rest}
      class={local.class}
      sx={[item.separator, local.sx]}
    />
  )
}

function ItemTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="item-title"
      {...rest}
      {...styleProps(local.class, item.title, local.sx)}
    >
      {local.children}
    </div>
  )
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
}
