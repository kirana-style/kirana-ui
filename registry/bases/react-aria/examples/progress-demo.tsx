import { css } from "@kirana-style/core"

import * as React from "react"

import { Progress } from "../ui/progress"
import { page } from "../../../styles/page.styles"

const styles = {
  w60: css({ width: { "*": null, base: "60%" } }),
}

export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div sx={page.example}>
      <Progress aria-label="Loading" value={progress} sx={styles.w60} />
    </div>
  )
}
