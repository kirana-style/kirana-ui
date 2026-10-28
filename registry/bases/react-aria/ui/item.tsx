"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import { Link as LinkPrimitive } from "react-aria-components"
import type { LinkProps } from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { item } from "../../../styles/item.styles"
import { Separator } from "./separator"

type El<T extends keyof React.JSX.IntrinsicElements = "div"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }
type ItemVariants = NonNullable<Parameters<typeof item.root>[0]>
type ItemMediaVariants = NonNullable<Parameters<typeof item.media>[0]>

function ItemGroup({ sx, ...props }: El) {
  return (
    <div role="list" data-slot="item-group" {...props} sx={[item.group, sx]} />
  )
}

function ItemSeparator({
  sx,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      {...props}
      sx={[item.separator, sx]}
    />
  )
}

function Item({
  sx,
  variant = "default",
  size = "default",
  ...props
}: Omit<LinkProps, "children" | "className" | "style"> &
  Omit<React.HTMLAttributes<HTMLElement>, "className"> &
  ItemVariants & { sx?: Sx }) {
  const Element: React.ElementType = "href" in props ? LinkPrimitive : "div"
  return (
    <Element
      data-slot="item"
      data-variant={variant}
      data-size={size}
      {...props}
      {...styleProps(item.scope, item.root({ variant, size }), sx)}
    />
  )
}

function ItemMedia({
  sx,
  variant = "default",
  ...props
}: El & ItemMediaVariants) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      {...props}
      sx={[item.media({ variant }), sx]}
    />
  )
}

function ItemContent({ sx, ...props }: El) {
  return <div data-slot="item-content" {...props} sx={[item.content, sx]} />
}

function ItemTitle({ sx, ...props }: El) {
  return <div data-slot="item-title" {...props} sx={[item.title, sx]} />
}

function ItemDescription({ sx, ...props }: El<"p">) {
  return (
    <p data-slot="item-description" {...props} sx={[item.description, sx]} />
  )
}

function ItemActions({ sx, ...props }: El) {
  return <div data-slot="item-actions" {...props} sx={[item.actions, sx]} />
}

function ItemHeader({ sx, ...props }: El) {
  return <div data-slot="item-header" {...props} sx={[item.header, sx]} />
}

function ItemFooter({ sx, ...props }: El) {
  return <div data-slot="item-footer" {...props} sx={[item.footer, sx]} />
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
