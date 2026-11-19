import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  ScrollArea as ScrollAreaPrimitive,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@ui-sdk/solid/scroll-area"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { scrollArea } from "../../../styles/scroll-area.styles"

/** ui-sdk's scroll area: the content in its viewport, with a vertical scrollbar over its edge. */
function ScrollArea(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={ScrollAreaPrimitive}
      slotName="scroll-area"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, scrollArea.root, props.sx)}
    >
      <UisdkPart
        part={ScrollAreaViewport}
        slotName="scroll-area-viewport"
        {...styleProps(scrollArea.viewport)}
      >
        {props.children}
      </UisdkPart>
      <ScrollBar />
      <ScrollAreaCorner />
    </UisdkPart>
  )
}

/** A scrollbar, its thumb there while its axis overflows. */
function ScrollBar(props: {
  orientation?: "vertical" | "horizontal"
  asChild?: AsChild
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "orientation", "asChild", "class", "sx")
  const orientation = () => props.orientation ?? "vertical"
  return (
    <UisdkPart
      part={ScrollAreaScrollbar}
      slotName="scroll-area-scrollbar"
      asChild={props.asChild}
      orientation={orientation()}
      data-orientation={orientation()}
      {...rest}
      {...styleProps(props.class, scrollArea.scrollbar, props.sx)}
    >
      <UisdkPart
        part={ScrollAreaThumb}
        slotName="scroll-area-thumb"
        {...styleProps(scrollArea.thumb)}
      />
    </UisdkPart>
  )
}

export { ScrollArea, ScrollBar }
