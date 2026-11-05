import { booleanAttribute, Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../../core/scales"
import { theme } from "../../../../core/tokens"
import { IconPlaceholder } from "../../../../icons/angular"
import { CardFooter } from "../../ui/card"

const styles = {
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
  note: css({ lineHeight: "1", color: theme.mutedForeground }),
  // `flex-col gap-2`, centred by the footer's own `items-center`.
  polarFooter: css({ flexDirection: "column", gap: space[2] }),
}

@Component({
  selector: "kui-polar-footer",
  imports: [CardFooter, IconPlaceholder, SxDirective],
  host: { style: "display: contents" },
  template: `
    <div kuiCardFooter [sx]="styles.polarFooter">
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
      <div [sx]="row() ? styles.noteRow : styles.note">{{ note() }}</div>
    </div>
  `,
})
export class PolarFooter {
  readonly note = input.required<string>()
  readonly row = input(false, { transform: booleanAttribute })
  protected readonly styles = styles
}
