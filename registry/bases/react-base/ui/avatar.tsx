"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { avatar } from "../../../styles/avatar.styles"

function Avatar({
  sx,
  size = "default",
  ...props
}: Omit<AvatarPrimitive.Root.Props, "className"> & {
  size?: "default" | "sm" | "lg"
  sx?: Sx
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      {...props}
      {...styleProps(avatar.root, sx)}
    />
  )
}

function AvatarImage({
  sx,
  ...props
}: Omit<AvatarPrimitive.Image.Props, "className"> & { sx?: Sx }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      {...props}
      {...styleProps(avatar.image, sx)}
    />
  )
}

function AvatarFallback({
  sx,
  ...props
}: Omit<AvatarPrimitive.Fallback.Props, "className"> & { sx?: Sx }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      {...props}
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
