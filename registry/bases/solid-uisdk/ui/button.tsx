import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { onCleanup, omit } from "solid-js"
import type { JSX } from "@solidjs/web"

import { Element } from "../../../lib/solid2/element"
import type { AsChild } from "../../../lib/solid2/element"
import { button, buttonLabel } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

type ButtonProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "class"> &
  ButtonVariants & {
    class?: string
    sx?: Sx
    /**
     * `false` where a part renders the button as an element whose content its own caller writes
     * (Pagination's link): React's renders that content outside the Button, so it has no label.
     */
    labelText?: boolean
    /** Ark's: the one child element takes the button's props. */
    asChild?: AsChild<"button">
  }

/**
 * Wraps each run of text directly inside the button in a label, as React's and Vue's Button wrap
 * their text children: Solid gives a component its children unread, so the runs are wrapped once
 * they are in the page, and again as they change (a label whose text Solid has replaced goes).
 * White space alone stays bare, which a flex container drops. Returns what stops it.
 */
function labelRuns(element: HTMLElement) {
  const className = styleProps(buttonLabel).class ?? ""
  // Solid replaces a text node whose value changes, which can leave a label empty; it keeps
  // updating a text node it created after the node moves into a label. Adjacent text nodes are not
  // joined: Solid inserts next to its own nodes, which a joined label would have moved.
  const wrap = () => {
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
  return () => observer.disconnect()
}

/**
 * A button, or the caller's own element (`asChild`, Ark UI's render function, as Vue's
 * `as-child`). A caller's `sx` merges after the button's own, so it wins. Rendered as its child,
 * the button labels the text written inside that child, as React's: the child takes the label's
 * `ref`, beside the caller's, with the button's other props.
 */
function Button(props: ButtonProps) {
  const rest = omit(
    props,
    "variant",
    "size",
    "class",
    "sx",
    "asChild",
    "labelText",
    "ref"
  )
  // Stopped with the button, in its own scope rather than the ref callback's.
  let stop: (() => void) | undefined
  onCleanup(() => stop?.())
  const label = (element: HTMLElement) => {
    if (props.labelText === false) return
    stop?.()
    stop = labelRuns(element)
  }
  return (
    <Element
      as="button"
      data-slot="button"
      asChild={props.asChild}
      {...rest}
      {...styleProps(
        props.class,
        button({ variant: props.variant, size: props.size }),
        props.sx
      )}
      ref={[props.ref, label]}
    />
  )
}

export { Button, button as buttonVariants }
export type { ButtonProps }
