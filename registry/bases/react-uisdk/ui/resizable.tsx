"use client"

import { props as styleProps } from "@kirana-style/core"
import * as ResizablePrimitive from "react-resizable-panels"

import type { Sx } from "../../../lib/sx"
import { resizable } from "../../../styles/resizable.styles"

function ResizablePanelGroup({
  sx,
  ...props
}: Omit<ResizablePrimitive.GroupProps, "className"> & { sx?: Sx }) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      {...props}
      {...styleProps(resizable.group, sx)}
    />
  )
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  sx,
  ...props
}: Omit<ResizablePrimitive.SeparatorProps, "className"> & {
  withHandle?: boolean
  sx?: Sx
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      {...props}
      {...styleProps(resizable.handle, sx)}
    >
      {withHandle && <div sx={resizable.grip} />}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
