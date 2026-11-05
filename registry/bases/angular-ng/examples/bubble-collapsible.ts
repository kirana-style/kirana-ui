import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
    paddingBlock: { "*": null, base: space[12] },
  }),
  whitespacePreLine: css({ whiteSpace: "pre-line" }),
  gap1P0TextMutedForegroun: css({
    gap: { "*": null, base: space[1] },
    padding: { "*": null, base: "0" },
    color: theme.mutedForeground,
  }),
  groupDataPanelOpenButton: css({
    rotate: { ':is([data-state="open"] *)': "180deg" },
  }),
}

const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`

const previewLength = 180

const isLong = text.length > previewLength

const preview = `${text.slice(0, previewLength)}...`

@Component({
  selector: "bubble-collapsible",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Collapsible,
    CollapsibleTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiBubble variant="muted">
          <div kuiBubbleContent>How can I help you today?</div>
        </div>
        <div kuiBubble variant="muted" align="end">
          <div kuiBubbleContent [sx]="styles.whitespacePreLine">
            <div kuiCollapsible [(open)]="open">
              <div>{{ open() || !isLong ? text : preview }}</div>
              @if (isLong) {
                <button
                  kuiButton
                  kuiCollapsibleTrigger
                  variant="link"
                  [sx]="styles.gap1P0TextMutedForegroun"
                >
                  {{ open() ? "Show less" : "Show more" }}
                  <svg
                    iconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                    data-icon="inline-end"
                    [sx]="styles.groupDataPanelOpenButton"
                  ></svg>
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class BubbleCollapsible {
  protected readonly open = signal(false)
  protected readonly styles = styles
  protected readonly text = text
  protected readonly isLong = isLong
  protected readonly preview = preview
  protected readonly page = page
}
