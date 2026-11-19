import { createSignal, onMount } from "solid-js"
import { css } from "@kirana-style/core"
import { Progress } from "../ui/progress"
import { page } from "../../../styles/page.styles"

export default function ProgressDemo() {
  const styles = {
    w60: css({ width: { "*": null, base: "60%" } }),
  }

  const [progress, setProgress] = createSignal(13)

  onMount(() => {
    setTimeout(() => (setProgress(66), 500))
  })

  return (
    <div sx={page.example}>
      <Progress value={progress()} sx={styles.w60} />
    </div>
  )
}
