"use client"

import { Badge } from "../../../ui/badge"
import { Card, CardContent, CardHeader } from "../../../ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../ui/input-group"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../../../ui/item"
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { radius, theme } from "../../../../../core/tokens"
import {
  containerSize,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  div: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[3],
  }),
  inputGroup: css({
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  div2: css({
    display: "flex",
    width: space[12],
    height: space[12],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    borderWidth: "1px",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
  }),
  itemDescription: css({
    fontSize: { "*": null, base: fontSize.xs },
    letterSpacing: { "*": null, base: letterSpacing.wider },
    textTransform: { "*": null, base: "uppercase" },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight.xs,
      [axes.style.lyra]: lineHeight.xs,
      [axes.style.mira]: lineHeight.xs,
      [axes.style.luma]: lineHeight.xs,
      [axes.style.rhea]: lineHeight.xs,
    },
  }),
  div3: css({
    display: "flex",
    flexShrink: "0",
    alignItems: "center",
    gap: space[6],
  }),
  div4: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: space["0.5"],
  }),
  span: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  span2: css({
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
}

const HOLDINGS = [
  {
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    type: "ETF",
    added: "Jan 2021",
    shares: "112",
    value: "$48,230.40",
  },
  {
    ticker: "VIG",
    name: "Vanguard Dividend Appreciation",
    type: "ETF",
    added: "Mar 2022",
    shares: "450",
    value: "$26,033.79",
  },
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    type: "Stock",
    added: "Nov 2020",
    shares: "85",
    value: "$18,488.90",
  },
  {
    ticker: "O",
    name: "Realty Income Corp",
    type: "REIT",
    added: "Jun 2023",
    shares: "320",
    value: "$15,136.59",
  },
]

export function ReleaseCatalog() {
  return (
    <Card>
      <CardHeader>
        <div sx={styles.div}>
          <InputGroup sx={styles.inputGroup}>
            <InputGroupAddon>
              <IconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="Search01Icon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
              />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search holdings or tickers..." />
          </InputGroup>
          <ToggleGroup defaultValue={["etfs"]} variant="outline" spacing={1}>
            <ToggleGroupItem value="stocks">Stocks</ToggleGroupItem>
            <ToggleGroupItem value="etfs">ETFs</ToggleGroupItem>
            <ToggleGroupItem value="reits">REITs</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {HOLDINGS.map((holding) => (
            <Item key={holding.ticker} variant="muted">
              <ItemMedia>
                <div sx={styles.div2}>{holding.ticker}</div>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{holding.name}</ItemTitle>
                <ItemDescription sx={styles.itemDescription}>
                  {holding.shares} Shares · {holding.added}
                </ItemDescription>
              </ItemContent>
              <div sx={styles.div3}>
                <Badge variant="outline">{holding.type}</Badge>
                <div sx={styles.div4}>
                  <span sx={styles.span}>Value</span>
                  <span sx={styles.span2}>{holding.value}</span>
                </div>
              </div>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
