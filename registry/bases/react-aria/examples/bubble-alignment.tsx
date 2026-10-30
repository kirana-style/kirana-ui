import { css } from "@kirana-style/core"

import { Bubble, BubbleContent } from "../ui/bubble"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
}

export default function BubbleAlignmentDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Bubble variant="muted">
          <BubbleContent>
            This bubble is aligned to the start. This is the default alignment.
          </BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>
            This bubble is aligned to the end. Use this for user messages.
          </BubbleContent>
        </Bubble>
      </div>
    </div>
  )
}
