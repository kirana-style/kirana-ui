import { css, props as styleProps } from "@kirana-style/core"

import { space } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { page } from "../../../styles/page.styles"
import { spinner } from "../../../styles/spinner.styles"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[4] }),
}

/** A spinner of your own: another icon, the same style. */
function Spinner({
  sx,
  ...props
}: Omit<React.ComponentProps<"svg">, "className"> & { sx?: Sx }) {
  return (
    <IconPlaceholder
      lucide="LoaderIcon"
      tabler="IconLoader"
      hugeicons="Loading03Icon"
      phosphor="SpinnerIcon"
      remixicon="RiLoader4Line"
      role="status"
      aria-label="Loading"
      {...props}
      {...styleProps(spinner, sx)}
    />
  )
}

export default function SpinnerCustom() {
  return (
    <div sx={page.example}>
      <div sx={styles.row}>
        <Spinner />
      </div>
    </div>
  )
}
