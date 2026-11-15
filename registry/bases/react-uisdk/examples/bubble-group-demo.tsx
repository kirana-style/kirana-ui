import { css } from "@kirana-style/core"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "../ui/bubble"
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

export default function BubbleGroupDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Bubble variant="muted">
          <BubbleContent>Can you tell me what&apos;s the issue?</BubbleContent>
        </Bubble>
        <BubbleGroup>
          <Bubble align="end">
            <BubbleContent>You tell me!</BubbleContent>
          </Bubble>
          <Bubble align="end">
            <BubbleContent>It worked yesterday. You broke it!</BubbleContent>
          </Bubble>
          <Bubble align="end">
            <BubbleContent>Find the bug and fix it.</BubbleContent>
            <BubbleReactions aria-label="Reactions: eyes" align="start">
              <span>👀</span>
            </BubbleReactions>
          </Bubble>
        </BubbleGroup>
        <Bubble variant="muted">
          <BubbleContent>
            Want me to diff yesterday&apos;s you against today&apos;s you?
            It&apos;s a bit embarrassing.
          </BubbleContent>
        </Bubble>
      </div>
    </div>
  )
}
