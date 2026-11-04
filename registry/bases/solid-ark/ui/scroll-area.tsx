import { Show, mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useScrollAreaContext,
} from "@ark-ui/solid"
import { scrollArea } from "../../../styles/scroll-area.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type {
  ScrollAreaRootProps,
  ScrollAreaScrollbarProps,
} from "@ark-ui/solid"

function ScrollArea(props: {
  asChild?: ScrollAreaRootProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <ScrollAreaRoot
      asChild={local.asChild}
      data-slot="scroll-area"
      {...rest}
      {...styleProps(local.class, scrollArea.root, local.sx)}
    >
      <ScrollAreaViewport
        data-slot="scroll-area-viewport"
        {...styleProps(scrollArea.viewport)}
      >
        <ScrollAreaContent>{local.children}</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollBar />
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  )
}

function ScrollBar(props: {
  orientation?: "vertical" | "horizontal"
  asChild?: ScrollAreaScrollbarProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ orientation: "vertical" } as const, props),
    ["orientation", "asChild", "class", "sx"]
  )
  const context = useScrollAreaContext()
  return (
    <Show
      when={
        local.orientation === "vertical"
          ? context().hasOverflowY
          : context().hasOverflowX
      }
    >
      <ScrollAreaScrollbar
        asChild={local.asChild}
        data-slot="scroll-area-scrollbar"
        orientation={local.orientation}
        {...rest}
        {...styleProps(local.class, scrollArea.scrollbar, local.sx)}
      >
        <ScrollAreaThumb
          data-slot="scroll-area-thumb"
          {...styleProps(scrollArea.thumb)}
        />
      </ScrollAreaScrollbar>
    </Show>
  )
}

export { ScrollArea, ScrollBar }
