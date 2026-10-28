import { css } from "@kirana-style/core"

import { Badge } from "../ui/badge"
import { Spinner } from "../ui/spinner"
import { space } from "../../../core/scales"
import { radiusBase } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  flexItemsCenterGap4Radiu: css({
    display: "flex",
    alignItems: "center",
    gap: { "*": null, base: space[4] },
    [radiusBase.value]: "1.2rem",
  }),
}

export default function SpinnerBadge() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexItemsCenterGap4Radiu}>
        <Badge>
          <Spinner data-icon="inline-start" />
          Syncing
        </Badge>
        <Badge variant="secondary">
          <Spinner data-icon="inline-start" />
          Updating
        </Badge>
        <Badge variant="outline">
          <Spinner data-icon="inline-start" />
          Processing
        </Badge>
      </div>
    </div>
  )
}
