import { Separator } from "../ui/separator"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    display: "flex",
    width: "100%",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  dl: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  dd: css({
    color: theme.mutedForeground,
  }),
  dl2: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  dd2: css({
    color: theme.mutedForeground,
  }),
  dl3: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  dd3: css({
    color: theme.mutedForeground,
  }),
}

export default function SeparatorList() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <dl sx={styles.dl}>
          <dt>Item 1</dt>
          <dd sx={styles.dd}>Value 1</dd>
        </dl>
        <Separator />
        <dl sx={styles.dl2}>
          <dt>Item 2</dt>
          <dd sx={styles.dd2}>Value 2</dd>
        </dl>
        <Separator />
        <dl sx={styles.dl3}>
          <dt>Item 3</dt>
          <dd sx={styles.dd3}>Value 3</dd>
        </dl>
      </div>
    </div>
  )
}
