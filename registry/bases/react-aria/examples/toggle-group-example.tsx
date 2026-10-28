import { css, select } from "@kirana-style/core"

import * as React from "react"

import { Example, ExampleWrapper } from "../components/example"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"

const styles = {
  flexFlexColGap4: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  dataSelectedBgTransparen: css({
    // A pressed item stays clear; its icon fills instead.
    backgroundColor: { "[data-selected]": "transparent" },
    [select.child("svg")]: {
      fill: { "[data-selected]": theme.foreground },
      stroke: { "[data-selected]": theme.foreground },
    },
  }),
  pair: css({ display: "flex", alignItems: "center", gap: space[2] }),
  flex1: css({ flex: 1 }),
  w32: css({ width: { "*": null, base: space[32] } }),
  flexSize16FlexColItemsCe: css({
    display: "flex",
    width: { "*": null, base: space[16] },
    height: { "*": null, base: space[16] },
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: { "*": null, base: radius.xl },
  }),
  text2XlLeadingNoneFontLi: css({
    fontSize: fontSize["2xl"],
    lineHeight: "1",
    fontWeight: fontWeight.light,
  }),
  textXsTextMutedForegroun: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  text2XlLeadingNoneFontNo: css({
    fontSize: fontSize["2xl"],
    lineHeight: "1",
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  text2XlLeadingNoneFontMe: css({
    fontSize: fontSize["2xl"],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  text2XlLeadingNoneFontBo: css({
    fontSize: fontSize["2xl"],
    lineHeight: "1",
    fontWeight: fontWeight.bold,
  }),
  roundedMdBgMutedPx1Py05F: css({
    borderRadius: radius.md,
    backgroundColor: theme.muted,
    paddingInline: { "*": null, base: space[1] },
    paddingBlock: { "*": null, base: spacing(0.5) },
    fontFamily: fontFamily.mono,
  }),
}

export default function ToggleGroupExample() {
  return (
    <ExampleWrapper>
      <ToggleGroupBasic />
      <ToggleGroupOutline />
      <ToggleGroupOutlineWithIcons />
      <ToggleGroupSizes />
      <ToggleGroupSpacing />
      <ToggleGroupWithIcons />
      <ToggleGroupFilter />
      <ToggleGroupDateRange />
      <ToggleGroupSort />
      <ToggleGroupWithInputAndSelect />
      <ToggleGroupVertical />
      <ToggleGroupVerticalOutline />
      <ToggleGroupVerticalOutlineWithIcons />
      <ToggleGroupVerticalWithSpacing />
      <ToggleGroupFontWeightSelector />
    </ExampleWrapper>
  )
}

function ToggleGroupBasic() {
  return (
    <Example title="Basic">
      <ToggleGroup selectionMode="multiple" spacing={1}>
        <ToggleGroupItem id="bold" aria-label="Toggle bold">
          <IconPlaceholder
            lucide="BoldIcon"
            tabler="IconBold"
            hugeicons="TextBoldIcon"
            phosphor="TextBIcon"
            remixicon="RiBold"
          />
        </ToggleGroupItem>
        <ToggleGroupItem id="italic" aria-label="Toggle italic">
          <IconPlaceholder
            lucide="ItalicIcon"
            tabler="IconItalic"
            hugeicons="TextItalicIcon"
            phosphor="TextItalicIcon"
            remixicon="RiItalic"
          />
        </ToggleGroupItem>
        <ToggleGroupItem id="underline" aria-label="Toggle underline">
          <IconPlaceholder
            lucide="UnderlineIcon"
            tabler="IconUnderline"
            hugeicons="TextUnderlineIcon"
            phosphor="TextUnderlineIcon"
            remixicon="RiUnderline"
          />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupOutline() {
  return (
    <Example title="Outline">
      <ToggleGroup variant="outline" defaultSelectedKeys={["all"]}>
        <ToggleGroupItem id="all" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem id="missed" aria-label="Toggle missed">
          Missed
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupOutlineWithIcons() {
  return (
    <Example title="Outline With Icons">
      <ToggleGroup variant="outline" selectionMode="multiple" size="sm">
        <ToggleGroupItem id="bold" aria-label="Toggle bold">
          <IconPlaceholder
            lucide="BoldIcon"
            tabler="IconBold"
            hugeicons="TextBoldIcon"
            phosphor="TextBIcon"
            remixicon="RiBold"
          />
        </ToggleGroupItem>
        <ToggleGroupItem id="italic" aria-label="Toggle italic">
          <IconPlaceholder
            lucide="ItalicIcon"
            tabler="IconItalic"
            hugeicons="TextItalicIcon"
            phosphor="TextItalicIcon"
            remixicon="RiItalic"
          />
        </ToggleGroupItem>
        <ToggleGroupItem id="underline" aria-label="Toggle underline">
          <IconPlaceholder
            lucide="UnderlineIcon"
            tabler="IconUnderline"
            hugeicons="TextUnderlineIcon"
            phosphor="TextUnderlineIcon"
            remixicon="RiUnderline"
          />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupSizes() {
  return (
    <Example title="Sizes">
      <div sx={styles.flexFlexColGap4}>
        <ToggleGroup size="sm" defaultSelectedKeys={["top"]} variant="outline">
          <ToggleGroupItem id="top" aria-label="Toggle top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem id="bottom" aria-label="Toggle bottom">
            Bottom
          </ToggleGroupItem>
          <ToggleGroupItem id="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem id="right" aria-label="Toggle right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultSelectedKeys={["top"]} variant="outline">
          <ToggleGroupItem id="top" aria-label="Toggle top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem id="bottom" aria-label="Toggle bottom">
            Bottom
          </ToggleGroupItem>
          <ToggleGroupItem id="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem id="right" aria-label="Toggle right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Example>
  )
}

function ToggleGroupSpacing() {
  return (
    <Example title="With Spacing">
      <ToggleGroup size="sm" defaultSelectedKeys={["top"]} spacing={2}>
        <ToggleGroupItem id="top" aria-label="Toggle top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem id="bottom" aria-label="Toggle bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem id="left" aria-label="Toggle left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem id="right" aria-label="Toggle right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupWithIcons() {
  return (
    <Example title="With Icons">
      <ToggleGroup
        selectionMode="multiple"
        variant="outline"
        spacing={2}
        size="sm"
      >
        <ToggleGroupItem
          id="star"
          aria-label="Toggle star"
          sx={styles.dataSelectedBgTransparen}
        >
          <IconPlaceholder
            lucide="StarIcon"
            tabler="IconStar"
            hugeicons="StarIcon"
            phosphor="StarIcon"
            remixicon="RiStarLine"
          />
          Star
        </ToggleGroupItem>
        <ToggleGroupItem
          id="heart"
          aria-label="Toggle heart"
          sx={styles.dataSelectedBgTransparen}
        >
          <IconPlaceholder
            lucide="HeartIcon"
            tabler="IconHeart"
            hugeicons="FavouriteIcon"
            phosphor="HeartIcon"
            remixicon="RiHeartLine"
          />
          Heart
        </ToggleGroupItem>
        <ToggleGroupItem
          id="bookmark"
          aria-label="Toggle bookmark"
          sx={styles.dataSelectedBgTransparen}
        >
          <IconPlaceholder
            lucide="BookmarkIcon"
            tabler="IconBookmark"
            hugeicons="BookmarkIcon"
            phosphor="BookmarkIcon"
            remixicon="RiBookmarkLine"
          />
          Bookmark
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupFilter() {
  return (
    <Example title="Filter">
      <ToggleGroup defaultSelectedKeys={["all"]} variant="outline" size="sm">
        <ToggleGroupItem id="all" aria-label="All">
          All
        </ToggleGroupItem>
        <ToggleGroupItem id="active" aria-label="Active">
          Active
        </ToggleGroupItem>
        <ToggleGroupItem id="completed" aria-label="Completed">
          Completed
        </ToggleGroupItem>
        <ToggleGroupItem id="archived" aria-label="Archived">
          Archived
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupDateRange() {
  return (
    <Example title="Date Range">
      <ToggleGroup
        defaultSelectedKeys={["today"]}
        variant="outline"
        size="sm"
        spacing={2}
      >
        <ToggleGroupItem id="today" aria-label="Today">
          Today
        </ToggleGroupItem>
        <ToggleGroupItem id="week" aria-label="This Week">
          This Week
        </ToggleGroupItem>
        <ToggleGroupItem id="month" aria-label="This Month">
          This Month
        </ToggleGroupItem>
        <ToggleGroupItem id="year" aria-label="This Year">
          This Year
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupSort() {
  return (
    <Example title="Sort">
      <ToggleGroup defaultSelectedKeys={["newest"]} variant="outline" size="sm">
        <ToggleGroupItem id="newest" aria-label="Newest">
          <IconPlaceholder
            lucide="ArrowDownIcon"
            tabler="IconArrowDown"
            hugeicons="ArrowDownIcon"
            phosphor="ArrowDownIcon"
            remixicon="RiArrowDownLine"
          />
          Newest
        </ToggleGroupItem>
        <ToggleGroupItem id="oldest" aria-label="Oldest">
          <IconPlaceholder
            lucide="ArrowUpIcon"
            tabler="IconArrowUp"
            hugeicons="ArrowUpIcon"
            phosphor="ArrowUpIcon"
            remixicon="RiArrowUpLine"
          />
          Oldest
        </ToggleGroupItem>
        <ToggleGroupItem id="popular" aria-label="Popular">
          <IconPlaceholder
            lucide="TrendingUpIcon"
            tabler="IconTrendingUp"
            hugeicons="TradeUpIcon"
            phosphor="TrendUpIcon"
            remixicon="RiLineChartLine"
          />
          Popular
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupWithInputAndSelect() {
  const items = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Archived", value: "archived" },
  ]
  return (
    <Example title="With Input and Select">
      <div sx={styles.pair}>
        <Input type="search" placeholder="Search..." sx={styles.flex1} />
        <Select defaultValue={items[0].value}>
          <SelectTrigger sx={styles.w32}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} id={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ToggleGroup defaultSelectedKeys={["grid"]} variant="outline">
          <ToggleGroupItem id="grid" aria-label="Grid view">
            Grid
          </ToggleGroupItem>
          <ToggleGroupItem id="list" aria-label="List view">
            List
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Example>
  )
}

function ToggleGroupVertical() {
  return (
    <Example title="Vertical">
      <ToggleGroup selectionMode="multiple" orientation="vertical" spacing={1}>
        <ToggleGroupItem id="bold" aria-label="Toggle bold">
          <IconPlaceholder
            lucide="BoldIcon"
            tabler="IconBold"
            hugeicons="TextBoldIcon"
            phosphor="TextBIcon"
            remixicon="RiBold"
          />
        </ToggleGroupItem>
        <ToggleGroupItem id="italic" aria-label="Toggle italic">
          <IconPlaceholder
            lucide="ItalicIcon"
            tabler="IconItalic"
            hugeicons="TextItalicIcon"
            phosphor="TextItalicIcon"
            remixicon="RiItalic"
          />
        </ToggleGroupItem>
        <ToggleGroupItem id="underline" aria-label="Toggle underline">
          <IconPlaceholder
            lucide="UnderlineIcon"
            tabler="IconUnderline"
            hugeicons="TextUnderlineIcon"
            phosphor="TextUnderlineIcon"
            remixicon="RiUnderline"
          />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupVerticalOutline() {
  return (
    <Example title="Vertical Outline">
      <ToggleGroup
        variant="outline"
        defaultSelectedKeys={["all"]}
        orientation="vertical"
        size="sm"
      >
        <ToggleGroupItem id="all" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem id="active" aria-label="Toggle active">
          Active
        </ToggleGroupItem>
        <ToggleGroupItem id="completed" aria-label="Toggle completed">
          Completed
        </ToggleGroupItem>
        <ToggleGroupItem id="archived" aria-label="Toggle archived">
          Archived
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupVerticalOutlineWithIcons() {
  return (
    <Example title="Vertical Outline With Icons">
      <ToggleGroup
        variant="outline"
        selectionMode="multiple"
        orientation="vertical"
        size="sm"
      >
        <ToggleGroupItem id="bold" aria-label="Toggle bold">
          <IconPlaceholder
            lucide="BoldIcon"
            tabler="IconBold"
            hugeicons="TextBoldIcon"
            phosphor="TextBIcon"
            remixicon="RiBold"
          />
        </ToggleGroupItem>
        <ToggleGroupItem id="italic" aria-label="Toggle italic">
          <IconPlaceholder
            lucide="ItalicIcon"
            tabler="IconItalic"
            hugeicons="TextItalicIcon"
            phosphor="TextItalicIcon"
            remixicon="RiItalic"
          />
        </ToggleGroupItem>
        <ToggleGroupItem id="underline" aria-label="Toggle underline">
          <IconPlaceholder
            lucide="UnderlineIcon"
            tabler="IconUnderline"
            hugeicons="TextUnderlineIcon"
            phosphor="TextUnderlineIcon"
            remixicon="RiUnderline"
          />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupFontWeightSelector() {
  const [weight, setWeight] = React.useState("normal")
  return (
    <Example title="Font Weight Selector">
      <Field>
        <FieldLabel>Font Weight</FieldLabel>
        <ToggleGroup
          selectedKeys={[weight]}
          onSelectionChange={(value) => {
            setWeight((Array.from(value)[0] as string) ?? "normal")
          }}
          variant="outline"
          spacing={2}
          size="lg"
        >
          <ToggleGroupItem
            id="light"
            aria-label="Light"
            sx={styles.flexSize16FlexColItemsCe}
          >
            <span sx={styles.text2XlLeadingNoneFontLi}>Aa</span>
            <span sx={styles.textXsTextMutedForegroun}>Light</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            id="normal"
            aria-label="Normal"
            sx={styles.flexSize16FlexColItemsCe}
          >
            <span sx={styles.text2XlLeadingNoneFontNo}>Aa</span>
            <span sx={styles.textXsTextMutedForegroun}>Normal</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            id="medium"
            aria-label="Medium"
            sx={styles.flexSize16FlexColItemsCe}
          >
            <span sx={styles.text2XlLeadingNoneFontMe}>Aa</span>
            <span sx={styles.textXsTextMutedForegroun}>Medium</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            id="bold"
            aria-label="Bold"
            sx={styles.flexSize16FlexColItemsCe}
          >
            <span sx={styles.text2XlLeadingNoneFontBo}>Aa</span>
            <span sx={styles.textXsTextMutedForegroun}>Bold</span>
          </ToggleGroupItem>
        </ToggleGroup>
        <FieldDescription>
          Use <code sx={styles.roundedMdBgMutedPx1Py05F}>font-{weight}</code> to
          set the font weight.
        </FieldDescription>
      </Field>
    </Example>
  )
}

function ToggleGroupVerticalWithSpacing() {
  return (
    <Example title="Vertical With Spacing">
      <ToggleGroup
        size="sm"
        defaultSelectedKeys={["top"]}
        orientation="vertical"
        spacing={1}
      >
        <ToggleGroupItem id="top" aria-label="Toggle top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem id="bottom" aria-label="Toggle bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem id="left" aria-label="Toggle left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem id="right" aria-label="Toggle right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}
