import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { card } from "../../../styles/card.styles"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function Card({
  sx,
  size = "default",
  ...props
}: El & { size?: "default" | "sm" }) {
  return (
    <div data-slot="card" data-size={size} {...props} sx={[card.root, sx]} />
  )
}

function CardHeader({ sx, ...props }: El) {
  return <div data-slot="card-header" {...props} sx={[card.header, sx]} />
}

function CardTitle({ sx, ...props }: El) {
  return <div data-slot="card-title" {...props} sx={[card.title, sx]} />
}

function CardDescription({ sx, ...props }: El) {
  return (
    <div data-slot="card-description" {...props} sx={[card.description, sx]} />
  )
}

function CardAction({ sx, ...props }: El) {
  return <div data-slot="card-action" {...props} sx={[card.action, sx]} />
}

function CardContent({ sx, ...props }: El) {
  return <div data-slot="card-content" {...props} sx={[card.content, sx]} />
}

function CardFooter({ sx, ...props }: El) {
  return <div data-slot="card-footer" {...props} sx={[card.footer, sx]} />
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
