import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Bubble, BubbleContent, BubbleReactions } from "../ui/bubble"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
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
  ariaExpandedTextDestruct: css({
    color: { '[aria-expanded="true"]': theme.destructive },
  }),
  textSm: css({ fontSize: fontSize.sm, lineHeight: lineHeight.sm }),
}

export default function BubblePopoverDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Bubble align="end">
          <BubbleContent>Run the build script.</BubbleContent>
        </Bubble>
        <Bubble variant="destructive">
          <BubbleContent>Failed to run the command.</BubbleContent>
          <BubbleReactions>
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Show error details"
                    sx={styles.ariaExpandedTextDestruct}
                  />
                }
              >
                <IconPlaceholder
                  lucide="InfoIcon"
                  tabler="IconInfoCircle"
                  hugeicons="AlertCircleIcon"
                  phosphor="InfoIcon"
                  remixicon="RiInformationLine"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle sx={styles.textSm}>
                    Command failed with exit code 1
                  </PopoverTitle>
                  <PopoverDescription sx={styles.textSm}>
                    ENOENT: no such file or directory, open pnpm-lock.yaml
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </BubbleReactions>
        </Bubble>
      </div>
    </div>
  )
}
