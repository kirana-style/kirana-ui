import { ark } from "@ark-ui/solid"
import type { PolymorphicProps } from "@ark-ui/solid"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { onCleanup, splitProps } from "solid-js"
import type { JSX } from "solid-js"

import { button, buttonLabel } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

type ButtonProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "class"> &
  ButtonVariants & {
    class?: string
    sx?: Sx
    /** Ark's: the one child element takes the button's props. */
    asChild?: PolymorphicProps<"button">["asChild"]
  }

/**
 * Wraps each run of text directly inside the button in a label, as React's and Vue's Button wrap
 * their text children: Solid gives a component its children unread, so the runs are wrapped once
 * they are in the page, and again as they change (a label whose text Solid has replaced goes).
 * White space alone stays bare, which a flex container drops.
 */
function labelText(element: HTMLElement) {
  const className = styleProps(buttonLabel).class ?? ""
  const wrap = () => {
    // Solid replaces a text node whose value changes: the label it was in is left empty.
    for (const label of Array.from(
      element.querySelectorAll(':scope > [data-slot="button-label"]')
    ))
      if (!label.textContent) label.remove()
    // A copy: wrapping a text node changes the live list.
    for (const node of Array.from(element.childNodes)) {
      if (node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim())
        continue
      const label = document.createElement("span")
      label.dataset.slot = "button-label"
      label.className = className
      node.replaceWith(label)
      label.append(node)
    }
  }
  queueMicrotask(wrap)
  const observer = new MutationObserver(wrap)
  observer.observe(element, { childList: true, subtree: true })
  onCleanup(() => observer.disconnect())
}

/**
 * Ark's element, so a caller can render it as its own (`asChild`, Ark's render function, as Vue's
 * `as-child`). A caller's `sx` merges after the button's own, so it wins.
 */
function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    "variant",
    "size",
    "class",
    "sx",
    "asChild",
  ])
  // Rendered as its child, the button labels the text written inside that child, as React's: the
  // child takes the label's `ref` with the button's other props.
  const asChild = () => {
    const render = local.asChild
    if (!render) return undefined
    return ((childProps: () => Record<string, unknown>) =>
      render(() => ({
        ...childProps(),
        ref: labelText,
      }))) as PolymorphicProps<"button">["asChild"]
  }
  return (
    <ark.button
      data-slot="button"
      asChild={asChild()}
      {...rest}
      {...styleProps(
        local.class,
        button({ variant: local.variant, size: local.size }),
        local.sx
      )}
      ref={labelText}
    />
  )
}

export { Button, button as buttonVariants }
export type { ButtonProps }
