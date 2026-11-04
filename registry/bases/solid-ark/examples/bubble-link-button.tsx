import { css } from "@kirana-style/core"
import { toast } from "solid-sonner"
import { Bubble, BubbleContent, BubbleGroup } from "../ui/bubble"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function BubbleLinkButton() {
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

  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Bubble variant="muted">
          <BubbleContent>How can I help you today?</BubbleContent>
        </Bubble>
        <BubbleGroup>
          <Bubble variant="tinted" align="end">
            <BubbleContent
              asChild={(props) => (
                <button
                  {...props()}
                  onClick={() => toast("You clicked forgot password")}
                >
                  I forgot my password
                </button>
              )}
            />
          </Bubble>
          <Bubble variant="tinted" align="end">
            <BubbleContent
              asChild={(props) => (
                <button
                  {...props()}
                  onClick={() => toast("You clicked help with subscription")}
                >
                  I need help with my subscription
                </button>
              )}
            />
          </Bubble>
          <Bubble variant="tinted" align="end">
            <BubbleContent
              asChild={(props) => (
                <button
                  {...props()}
                  onClick={() =>
                    toast("You clicked something else. Talk to a human.")
                  }
                >
                  Something else. Talk to a human.
                </button>
              )}
            />
          </Bubble>
        </BubbleGroup>
      </div>
    </div>
  )
}
