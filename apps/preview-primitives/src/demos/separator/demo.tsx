import { Separator } from "@kirana-ui/react/separator"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"frame" | "title" | "text" | "separator" | "row">
}) {
  return (
    <div {...s.frame}>
      <p {...s.title}>Morning walk</p>
      <p {...s.text}>Along the river and back through the park.</p>
      <Separator {...s.separator} />
      <div {...s.row}>
        <span>4.2 km</span>
        <Separator orientation="vertical" {...s.separator} />
        <span>52 min</span>
        <Separator orientation="vertical" {...s.separator} />
        <span>Easy</span>
      </div>
    </div>
  )
}
