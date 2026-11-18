"use client"

import type * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller"

import { Button } from "./button"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { messageScroller } from "../../../styles/message-scroller.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

type Own<T extends React.ElementType> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function MessageScrollerProvider(
  props: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>
) {
  return <MessageScrollerPrimitive.Provider {...props} />
}

function MessageScroller({
  sx,
  ...props
}: Own<typeof MessageScrollerPrimitive.Root>) {
  return (
    <MessageScrollerPrimitive.Root
      data-slot="message-scroller"
      {...props}
      {...styleProps(messageScroller.root, sx)}
    />
  )
}

function MessageScrollerViewport({
  sx,
  ...props
}: Own<typeof MessageScrollerPrimitive.Viewport>) {
  return (
    <MessageScrollerPrimitive.Viewport
      data-slot="message-scroller-viewport"
      {...props}
      {...styleProps(messageScroller.viewport, sx)}
    />
  )
}

function MessageScrollerContent({
  sx,
  ...props
}: Own<typeof MessageScrollerPrimitive.Content>) {
  return (
    <MessageScrollerPrimitive.Content
      data-slot="message-scroller-content"
      {...props}
      {...styleProps(messageScroller.content, sx)}
    />
  )
}

function MessageScrollerItem({
  sx,
  scrollAnchor = false,
  ...props
}: Own<typeof MessageScrollerPrimitive.Item>) {
  return (
    <MessageScrollerPrimitive.Item
      data-slot="message-scroller-item"
      scrollAnchor={scrollAnchor}
      {...props}
      {...styleProps(messageScroller.item, sx)}
    />
  )
}

/**
 * The part draws as a Button, which takes the part's style in its own `sx`: a Button rendered by
 * the part keeps its own class over the part's.
 */
function MessageScrollerButton({
  direction = "end",
  sx,
  children,
  render,
  variant = "secondary",
  size = "icon-sm",
  ...props
}: Own<typeof MessageScrollerPrimitive.Button> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <MessageScrollerPrimitive.Button
      data-slot="message-scroller-button"
      data-direction={direction}
      data-variant={variant}
      data-size={size}
      direction={direction}
      render={
        render ?? (
          <Button
            variant={variant}
            size={size}
            sx={[messageScroller.button, sx]}
          />
        )
      }
      {...props}
    >
      {children ?? (
        <>
          <IconPlaceholder
            lucide="ArrowDownIcon"
            tabler="IconArrowDown"
            hugeicons="ArrowDown02Icon"
            phosphor="ArrowDownIcon"
            remixicon="RiArrowDownLine"
          />
          <span sx={visuallyHidden}>
            {direction === "end" ? "Scroll to end" : "Scroll to start"}
          </span>
        </>
      )}
    </MessageScrollerPrimitive.Button>
  )
}

export {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
}
