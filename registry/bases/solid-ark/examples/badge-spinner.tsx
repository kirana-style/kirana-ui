import { css } from "@kirana-style/core"
import { Badge } from "../ui/badge"
import { Spinner } from "../ui/spinner"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function BadgeSpinner() {
  const styles = {
    flexFlexWrapGap2: css({
      display: "flex",
      flexWrap: "wrap",
      gap: { "*": null, base: space[2] },
    }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexWrapGap2}>
        <Badge variant="destructive">
          <Spinner data-icon="inline-start" /> Deleting
        </Badge>
        <Badge variant="secondary">
          Generating <Spinner data-icon="inline-end" />
        </Badge>
      </div>
    </div>
  )
}
