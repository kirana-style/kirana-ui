import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { spinner } from "../../../styles/spinner.styles"

export default function SpinnerCustom() {
  const styles = {
    row: css({ display: "flex", alignItems: "center", gap: space[4] }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.row}>
        <IconPlaceholder
          lucide="LoaderIcon"
          tabler="IconLoader"
          hugeicons="Loading03Icon"
          phosphor="SpinnerIcon"
          remixicon="RiLoader4Line"
          role="status"
          aria-label="Loading"
          {...styleProps(spinner)}
        />
      </div>
    </div>
  )
}
