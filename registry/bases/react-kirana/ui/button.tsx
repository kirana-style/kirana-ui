"use client"

import * as React from "react"

import { Button as ButtonPrimitive } from "@kirana-ui/react/button"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { button, buttonLabel } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

type ButtonProps = Omit<
  React.ComponentProps<typeof ButtonPrimitive>,
  "className"
> &
  ButtonVariants & { sx?: Sx }

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

function Button({ sx, variant, size, children, ...props }: ButtonProps) {
  // `nativeButton={false}` is a button drawn on a link (`render={<a href>}`): it keeps the link's
  // role, where Base UI would announce it as a button.
  const link =
    props.nativeButton === false ? { role: props.role ?? "link" } : null
  // Kirana UI's button writes `type="button"` over the caller's, so a submit button would never
  // submit its form (PF-052): the caller's `type` is drawn last, through `render`.
  const typed =
    props.type && props.type !== "button" && !props.render
      ? {
          render: (rendered: React.ComponentProps<"button">) => (
            <button {...rendered} type={props.type} />
          ),
        }
      : null
  return (
    <ButtonPrimitive
      data-slot="button"
      {...props}
      {...link}
      {...typed}
      {...styleProps(button({ variant, size }), sx)}
    >
      {typeof children === "function" ? children : withLabels(children)}
    </ButtonPrimitive>
  )
}

export { Button, button as buttonVariants }
export type { ButtonProps }
