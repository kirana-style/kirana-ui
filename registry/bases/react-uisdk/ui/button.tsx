"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@ui-sdk/react/button"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { slotRender } from "../../../lib/uisdk-slot"
import { button, buttonLabel } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * Base UI's Button's props, as every React base's part takes them: ui-sdk's, and `nativeButton`,
 * which ui-sdk does not need (it reads the element from `render`) and the part drops, keeping the
 * link role Base UI gives a button rendered as something else.
 */
type ButtonProps = Omit<
  React.ComponentProps<typeof ButtonPrimitive>,
  "className"
> &
  ButtonVariants & { sx?: Sx; nativeButton?: boolean }

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
  variant,
  size,
  children,
  nativeButton,
  render,
  "data-slot": slot = "button",
  ...props
}: ButtonProps & { "data-slot"?: string }) {
  // `nativeButton={false}` is a button drawn on a link (`render={<a href>}`): it keeps the link's
  // role, as Base UI's part does.
  const link = nativeButton === false ? { role: props.role ?? "link" } : null
  // Under the slot it is given: a trigger that renders it (`render={<Button />}`) passes its own,
  // which ui-sdk would replace with `button` (`slotRender`).
  return (
    <ButtonPrimitive
      {...props}
      {...link}
      render={slotRender(slot, "button", render)}
      {...styleProps(button({ variant, size }), sx)}
    >
      {typeof children === "function" ? children : withLabels(children)}
    </ButtonPrimitive>
  )
}

export { Button, button as buttonVariants }
export type { ButtonProps }
