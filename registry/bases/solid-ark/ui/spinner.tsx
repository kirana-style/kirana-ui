import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { spinner } from "../../../styles/spinner.styles"
import { IconPlaceholder } from "./icon-placeholder"
import type { Sx } from "@kirana-style/core"

function Spinner(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <IconPlaceholder
      data-slot="spinner"
      lucide="Loader2Icon"
      tabler="IconLoader"
      hugeicons="Loading03Icon"
      phosphor="SpinnerIcon"
      remixicon="RiLoaderLine"
      role="status"
      aria-label="Loading"
      {...rest}
      {...styleProps(local.class, spinner, local.sx)}
    />
  )
}

export { Spinner }
