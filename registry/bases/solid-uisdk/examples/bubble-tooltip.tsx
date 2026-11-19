import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { Bubble, BubbleContent, BubbleReactions } from "../ui/bubble"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function BubbleTooltip() {
  const styles = {
    flexWFullMaxWSmFlexColGa: css({
      display: "flex",
      width: { "*": null, base: "100%" },
      maxWidth: containerSize.sm,
      flexDirection: "column",
      gap: { "*": null, base: space[4] },
      paddingBlock: { "*": null, base: space[12] },
    }),
  }

  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Bubble variant="secondary">
          <BubbleContent>Did you remove the stale route?</BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>Yes, removed it from the registry.</BubbleContent>
          <BubbleReactions>
            <Tooltip>
              <TooltipTrigger
                asChild={(props) => (
                  <Button {...props()} variant="ghost" size="icon-xs">
                    <IconPlaceholder
                      lucide="CheckIcon"
                      tabler="IconCheck"
                      hugeicons="Tick02Icon"
                      phosphor="CheckIcon"
                      remixicon="RiCheckLine"
                    />
                  </Button>
                )}
              />
              <TooltipContent>Read on Jan 5, 2026 at 4:32 PM</TooltipContent>
            </Tooltip>
          </BubbleReactions>
        </Bubble>
      </div>
    </div>
  )
}
