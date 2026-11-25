import { createSignal, onSettled } from "solid-js"

import { ProgressCircle, ProgressCircleLabel } from "../ui/progress-circle"
import { page } from "../../../styles/page.styles"

export default function ProgressCircleAnimated() {
  const [progress, setProgress] = createSignal(13)

  onSettled(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  })

  return (
    <div sx={page.example}>
      <ProgressCircle value={progress()} size="lg" aria-label="Upload progress">
        <ProgressCircleLabel />
      </ProgressCircle>
    </div>
  )
}
