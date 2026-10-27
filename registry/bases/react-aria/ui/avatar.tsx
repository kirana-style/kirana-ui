"use client"

import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { avatar } from "../../../styles/avatar.styles"

type El<T extends "div" | "span" | "img"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function Avatar({
  sx,
  size = "default",
  ...props
}: El<"div"> & { size?: "default" | "sm" | "lg" }) {
  return (
    <div
      data-slot="avatar"
      data-size={size}
      {...props}
      sx={[avatar.root, sx]}
    />
  )
}

type ImageState = "loading" | "loaded" | "error"

/** React Aria has no avatar: the image says whether it loaded, for the fallback after it. */
function AvatarImage({ sx, ref, ...props }: El<"img">) {
  const [state, setState] = React.useState<ImageState>(
    props.src ? "loading" : "error"
  )
  const image = React.useRef<HTMLImageElement>(null)
  React.useImperativeHandle(ref, () => image.current!)
  // A server-rendered image can load or fail before the page hydrates, when its event has no
  // listener yet: read how it settled.
  React.useEffect(() => {
    const element = image.current
    if (element?.complete && element.src)
      setState(element.naturalWidth > 0 ? "loaded" : "error")
  }, [props.src])

  return (
    <img
      data-slot="avatar-image"
      alt={props.alt || ""}
      data-state={state}
      onLoad={() => setState("loaded")}
      onError={() => setState("error")}
      {...props}
      ref={image}
      sx={[avatar.image, sx]}
    />
  )
}

function AvatarFallback({ sx, ...props }: El<"div">) {
  return (
    <div
      data-slot="avatar-fallback"
      {...props}
      sx={[avatar.fallback, avatar.fallbackAfterImage, sx]}
    />
  )
}

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
