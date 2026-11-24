"use client"

import * as React from "react"

import { Button as ButtonPrimitive } from "@kirana-ui/react/button"
import { mergeProps } from "@kirana-ui/react/use-render"
import type { RenderedProps } from "@kirana-ui/react/runtime"
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
  // What the caller means and Kirana UI's button writes over (PF-052, PF-056): `type="submit"` or
  // `"reset"`, else a submit button never submits its form; and, on a link drawn as a button
  // (`nativeButton={false}`, `render={<a href>}`), the link's role, where it writes
  // `role="button"`. They are drawn last, through `render`: on the caller's own element, its props
  // merged with the part's as the primitive would, or on a `<button>`.
  const own: Record<string, string> = {
    ...(props.nativeButton === false ? { role: props.role ?? "link" } : {}),
    ...(props.type && props.type !== "button" ? { type: props.type } : {}),
  }
  const caller = props.render
  const drawn = Object.keys(own).length
    ? {
        render: (
          rendered: RenderedProps,
          state: Parameters<
            Extract<typeof caller, (...args: never) => unknown>
          >[1]
        ) =>
          typeof caller === "function" ? (
            caller({ ...rendered, ...own }, state)
          ) : React.isValidElement<Record<string, unknown>>(caller) ? (
            React.cloneElement(caller, {
              ...mergeProps(caller.props, rendered),
              ...own,
            })
          ) : (
            <button {...rendered} {...own} />
          ),
      }
    : null
  return (
    <ButtonPrimitive
      data-slot="button"
      {...props}
      {...drawn}
      {...styleProps(button({ variant, size }), sx)}
    >
      {typeof children === "function" ? children : withLabels(children)}
    </ButtonPrimitive>
  )
}

export { Button, button as buttonVariants }
export type { ButtonProps }
