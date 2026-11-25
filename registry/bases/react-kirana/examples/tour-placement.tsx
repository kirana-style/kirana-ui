"use client"

import * as React from "react"
import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import { Tour, TourContent } from "../ui/tour"
import type { TourStep } from "../ui/tour"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[6],
  }),
}

export default function TourPlacement() {
  const [open, setOpen] = React.useState(false)
  const target = React.useRef<HTMLButtonElement>(null)

  const steps: TourStep[] = (["top", "right", "bottom", "left"] as const).map(
    (side) => ({
      id: side,
      target: () => target.current,
      side,
      title: `On the ${side}`,
      description: `This step's popup is on the ${side} of its target.`,
    })
  )

  return (
    <div sx={page.example}>
      <div sx={styles.stack}>
        <Button ref={target} variant="outline">
          Target
        </Button>
        <Button onClick={() => setOpen(true)}>Show each side</Button>
      </div>
      <Tour steps={steps} open={open} onOpenChange={setOpen}>
        <TourContent />
      </Tour>
    </div>
  )
}
