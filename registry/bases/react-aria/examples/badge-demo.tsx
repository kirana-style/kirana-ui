import { css } from "@kirana-style/core"

import { Badge } from "../ui/badge"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullFlexWrapJustify: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    flexWrap: "wrap",
    justifyContent: "center",
    gap: { "*": null, base: space[2] },
  }),
}

export default function BadgeDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullFlexWrapJustify}>
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </div>
  )
}
