import { Separator } from "../ui/separator"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    height: space[5],
    alignItems: "center",
    gap: space[4],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

export default function SeparatorVertical() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}
