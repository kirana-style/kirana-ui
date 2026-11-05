import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../../core/scales"
import { theme } from "../../../../core/tokens"
import { IconPlaceholder } from "../../../../icons/angular"
import { CardFooter } from "../../ui/card"

const styles = {
  // The area and line cards' footer: `flex w-full items-start gap-2` around a `grid gap-2`.
  footerRow: css({ display: "flex", alignItems: "flex-start", gap: space[2] }),
  lines: css({ display: "grid", gap: space[2] }),
  trendRow: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  noteRow: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    lineHeight: "1",
    color: theme.mutedForeground,
  }),
  icon: css({ width: space[4], height: space[4] }),
}

@Component({
  selector: "kui-trend-footer",
  imports: [CardFooter, IconPlaceholder, SxDirective],
  host: { style: "display: contents" },
  template: `
    <div kuiCardFooter>
      <div [sx]="styles.footerRow">
        <div [sx]="styles.lines">
          <div [sx]="styles.trendRow">
            Trending up by 5.2% this month{{ " " }}
            <svg
              iconPlaceholder
              lucide="TrendingUpIcon"
              tabler="IconTrendingUp"
              hugeicons="ChartUpIcon"
              phosphor="TrendUpIcon"
              remixicon="RiLineChartLine"
              [sx]="styles.icon"
            ></svg>
          </div>
          <div [sx]="styles.noteRow">{{ note() }}</div>
        </div>
      </div>
    </div>
  `,
})
export class TrendFooter {
  readonly note = input.required<string>()
  protected readonly styles = styles
}
