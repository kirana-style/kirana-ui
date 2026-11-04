import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import { Badge } from "../../../ui/badge"
import { styles } from "./table"
import type { Sx } from "@kirana-style/core"

export function StatusCell(props: {
  status: string
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["status", "class", "sx"])
  return (
    <Badge
      variant="outline"
      class={local.class}
      sx={[styles.badge2, local.sx]}
      {...rest}
    >
      {local.status === "Done" ? (
        <IconPlaceholder
          lucide="CircleCheckIcon"
          tabler="IconCircleCheckFilled"
          hugeicons="CheckmarkCircle01Icon"
          phosphor="CheckCircleIcon"
          remixicon="RiCheckboxCircleFill"
          {...styleProps(styles.iconPlaceholder)}
        />
      ) : (
        <IconPlaceholder
          lucide="LoaderIcon"
          tabler="IconLoader"
          hugeicons="Loading03Icon"
          phosphor="SpinnerIcon"
          remixicon="RiLoader4Line"
        />
      )}{" "}
      {local.status}
    </Badge>
  )
}
