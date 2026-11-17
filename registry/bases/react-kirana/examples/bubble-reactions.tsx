import { css } from "@kirana-style/core"

import { toast } from "sonner"

import { Bubble, BubbleContent, BubbleReactions } from "../ui/bubble"
import { Button } from "../ui/button"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[12] },
    paddingBlock: { "*": null, base: space[12] },
  }),
}

export default function BubbleReactionsDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Bubble variant="muted" align="end">
          <BubbleContent>
            I don&apos;t need tests, I know my code works.
          </BubbleContent>
          <BubbleReactions
            align="start"
            role="img"
            aria-label="Reactions: thumbs up, surprised"
          >
            <span>👍</span>
            <span>😮</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            Bold. Fine I&apos;ll add some tests. I&apos;ll let you know when
            they&apos;re done.
          </BubbleContent>
          <BubbleReactions
            role="img"
            aria-label="Reactions: eyes, rocket, and 2 more"
          >
            <span>👀</span>
            <span>🚀</span>
            <span>+2</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="default" align="end">
          <BubbleContent>
            Tests passed on the first try. All 142 of them. Looking good!
          </BubbleContent>
          <BubbleReactions
            side="top"
            align="start"
            role="img"
            aria-label="Reactions: party popper, clapping hands"
          >
            <span>🎉</span>
            <span>👏</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="destructive">
          <BubbleContent>Are you sure I can run this command?</BubbleContent>
          <BubbleReactions>
            <Button
              variant="ghost"
              size="xs"
              onClick={() =>
                toast.success("You clicked yes, running command...")
              }
            >
              Yes, run it
            </Button>
          </BubbleReactions>
        </Bubble>
      </div>
    </div>
  )
}
