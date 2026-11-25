import { merge, omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Avatar as AvatarPrimitive } from "@kirana-ui/solid/avatar"
import { asRender } from "../../../lib/solid2/element"
import { avatar } from "../../../styles/avatar.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

function Avatar(props: {
  size?: "default" | "sm" | "lg"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = merge({ size: "default" } as const, props)
  const rest = omit(local, "size", "class", "sx", "children")
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={local.size}
      {...rest}
      {...styleProps(local.class, avatar.root, local.sx)}
    >
      {local.children}
    </AvatarPrimitive.Root>
  )
}

function AvatarBadge(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <span
      data-slot="avatar-badge"
      {...rest}
      {...styleProps(local.class, avatar.badge, local.sx)}
    >
      {local.children}
    </span>
  )
}

/** In the page until the picture has loaded, or when it cannot, as Kirana UI's fallback is. */
function AvatarFallback(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      {...rest}
      {...styleProps(local.class, avatar.fallback, local.sx)}
    >
      {local.children}
    </AvatarPrimitive.Fallback>
  )
}

function AvatarGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="avatar-group"
      {...rest}
      {...styleProps(local.class, avatar.group, local.sx)}
    >
      {local.children}
    </div>
  )
}

function AvatarGroupCount(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="avatar-group-count"
      {...rest}
      {...styleProps(local.class, avatar.groupCount, local.sx)}
    >
      {local.children}
    </div>
  )
}

/** In the page once the picture has loaded. */
function AvatarImage(props: {
  asChild?: AsChild<"img">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <AvatarPrimitive.Image
      render={asRender(local.asChild)}
      data-slot="avatar-image"
      {...rest}
      {...styleProps(local.class, avatar.image, local.sx)}
    />
  )
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
}
