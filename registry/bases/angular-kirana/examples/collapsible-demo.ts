import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"

const styles = {
  root: css({
    display: "flex",
    width: "350px",
    flexDirection: "column",
    gap: space[2],
  }),
  header: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[4],
    paddingInline: space[4],
  }),
  title: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
  }),
  trigger: css({ width: space[8], height: space[8] }),
  box: css({
    borderRadius: radius.md,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  status: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  content: css({ display: "flex", flexDirection: "column", gap: space[2] }),
  muted: css({ color: theme.mutedForeground }),
  strong: css({ fontWeight: fontWeight.medium }),
}

@Component({
  selector: "collapsible-demo",
  imports: [
    Button,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiCollapsible [(open)]="isOpen" [sx]="styles.root">
        <div [sx]="styles.header">
          <h4 [sx]="styles.title">Order #4189</h4>
          <button
            kuiButton
            kuiCollapsibleTrigger
            variant="ghost"
            size="icon"
            [sx]="styles.trigger"
          >
            <svg
              iconPlaceholder
              lucide="ChevronsUpDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretUpDownIcon"
              remixicon="RiArrowUpDownLine"
            ></svg>
            <span [sx]="visuallyHidden">Toggle details</span>
          </button>
        </div>
        <div [sx]="[styles.box, styles.status]">
          <span [sx]="styles.muted">Status</span>
          <span [sx]="styles.strong">Shipped</span>
        </div>
        <div kuiCollapsibleContent [sx]="styles.content">
          <div [sx]="styles.box">
            <p [sx]="styles.strong">Shipping address</p>
            <p [sx]="styles.muted">100 Market St, San Francisco</p>
          </div>
          <div [sx]="styles.box">
            <p [sx]="styles.strong">Items</p>
            <p [sx]="styles.muted">2x Studio Headphones</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CollapsibleDemo {
  protected readonly isOpen = signal(false)
  protected readonly styles = styles
  protected readonly page = page
  protected readonly visuallyHidden = visuallyHidden
}
