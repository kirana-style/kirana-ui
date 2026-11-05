import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"

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

@Component({
  selector: "trace-sheet",
  imports: [
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    Trace,
    TraceIcon,
    TraceLine,
    TraceTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTrace [sx]="styles.narrow">
        <ng-container kuiSheet>
          <button kuiSheetTrigger>
            <span kuiTraceLine>
              <span kuiTraceIcon>
                <svg
                  iconPlaceholder
                  lucide="FolderSearchIcon"
                  tabler="IconFolderSearch"
                  hugeicons="SearchIcon"
                  phosphor="MagnifyingGlassIcon"
                  remixicon="RiSearchLine"
                ></svg>
              </span>
              <span kuiTraceTitle>Explored 4 files</span>
              <span kuiTraceIcon>
                <svg
                  iconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                ></svg>
              </span>
            </span>
          </button>
          <div kuiSheetContent>
            <div kuiSheetHeader>
              <h2 kuiSheetTitle>Explored 4 files</h2>
              <p kuiSheetDescription>
                Files read while preparing the response.
              </p>
            </div>
            <ul [sx]="styles.flexFlexColGap2Px6FontMo">
              <li>apps/v4/lib/docs.ts</li>
              <li>apps/v4/lib/components.ts</li>
              <li>apps/v4/next.config.mjs</li>
              <li>apps/v4/package.json</li>
            </ul>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class TraceSheet {
  protected readonly styles = styles
  protected readonly page = page
}
