"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { button, buttonLabel } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

type ButtonProps = Omit<ButtonPrimitive.Props, "className"> &
  ButtonVariants & { sx?: Sx }

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

function Button({ sx, variant, size, children, ...props }: ButtonProps) {
  // `nativeButton={false}` is a button drawn on a link (`render={<a href>}`): it keeps the link's
  // role, where Base UI would announce it as a button.
  const link =
    props.nativeButton === false ? { role: props.role ?? "link" } : null
  return (
    <ButtonPrimitive
      data-slot="button"
      {...props}
      {...link}
      {...styleProps(button({ variant, size }), sx)}
    >
      {typeof children === "function" ? children : withLabels(children)}
    </ButtonPrimitive>
  )
}

export { Button, button as buttonVariants }
export type { ButtonProps }
