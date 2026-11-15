import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Bubble, BubbleContent, BubbleReactions } from "../ui/bubble"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function BubbleTooltipDemo() {
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
                render={<Button variant="ghost" size="icon-xs" />}
              >
                <IconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                  phosphor="CheckIcon"
                  remixicon="RiCheckLine"
                />
              </TooltipTrigger>
              <TooltipContent>Read on Jan 5, 2026 at 4:32 PM</TooltipContent>
            </Tooltip>
          </BubbleReactions>
        </Bubble>
      </div>
    </div>
  )
}
