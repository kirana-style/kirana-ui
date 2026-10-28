import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { spinner } from "../../../styles/spinner.styles"

function Spinner({
  sx,
  ...props
}: Omit<React.ComponentProps<"svg">, "className"> & { sx?: Sx }) {
  return (
    <IconPlaceholder
      lucide="Loader2Icon"
      tabler="IconLoader"
      hugeicons="Loading03Icon"
      phosphor="SpinnerIcon"
      remixicon="RiLoaderLine"
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      {...props}
      {...styleProps(spinner, sx)}
    />
  )
}

export { Spinner }
