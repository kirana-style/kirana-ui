import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { empty } from "../../../styles/empty.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

function Empty(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="empty"
      {...rest}
      {...styleProps(local.class, empty.root, local.sx)}
    >
      {local.children}
    </div>
  )
}

function EmptyContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="empty-content"
      {...rest}
      {...styleProps(local.class, empty.content, local.sx)}
    >
      {local.children}
    </div>
  )
}

function EmptyDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="empty-description"
      {...rest}
      {...styleProps(local.class, empty.description, local.sx)}
    >
      {local.children}
    </div>
  )
}

function EmptyHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="empty-header"
      {...rest}
      {...styleProps(local.class, empty.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

type MediaVariants = NonNullable<Parameters<typeof empty.media>[0]>

function EmptyMedia(props: {
  variant?: MediaVariants["variant"]
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
      data-slot="empty-icon"
      data-variant={local.variant}
      {...rest}
      {...styleProps(
        local.class,
        empty.media({ variant: local.variant }),
        local.sx
      )}
    >
      {local.children}
    </div>
  )
}

function EmptyTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="empty-title"
      {...rest}
      {...styleProps(local.class, empty.title, local.sx)}
    >
      {local.children}
    </div>
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
}
