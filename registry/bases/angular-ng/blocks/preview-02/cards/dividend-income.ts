import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { ChartConfig } from "../../../ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../ui/chart"
import { barCharts, useRoundedBars } from "./bars"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "../../../ui/item"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  chartContainer: css({
    display: { base: "none", [breakpoint.md]: "block" },
    height: space[8],
    width: space[24],
  }),
  span: css({
    display: { base: "none", [breakpoint.md]: "block" },
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
}

const HOLDINGS = [
  {
    name: "Vanguard VIG",
    shares: "450 Shares",
    amount: "$1,842.10",
    data: [
      { q: "Q1", value: 380 },
      { q: "Q2", value: 420 },
      { q: "Q3", value: 390 },
      { q: "Q4", value: 652 },
    ],
  },
  {
    name: "S&P 500 VOO",
    shares: "112 Shares",
    amount: "$928.40",
    data: [
      { q: "Q1", value: 180 },
      { q: "Q2", value: 210 },
      { q: "Q3", value: 320 },
      { q: "Q4", value: 218 },
    ],
  },
  {
    name: "Apple AAPL",
    shares: "85 Shares",
    amount: "$340.00",
    data: [
      { q: "Q1", value: 60 },
      { q: "Q2", value: 70 },
      { q: "Q3", value: 120 },
      { q: "Q4", value: 90 },
    ],
  },
  {
    name: "Realty Income",
    shares: "320 Shares",
    amount: "$1,139.50",
    data: [
      { q: "Q1", value: 240 },
      { q: "Q2", value: 260 },
      { q: "Q3", value: 280 },
      { q: "Q4", value: 360 },
    ],
  },
]

const miniChartConfig = {
  value: {
    label: "Dividend",
    color: theme.chart2,
  },
} satisfies ChartConfig

const CHARTS = HOLDINGS.map((holding) =>
  barCharts(holding.data, {
    id: "value",
    x: "q",
    y: "value",
    radius: 3,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })
)

@Component({
  selector: "kui-dividend-income",
  imports: [
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    IconPlaceholder,
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Q2 Dividend Income</div>
        <div kuiCardDescription>
          Quarterly dividend payouts across your portfolio holdings.
        </div>
        <div kuiCardAction>
          <button kuiButton variant="ghost" size="icon-sm" [sx]="styles.button">
            <svg
              iconPlaceholder
              lucide="XIcon"
              tabler="IconX"
              hugeicons="Cancel01Icon"
              phosphor="XIcon"
              remixicon="RiCloseLine"
            ></svg>
          </button>
        </div>
      </div>
      <div kuiCardContent>
        <div kuiItemGroup>
          @for (holding of HOLDINGS; track holding.name; let index = $index) {
            <div kuiItem variant="muted">
              <div kuiItemContent>
                <div kuiItemTitle>{{ holding.name }}</div>
                <p kuiItemDescription>{{ holding.shares }}</p>
              </div>
              <div
                kuiChartContainer
                [config]="miniChartConfig"
                [definition]="
                  rounded() ? CHARTS[index]!.rounded : CHARTS[index]!.square
                "
                [ariaLabel]="\`\${holding.name}, dividends by quarter\`"
                [initialWidth]="96"
                [height]="32"
                [sx]="styles.chartContainer"
              >
                <ng-template kuiChartTooltip>
                  <div kuiChartTooltipContent hideLabel></div>
                </ng-template>
              </div>
              <span [sx]="styles.span">{{ holding.amount }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class DividendIncome {
  protected readonly styles = styles
  protected readonly HOLDINGS = HOLDINGS
  protected readonly miniChartConfig = miniChartConfig
  protected readonly CHARTS = CHARTS
  protected readonly rounded = useRoundedBars()
}
