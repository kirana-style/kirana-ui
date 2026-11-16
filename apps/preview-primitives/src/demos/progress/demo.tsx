import { useState } from "react"

import { Progress } from "@kirana-ui/react/progress"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<
    "frame" | "root" | "label" | "value" | "track" | "indicator" | "button"
  >
}) {
  const [done, setDone] = useState(40)
  const complete = done === 100

  return (
    <div {...s.frame}>
      <Progress.Root value={done} {...s.root}>
        <Progress.Label {...s.label}>Uploading photos</Progress.Label>
        <Progress.Value {...s.value} />
        <Progress.Track {...s.track}>
          <Progress.Indicator {...s.indicator} />
        </Progress.Track>
      </Progress.Root>
      <button
        type="button"
        onClick={() => setDone(complete ? 0 : done + 20)}
        {...s.button}
      >
        {complete ? "Start over" : "Upload more"}
      </button>
    </div>
  )
}
