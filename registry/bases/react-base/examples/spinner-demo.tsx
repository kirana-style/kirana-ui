import { css } from "@kirana-style/core"

import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item"
import { Spinner } from "../ui/spinner"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { radiusBase } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWXsFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xs,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
    [radiusBase.value]: "1rem",
  }),
  lineClamp1: css({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
  }),
  flexNoneJustifyEnd: css({ flex: "none", justifyContent: "flex-end" }),
  textSmTabularNums: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontVariantNumeric: "tabular-nums",
  }),
}

export default function SpinnerDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWXsFlexColGa}>
        <Item variant="muted">
          <ItemMedia>
            <Spinner />
          </ItemMedia>
          <ItemContent>
            <ItemTitle sx={styles.lineClamp1}>Processing payment...</ItemTitle>
          </ItemContent>
          <ItemContent sx={styles.flexNoneJustifyEnd}>
            <span sx={styles.textSmTabularNums}>$100.00</span>
          </ItemContent>
        </Item>
      </div>
    </div>
  )
}
