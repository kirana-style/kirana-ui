import { merge, omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { card } from "../../../styles/card.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

function Card(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
    size?: "default" | "sm"
    class?: string
    sx?: Sx
    children?: JSX.Element
  }
) {
  const local = merge({ size: "default" } as const, props)
  const rest = omit(local, "size", "class", "sx", "children")
  return (
    <div
      data-slot="card"
      data-size={local.size}
      {...rest}
      {...styleProps(local.class, card.root, local.sx)}
    >
      {local.children}
    </div>
  )
}

function CardAction(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string
    sx?: Sx
    children?: JSX.Element
  }
) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="card-action"
      {...rest}
      {...styleProps(local.class, card.action, local.sx)}
    >
      {local.children}
    </div>
  )
}

function CardContent(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string
    sx?: Sx
    children?: JSX.Element
  }
) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="card-content"
      {...rest}
      {...styleProps(local.class, card.content, local.sx)}
    >
      {local.children}
    </div>
  )
}

function CardDescription(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string
    sx?: Sx
    children?: JSX.Element
  }
) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="card-description"
      {...rest}
      {...styleProps(local.class, card.description, local.sx)}
    >
      {local.children}
    </div>
  )
}

function CardFooter(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string
    sx?: Sx
    children?: JSX.Element
  }
) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="card-footer"
      {...rest}
      {...styleProps(local.class, card.footer, local.sx)}
    >
      {local.children}
    </div>
  )
}

function CardHeader(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string
    sx?: Sx
    children?: JSX.Element
  }
) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="card-header"
      {...rest}
      {...styleProps(local.class, card.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

function CardTitle(
  props: Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & {
    class?: string
    sx?: Sx
    children?: JSX.Element
  }
) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="card-title"
      {...rest}
      {...styleProps(local.class, card.title, local.sx)}
    >
      {local.children}
    </div>
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
}
