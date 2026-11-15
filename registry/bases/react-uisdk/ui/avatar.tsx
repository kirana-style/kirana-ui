"use client"

import * as React from "react"
import type { ComponentProps } from "react"
import * as AvatarPrimitive from "@ui-sdk/react/avatar"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { slotRender, slotOf } from "../../../lib/uisdk-slot"
import { avatar } from "../../../styles/avatar.styles"

function Avatar({
  sx,
  size = "default",
  ...props
}: Omit<ComponentProps<typeof AvatarPrimitive.Avatar>, "className"> & {
  size?: "default" | "sm" | "lg"
  sx?: Sx
}) {
  return (
    <AvatarPrimitive.Avatar
      data-size={size}
      {...props}
      render={slotRender(slotOf(props, "avatar"), "span", props.render)}
      {...styleProps(avatar.root, sx)}
    />
  )
}

function AvatarImage({
  sx,
  ...props
}: Omit<ComponentProps<typeof AvatarPrimitive.AvatarImage>, "className"> & {
  sx?: Sx
}) {
  return (
    <AvatarPrimitive.AvatarImage
      {...props}
      render={slotRender(slotOf(props, "avatar-image"), "img", props.render)}
      {...styleProps(avatar.image, sx)}
    />
  )
}

function AvatarFallback({
  sx,
  ...props
}: Omit<ComponentProps<typeof AvatarPrimitive.AvatarFallback>, "className"> & {
  sx?: Sx
}) {
  return (
    <AvatarPrimitive.AvatarFallback
      {...props}
      render={slotRender(
        slotOf(props, "avatar-fallback"),
        "span",
        props.render
      )}
      {...styleProps(avatar.fallback, sx)}
    />
  )
}

type El<T extends "div" | "span"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function AvatarBadge({ sx, ...props }: El<"span">) {
  return <span data-slot="avatar-badge" {...props} sx={[avatar.badge, sx]} />
}

function AvatarGroup({ sx, ...props }: El<"div">) {
  return <div data-slot="avatar-group" {...props} sx={[avatar.group, sx]} />
}

function AvatarGroupCount({ sx, ...props }: El<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      {...props}
      sx={[avatar.groupCount, sx]}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
