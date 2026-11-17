"use client"

import * as React from "react"

import { renderOver } from "../../../lib/kirana-render"
import type { PartProps } from "../../../lib/kirana-render"
import { Button as ButtonPrimitive } from "@kirana-ui/react/button"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { button, buttonLabel } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

type ButtonProps = Omit<PartProps<typeof ButtonPrimitive>, "className"> &
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

function Button(input: ButtonProps) {
  // A `render` element's own props over the part's, as on Base UI (PF-026): its children replace
  // the Button's as they are (no labels), and its classes join the Button's.
  const fromRender =
    React.isValidElement<{ children?: React.ReactNode }>(input.render) &&
    input.render.props.children !== undefined
  const { sx, variant, size, children, ...props } = renderOver(input)
  // `nativeButton={false}` is a button drawn on a link (`render={<a href>}`): it keeps the link's
  // role, where Base UI would announce it as a button.
  const link =
    props.nativeButton === false ? { role: props.role ?? "link" } : null
  const styled = styleProps(button({ variant, size }), sx)
  // The render element's class, moved onto the part by `renderOver`.
  const moved = (props as { className?: string }).className
  return (
    <ButtonPrimitive
      data-slot="button"
      {...props}
      {...link}
      {...styled}
      className={
        moved ? `${moved} ${styled.className ?? ""}` : styled.className
      }
    >
      {typeof children === "function" || fromRender
        ? children
        : withLabels(children)}
    </ButtonPrimitive>
  )
}

export { Button, button as buttonVariants }
export type { ButtonProps }
