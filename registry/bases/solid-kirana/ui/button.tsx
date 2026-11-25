import { Button as ButtonPrimitive } from "@kirana-ui/solid/button"
import { props as styleProps } from "@kirana-style/core"
import type { Sx } from "@kirana-style/core"
import { omit } from "solid-js"
import type { JSX } from "@solidjs/web"

import { asRender } from "../../../lib/solid2/element"
import type { AsChild } from "../../../lib/solid2/element"
import { button, buttonLabel } from "../../../styles/button.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

type ButtonProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  "class" | "disabled"
> &
  ButtonVariants & {
    class?: string
    /** Kirana UI's button's: a boolean, where Solid's element also takes `""`. */
    disabled?: boolean
    sx?: Sx
    /**
     * `false` where a part renders the button as an element whose content its own caller writes
     * (Pagination's link): React's renders that content outside the Button, so it has no label.
     */
    labelText?: boolean
    /** Ark UI's, as every Solid base takes it: the one child element takes the button's props. */
    asChild?: AsChild<"button">
  }

/**
 * Wraps each run of text directly inside the button in a label, as React's and Vue's Button wrap
 * their text children: Solid gives a component its children unread, so the runs are wrapped once
 * they are in the page, and again as they change (a label whose text Solid has replaced goes).
 * White space alone stays bare, which a flex container drops.
 */
const labelled = new WeakSet<HTMLElement>()

function labelRuns(element: HTMLElement) {
  // Once an element: a second observer would race the first and leave an empty label.
  if (labelled.has(element)) return
  labelled.add(element)
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
  // As long as the element lives, and no longer: it holds the observer. Not disposed with the
  // owner that ran the `ref`, which, under a part's `render`, can end while the element stays.
  new MutationObserver(wrap).observe(element, {
    childList: true,
    subtree: true,
  })
}

/**
 * Kirana UI's button, which a caller renders as its own element (`asChild`, Ark UI's render
 * function, as Vue's `as-child`), given the button's props and a native button's keyboard. A
 * caller's `sx` merges after the button's own, so it wins.
 */
function Button(props: ButtonProps) {
  const local = props
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
  const label = (element: HTMLElement) =>
    local.labelText !== false && labelRuns(element)
  // A part rendered as the button (a dialog's Close) hands its own `ref` in the props: the part's
  // DOM work attaches through it, so the label's runs are added beside it, not in its place.
  // Rendered as its child (`asChild`), the button's `ref` reaches that child's element, so its
  // text is labelled once, there. A link that navigates stays a link, with no role written.
  return (
    <ButtonPrimitive
      data-slot="button"
      nativeButton={local.asChild ? false : undefined}
      render={asRender(local.asChild)}
      {...rest}
      {...styleProps(
        local.class,
        button({ variant: local.variant, size: local.size }),
        local.sx
      )}
      ref={[local.ref, label]}
    />
  )
}

export { Button, button as buttonVariants }
export type { ButtonProps }
