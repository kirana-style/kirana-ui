import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Avatar as AvatarPrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
  AvatarImage as AvatarImagePrimitive,
} from "@ui-sdk/solid/avatar"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { avatar } from "../../../styles/avatar.styles"

/** ui-sdk's avatar (a `span`, as Base UI's): its fallback shows until the image has loaded. */
function Avatar(props: {
  size?: "default" | "sm" | "lg"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "size", "class", "sx")
  return (
    <UisdkPart
      part={AvatarPrimitive}
      slotName="avatar"
      tag="span"
      data-size={props.size ?? "default"}
      {...rest}
      {...styleProps(props.class, avatar.root, props.sx)}
    />
  )
}

function AvatarBadge(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <span
      data-slot="avatar-badge"
      {...rest}
      {...styleProps(props.class, avatar.badge, props.sx)}
    >
      {props.children}
    </span>
  )
}

function AvatarFallback(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <UisdkPart
      part={AvatarFallbackPrimitive}
      slotName="avatar-fallback"
      tag="span"
      {...rest}
      {...styleProps(props.class, avatar.fallback, props.sx)}
    />
  )
}

function AvatarGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="avatar-group"
      {...rest}
      {...styleProps(props.class, avatar.group, props.sx)}
    >
      {props.children}
    </div>
  )
}

function AvatarGroupCount(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="avatar-group-count"
      {...rest}
      {...styleProps(props.class, avatar.groupCount, props.sx)}
    >
      {props.children}
    </div>
  )
}

function AvatarImage(props: {
  asChild?: AsChild<"img">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={AvatarImagePrimitive}
      slotName="avatar-image"
      tag="img"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, avatar.image, props.sx)}
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
