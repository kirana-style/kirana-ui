"use client"

import * as React from "react"

import type { PartProps } from "../../../lib/kirana-render"
import { useSide } from "../../../lib/kirana-side"
import type { Side } from "../../../lib/placement"
import { Popover as PopoverPrimitive } from "@kirana-ui/react/popover"
import { props as styleProps } from "@kirana-style/core"

import type { Sx } from "../../../lib/sx"
import { popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

function Popover({ ...props }: PartProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

/** Base UI's `nativeButton`, which the primitives take on `Button` alone (PF-011): taken, not passed on. */
function PopoverTrigger({
  nativeButton,
  ...props
}: PartProps<typeof PopoverPrimitive.Trigger> & { nativeButton?: boolean }) {
  void nativeButton
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  sx,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: Props<PartProps<typeof PopoverPrimitive.Popup>> &
  Pick<
    PartProps<typeof PopoverPrimitive.Positioner>,
    "align" | "alignOffset" | "sideOffset"
  > & {
    /** Base UI\'s sides, the logical two among them (PF-016). */
    side?: Side
  }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={useSide(side)}
        sideOffset={sideOffset}
        {...styleProps(popover.positioner)}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          {...props}
          {...styleProps(popupMotion, popover.content, sx)}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

function PopoverHeader({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return <div data-slot="popover-header" {...props} sx={[popover.header, sx]} />
}

function PopoverTitle({
  sx,
  ...props
}: Props<PartProps<typeof PopoverPrimitive.Title>>) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      {...props}
      {...styleProps(popover.title, sx)}
    />
  )
}

function PopoverDescription({
  sx,
  ...props
}: Props<PartProps<typeof PopoverPrimitive.Description>>) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      {...props}
      {...styleProps(popover.description, sx)}
    />
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
