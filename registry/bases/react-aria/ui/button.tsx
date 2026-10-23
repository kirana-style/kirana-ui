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

/** Wraps each run of text so it is trimmed to its capitals; icons and elements pass through. */
function withLabels(children: React.ReactNode) {
  return React.Children.map(children, (child) =>
    typeof child === "string" || typeof child === "number" ? (
      <span data-slot="button-label" sx={buttonLabel}>
        {child}
      </span>
    ) : (
      child
    )
  )
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
