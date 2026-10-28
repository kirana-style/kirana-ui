import { css } from "@kirana-style/core"

import { Badge } from "../ui/badge"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexFlexWrapGap2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
  }),
}

export default function BadgeVariants() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexFlexWrapGap2}>
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
      </div>
    </div>
  )
}
