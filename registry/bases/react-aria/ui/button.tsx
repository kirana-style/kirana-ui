"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  Button as ButtonPrimitive,
  Link as LinkPrimitive,
} from "react-aria-components"
import type {
  ButtonProps as ButtonPrimitiveProps,
  LinkProps as LinkPrimitiveProps,
} from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { button, buttonLabel } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * Wraps each run of text so it is trimmed to its capitals; icons and elements pass through.
 * Adjacent strings are one run (`Default{" "}` is "Default "), and white space alone stays bare
 * text, which the flex container drops as it does upstream's: a label of its own would add a gap.
 */
function withLabels(children: React.ReactNode) {
  const items: React.ReactNode[] = []
  let text = ""
  const flush = () => {
    if (text.trim())
      items.push(
        <span
          key={`label-${items.length}`}
          data-slot="button-label"
          sx={buttonLabel}
        >
          {text}
        </span>
      )
    else if (text) items.push(text)
    text = ""
  }
  for (const child of React.Children.toArray(children)) {
    if (typeof child === "string" || typeof child === "number") text += child
    else {
      flush()
      items.push(child)
    }
  }
  flush()
  return items
}

function Button({
  sx,
  variant = "default",
  size = "default",
  children,
  ...props
}: Omit<ButtonPrimitiveProps, "className" | "style"> &
  React.RefAttributes<HTMLButtonElement> &
  ButtonVariants & { sx?: Sx }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      {...props}
      {...styleProps(button({ variant, size }), sx)}
    >
      {typeof children === "function" ? children : withLabels(children)}
    </ButtonPrimitive>
  )
}

function LinkButton({
  sx,
  variant = "default",
  size = "default",
  children,
  ...props
}: Omit<LinkPrimitiveProps, "className" | "style"> &
  ButtonVariants & { sx?: Sx }) {
  return (
    <LinkPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      {...props}
      {...styleProps(button({ variant, size }), sx)}
    >
      {typeof children === "function" ? children : withLabels(children)}
    </LinkPrimitive>
  )
}

export { Button, LinkButton, button as buttonVariants }
