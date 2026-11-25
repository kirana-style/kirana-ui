"use client"

import * as React from "react"

import { ProgressCircle, ProgressCircleLabel } from "../ui/progress-circle"
import { page } from "../../../styles/page.styles"

export default function ProgressCircleAnimated() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div sx={page.example}>
      <ProgressCircle value={progress} size="lg" aria-label="Upload progress">
        <ProgressCircleLabel />
      </ProgressCircle>
    </div>
  )
}
