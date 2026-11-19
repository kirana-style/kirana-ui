import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Badge } from "../../../ui/badge"
import { styles } from "./table"
import type { Sx } from "@kirana-style/core"

export function TypeCell(props: {
  type: string
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["type", "class", "sx"])
  return (
    <div {...styleProps(local.class, styles.div3, local.sx)} {...rest}>
      <Badge variant="outline" sx={styles.badge}>
        {local.type}
      </Badge>
    </div>
  )
}
