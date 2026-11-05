import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { Progress, ProgressLabel, ProgressValue } from "../ui/progress"
import { Slider } from "../ui/slider"

const styles = {
  // A row of the example's card, which upstream's `*:[div:not([class*='w-'])]:w-full` widens.
  row: css({ width: "100%" }),
  flexWFullFlexColGap4: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  full: css({ width: "100%" }),
  px0: css({ paddingInline: { "*": null, base: space[0] } }),
  size5: css({
    width: { "*": null, base: space[5] },
    height: { "*": null, base: space[5] },
  }),
  inlineBlockTruncate: css({
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  inline: css({ display: "inline" }),
  w32: css({ width: { "*": null, base: space[32] } }),
  w16JustifyEnd: css({
    width: { "*": null, base: space[16] },
    justifyContent: "flex-end",
  }),
  textSmTextMutedForegroun: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

const files = [
  {
    id: "1",
    name: "document.pdf",
    progress: 45,
    timeRemaining: "2m 30s",
  },
  {
    id: "2",
    name: "presentation.pptx",
    progress: 78,
    timeRemaining: "45s",
  },
  {
    id: "3",
    name: "spreadsheet.xlsx",
    progress: 12,
    timeRemaining: "5m 12s",
  },
  {
    id: "4",
    name: "image.jpg",
    progress: 100,
    timeRemaining: "Complete",
  },
]

@Component({
  selector: "progress-example",
  imports: [
    Example,
    ExampleWrapper,
    Item,
    ItemActions,
    ItemContent,
    ItemGroup,
    ItemMedia,
    ItemTitle,
    Progress,
    ProgressLabel,
    ProgressValue,
    Slider,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- ProgressValues -->
      <div kuiExample title="Progress Bar">
        <div [sx]="styles.flexWFullFlexColGap4">
          <div kuiProgress [value]="0"></div>
          <div kuiProgress [value]="25" [sx]="styles.full"></div>
          <div kuiProgress [value]="50"></div>
          <div kuiProgress [value]="75"></div>
          <div kuiProgress [value]="100"></div>
        </div>
      </div>
      <!-- ProgressWithLabel -->
      <div kuiExample title="With Label">
        <div kuiProgress [value]="56" [sx]="styles.row">
          <span kuiProgressLabel>Upload progress</span>
          <span kuiProgressValue></span>
        </div>
      </div>
      <!-- ProgressControlled -->
      <div kuiExample title="Controlled">
        <div [sx]="styles.flexWFullFlexColGap4">
          <div kuiProgress [value]="value()" [sx]="styles.full"></div>
          <div
            kuiSlider
            [(value)]="value"
            [min]="0"
            [max]="100"
            [step]="1"
          ></div>
        </div>
      </div>
      <!-- FileUploadList -->
      <div kuiExample title="File Upload List">
        <div kuiItemGroup>
          @for (file of files; track file.id) {
            <div kuiItem size="xs" [sx]="styles.px0">
              <div kuiItemMedia variant="icon">
                <svg
                  iconPlaceholder
                  lucide="FileIcon"
                  tabler="IconFile"
                  hugeicons="FileIcon"
                  phosphor="FileIcon"
                  remixicon="RiFileLine"
                  [sx]="styles.size5"
                ></svg>
              </div>
              <div kuiItemContent [sx]="styles.inlineBlockTruncate">
                <div kuiItemTitle [sx]="styles.inline">{{ file.name }}</div>
              </div>
              <div kuiItemContent>
                <div
                  kuiProgress
                  [value]="file.progress"
                  [sx]="styles.w32"
                ></div>
              </div>
              <div kuiItemActions [sx]="styles.w16JustifyEnd">
                <span [sx]="styles.textSmTextMutedForegroun">{{
                  file.timeRemaining
                }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export default class ProgressExample {
  protected readonly value = signal(50)
  protected readonly styles = styles
  protected readonly files = files
}
