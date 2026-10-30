import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button as ButtonPrimitive } from "react-aria-components"

import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
import {
  containerSize,
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  flexFlexColGap2Px6FontMo: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[2] },
    paddingInline: { "*": null, base: space[6] },
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
}

export default function TraceSheet() {
  return (
    <div sx={page.example}>
      <Trace sx={styles.narrow}>
        <SheetTrigger>
          <ButtonPrimitive>
            <TraceLine>
              <TraceIcon>
                <IconPlaceholder
                  lucide="FolderSearchIcon"
                  tabler="IconFolderSearch"
                  hugeicons="SearchIcon"
                  phosphor="MagnifyingGlassIcon"
                  remixicon="RiSearchLine"
                />
              </TraceIcon>
              <TraceTitle>Explored 4 files</TraceTitle>
              <TraceIcon>
                <IconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                />
              </TraceIcon>
            </TraceLine>
          </ButtonPrimitive>
          <Sheet>
            <SheetHeader>
              <SheetTitle>Explored 4 files</SheetTitle>
              <SheetDescription>
                Files read while preparing the response.
              </SheetDescription>
            </SheetHeader>
            <ul sx={styles.flexFlexColGap2Px6FontMo}>
              <li>apps/v4/lib/docs.ts</li>
              <li>apps/v4/lib/components.ts</li>
              <li>apps/v4/next.config.mjs</li>
              <li>apps/v4/package.json</li>
            </ul>
          </Sheet>
        </SheetTrigger>
      </Trace>
    </div>
  )
}
