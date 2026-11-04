import { Show, mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  AvatarContext,
  AvatarFallback as ArkAvatarFallback,
  AvatarImage as ArkAvatarImage,
  AvatarRoot,
} from "@ark-ui/solid"
import { avatar } from "../../../styles/avatar.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AvatarImageProps } from "@ark-ui/solid"

function Avatar(props: {
  size?: "default" | "sm" | "lg"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ size: "default" } as const, props),
    ["size", "class", "sx", "children"]
  )
  return (
    <AvatarRoot
      asChild={(childProps) => (
        <span
          {...childProps()}
          data-slot="avatar"
          data-size={local.size}
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            avatar.root,
            local.sx
          )}
        >
          {local.children}
        </span>
      )}
    />
  )
}

function AvatarBadge(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
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

function AvatarFallback(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <AvatarContext>
      {(state) => (
        <Show when={!state().loaded}>
          <>
            <ArkAvatarFallback
              asChild={(childProps) => (
                <span
                  {...childProps()}
                  data-slot="avatar-fallback"
                  {...rest}
                  {...styleProps(
                    childProps().class,
                    local.class,
                    avatar.fallback,
                    local.sx
                  )}
                >
                  {local.children}
                </span>
              )}
            />
          </>
        </Show>
      )}
    </AvatarContext>
  )
}

function AvatarGroup(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
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
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
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

function AvatarImage(props: {
  asChild?: AvatarImageProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <ArkAvatarImage
      asChild={local.asChild}
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
