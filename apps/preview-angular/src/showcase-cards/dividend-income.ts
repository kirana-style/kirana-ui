import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "@workspace/registry/core/tokens"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { IconPlaceholder } from "@workspace/registry/icons/angular"
import { Button } from "@workspace/registry/bases/angular-ng/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/angular-ng/ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@workspace/registry/bases/angular-ng/ui/item"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  div: css({
    display: { base: "none", [breakpoint.md]: "flex" },
    height: space[8],
    width: space[24],
    alignItems: "flex-end",
    gap: space[1],
  }),
  div2: css({
    minHeight: space[1],
    flex: "1 1 0%",
    borderTopLeftRadius: radius.sm,
    borderTopRightRadius: radius.sm,
    backgroundColor: theme.chart2,
  }),
}

const HOLDINGS = [
  {
    name: "Vanguard",
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
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
    IconPlaceholder,
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
          <button
            kuiButton
            variant="ghost"
            size="icon-sm"
            [sx]="styles.button"
            aria-label="Dismiss dividend income"
          >
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
          @for (holding of HOLDINGS; track holding.name) {
            <div kuiItem role="listitem" variant="muted">
              <div kuiItemContent>
                <div kuiItemTitle>{{ holding.name }}</div>
                <p kuiItemDescription>{{ holding.shares }}</p>
              </div>
              <div
                [sx]="styles.div"
                role="img"
                [attr.aria-label]="\`\${holding.name} quarterly dividends\`"
              >
                @for (item of holding.data; track item.q) {
                  <div
                    [sx]="styles.div2"
                    [attr.style]="{
                      height: \`\${(item.value / Math.max(...holding.data.map((point) => point.value))) * 100}%\`,
                    }"
                  ></div>
                }
              </div>
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
  protected readonly Math = Math
}
