"use client"

import * as React from "react"

import { Field, FieldLabel } from "../ui/field"
import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control"
import { page } from "../../../styles/page.styles"

export default function SegmentedControlDemo() {
  const [view, setView] = React.useState("list")

  return (
    <div sx={page.example}>
      <Field sx={page.narrow}>
        <FieldLabel id="segmented-control-demo-label">View</FieldLabel>
        <SegmentedControl
          aria-labelledby="segmented-control-demo-label"
          value={view}
          onValueChange={setView}
        >
          <SegmentedControlItem value="list">List</SegmentedControlItem>
          <SegmentedControlItem value="board">Board</SegmentedControlItem>
          <SegmentedControlItem value="calendar">Calendar</SegmentedControlItem>
        </SegmentedControl>
      </Field>
    </div>
  )
}
