import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { styles } from "./table"
import type { Sx } from "@kirana-style/core"

export function NumberHeader(props: {
  field: "target" | "limit"
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["field", "class", "sx"])
  // The target's and the limit's header, aligned as their fields are.

  return (
    <div
      {...styleProps(
        local.class,
        local.field === "target" ? styles.div4 : styles.div5,
        local.sx
      )}
      {...rest}
    >
      {local.field === "target" ? "Target" : "Limit"}
    </div>
  )
}
