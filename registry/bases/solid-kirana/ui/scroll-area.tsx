import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { ScrollArea as ScrollAreaPrimitive } from "@kirana-ui/solid/scroll-area"
import { asRender } from "../../../lib/solid2/element"
import { scrollArea } from "../../../styles/scroll-area.styles"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"
import { withDefaults } from "../../../lib/solid2/with-defaults"

/** The viewport holds the content directly, as React's: no content element between them. */
function ScrollArea(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const local = props
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <ScrollAreaPrimitive.Root
      render={asRender(local.asChild)}
      data-slot="scroll-area"
      {...rest}
      {...styleProps(local.class, scrollArea.root, local.sx)}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        {...styleProps(scrollArea.viewport)}
      >
        {local.children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

/** In the page while there is something to scroll its way, as Kirana UI's scrollbar is. */
function ScrollBar(props: {
  orientation?: "vertical" | "horizontal"
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const local = withDefaults({ orientation: "vertical" } as const, props)
  const rest = omit(local, "orientation", "asChild", "class", "sx")
  return (
    <ScrollAreaPrimitive.Scrollbar
      render={asRender(local.asChild)}
      data-slot="scroll-area-scrollbar"
      data-orientation={local.orientation}
      orientation={local.orientation}
      {...rest}
      {...styleProps(local.class, scrollArea.scrollbar, local.sx)}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        {...styleProps(scrollArea.thumb)}
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
