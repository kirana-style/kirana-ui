import { For } from "solid-js"
import { IconPlaceholder } from "@workspace/registry/bases/solid-ark/ui/icon-placeholder.tsx"
import { Button } from "@workspace/registry/bases/solid-ark/ui/button.tsx"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/solid-ark/ui/card.tsx"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@workspace/registry/bases/solid-ark/ui/item.tsx"
import { css } from "@kirana-style/core"
import { radius, theme } from "@workspace/registry/core/tokens"
import { breakpoint, space } from "@workspace/registry/core/scales"

export default function DividendIncome() {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Q2 Dividend Income</CardTitle>
        <CardDescription>
          Quarterly dividend payouts across your portfolio holdings.
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            sx={styles.button}
            aria-label="Dismiss dividend income"
          >
            <IconPlaceholder
              lucide="XIcon"
              tabler="IconX"
              hugeicons="Cancel01Icon"
              phosphor="XIcon"
              remixicon="RiCloseLine"
            />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <For each={HOLDINGS}>
            {(holding) => (
              <Item role="listitem" variant="muted">
                <ItemContent>
                  <ItemTitle>{holding.name}</ItemTitle>
                  <ItemDescription>{holding.shares}</ItemDescription>
                </ItemContent>
                <div
                  sx={styles.div}
                  role="img"
                  aria-label={`${holding.name} quarterly dividends`}
                >
                  <For each={holding.data}>
                    {(item) => (
                      <div
                        sx={styles.div2}
                        style={{
                          height: `${(item.value / Math.max(...holding.data.map((point) => point.value))) * 100}%`,
                        }}
                      />
                    )}
                  </For>
                </div>
              </Item>
            )}
          </For>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
