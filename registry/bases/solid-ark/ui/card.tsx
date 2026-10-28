import { splitProps } from "solid-js"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

import { card } from "../../../styles/card.styles"

type El = Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> & { sx?: Sx }

function Card(props: El & { size?: "default" | "sm" }) {
  const [local, rest] = splitProps(props, ["sx", "size"])
  return (
    <div
      data-slot="card"
      data-size={local.size ?? "default"}
      {...rest}
      sx={[card.root, local.sx]}
    />
  )
}

function CardHeader(props: El) {
  const [local, rest] = splitProps(props, ["sx"])
  return <div data-slot="card-header" {...rest} sx={[card.header, local.sx]} />
}

function CardTitle(props: El) {
  const [local, rest] = splitProps(props, ["sx"])
  return <div data-slot="card-title" {...rest} sx={[card.title, local.sx]} />
}

function CardDescription(props: El) {
  const [local, rest] = splitProps(props, ["sx"])
  return (
    <div
      data-slot="card-description"
      {...rest}
      sx={[card.description, local.sx]}
    />
  )
}

function CardAction(props: El) {
  const [local, rest] = splitProps(props, ["sx"])
  return <div data-slot="card-action" {...rest} sx={[card.action, local.sx]} />
}

function CardContent(props: El) {
  const [local, rest] = splitProps(props, ["sx"])
  return (
    <div data-slot="card-content" {...rest} sx={[card.content, local.sx]} />
  )
}

function CardFooter(props: El) {
  const [local, rest] = splitProps(props, ["sx"])
  return <div data-slot="card-footer" {...rest} sx={[card.footer, local.sx]} />
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
