<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css, select } from "@kirana-style/core"
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
  ariaPressedBgTransparent: css({
    // A pressed item stays clear; its icon fills instead.
    backgroundColor: { '[aria-pressed="true"]': "transparent" },
    [select.child("svg")]: {
      fill: { '[aria-pressed="true"]': theme.foreground },
      stroke: { '[aria-pressed="true"]': theme.foreground },
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

const items = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
]

const weight = ref("normal")
</script>

<template>
  <ExampleWrapper>
    <!-- ToggleGroupBasic -->
    <Example title="Basic">
      <ToggleGroup multiple :spacing="1">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <IconPlaceholder
            lucide="BoldIcon"
            tabler="IconBold"
            hugeicons="TextBoldIcon"
            phosphor="TextBIcon"
            remixicon="RiBold"
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <IconPlaceholder
            lucide="ItalicIcon"
            tabler="IconItalic"
            hugeicons="TextItalicIcon"
            phosphor="TextItalicIcon"
            remixicon="RiItalic"
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
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
    <!-- ToggleGroupOutline -->
    <Example title="Outline">
      <ToggleGroup variant="outline" :default-value="['all']">
        <ToggleGroupItem value="all" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="missed" aria-label="Toggle missed">
          Missed
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
    <!-- ToggleGroupOutlineWithIcons -->
    <Example title="Outline With Icons">
      <ToggleGroup variant="outline" multiple size="sm">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <IconPlaceholder
            lucide="BoldIcon"
            tabler="IconBold"
            hugeicons="TextBoldIcon"
            phosphor="TextBIcon"
            remixicon="RiBold"
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <IconPlaceholder
            lucide="ItalicIcon"
            tabler="IconItalic"
            hugeicons="TextItalicIcon"
            phosphor="TextItalicIcon"
            remixicon="RiItalic"
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
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
    <!-- ToggleGroupSizes -->
    <Example title="Sizes">
      <div :sx="styles.flexFlexColGap4">
        <ToggleGroup size="sm" :default-value="['top']" variant="outline">
          <ToggleGroupItem value="top" aria-label="Toggle top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
            Bottom
          </ToggleGroupItem>
          <ToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Toggle right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup :default-value="['top']" variant="outline">
          <ToggleGroupItem value="top" aria-label="Toggle top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
            Bottom
          </ToggleGroupItem>
          <ToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Toggle right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Example>
    <!-- ToggleGroupSpacing -->
    <Example title="With Spacing">
      <ToggleGroup size="sm" :default-value="['top']" :spacing="2">
        <ToggleGroupItem value="top" aria-label="Toggle top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem value="left" aria-label="Toggle left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Toggle right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
    <!-- ToggleGroupWithIcons -->
    <Example title="With Icons">
      <ToggleGroup multiple variant="outline" :spacing="2" size="sm">
        <ToggleGroupItem
          value="star"
          aria-label="Toggle star"
          :sx="styles.ariaPressedBgTransparent"
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
          value="heart"
          aria-label="Toggle heart"
          :sx="styles.ariaPressedBgTransparent"
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
          value="bookmark"
          aria-label="Toggle bookmark"
          :sx="styles.ariaPressedBgTransparent"
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
    <!-- ToggleGroupFilter -->
    <Example title="Filter">
      <ToggleGroup :default-value="['all']" variant="outline" size="sm">
        <ToggleGroupItem value="all" aria-label="All"> All </ToggleGroupItem>
        <ToggleGroupItem value="active" aria-label="Active">
          Active
        </ToggleGroupItem>
        <ToggleGroupItem value="completed" aria-label="Completed">
          Completed
        </ToggleGroupItem>
        <ToggleGroupItem value="archived" aria-label="Archived">
          Archived
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
    <!-- ToggleGroupDateRange -->
    <Example title="Date Range">
      <ToggleGroup
        :default-value="['today']"
        variant="outline"
        size="sm"
        :spacing="2"
      >
        <ToggleGroupItem value="today" aria-label="Today">
          Today
        </ToggleGroupItem>
        <ToggleGroupItem value="week" aria-label="This Week">
          This Week
        </ToggleGroupItem>
        <ToggleGroupItem value="month" aria-label="This Month">
          This Month
        </ToggleGroupItem>
        <ToggleGroupItem value="year" aria-label="This Year">
          This Year
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
    <!-- ToggleGroupSort -->
    <Example title="Sort">
      <ToggleGroup :default-value="['newest']" variant="outline" size="sm">
        <ToggleGroupItem value="newest" aria-label="Newest">
          <IconPlaceholder
            lucide="ArrowDownIcon"
            tabler="IconArrowDown"
            hugeicons="ArrowDownIcon"
            phosphor="ArrowDownIcon"
            remixicon="RiArrowDownLine"
          />
          Newest
        </ToggleGroupItem>
        <ToggleGroupItem value="oldest" aria-label="Oldest">
          <IconPlaceholder
            lucide="ArrowUpIcon"
            tabler="IconArrowUp"
            hugeicons="ArrowUpIcon"
            phosphor="ArrowUpIcon"
            remixicon="RiArrowUpLine"
          />
          Oldest
        </ToggleGroupItem>
        <ToggleGroupItem value="popular" aria-label="Popular">
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
    <!-- ToggleGroupWithInputAndSelect -->
    <Example title="With Input and Select">
      <div :sx="styles.pair">
        <Input type="search" placeholder="Search..." :sx="styles.flex1" />
        <Select :items="items" :default-value="items[0].value">
          <SelectTrigger :sx="styles.w32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="item in items"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ToggleGroup :default-value="['grid']" variant="outline">
          <ToggleGroupItem value="grid" aria-label="Grid view">
            Grid
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            List
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Example>
    <!-- ToggleGroupVertical -->
    <Example title="Vertical">
      <ToggleGroup multiple orientation="vertical" :spacing="1">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <IconPlaceholder
            lucide="BoldIcon"
            tabler="IconBold"
            hugeicons="TextBoldIcon"
            phosphor="TextBIcon"
            remixicon="RiBold"
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <IconPlaceholder
            lucide="ItalicIcon"
            tabler="IconItalic"
            hugeicons="TextItalicIcon"
            phosphor="TextItalicIcon"
            remixicon="RiItalic"
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
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
    <!-- ToggleGroupVerticalOutline -->
    <Example title="Vertical Outline">
      <ToggleGroup
        variant="outline"
        :default-value="['all']"
        orientation="vertical"
        size="sm"
      >
        <ToggleGroupItem value="all" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="active" aria-label="Toggle active">
          Active
        </ToggleGroupItem>
        <ToggleGroupItem value="completed" aria-label="Toggle completed">
          Completed
        </ToggleGroupItem>
        <ToggleGroupItem value="archived" aria-label="Toggle archived">
          Archived
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
    <!-- ToggleGroupVerticalOutlineWithIcons -->
    <Example title="Vertical Outline With Icons">
      <ToggleGroup variant="outline" multiple orientation="vertical" size="sm">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <IconPlaceholder
            lucide="BoldIcon"
            tabler="IconBold"
            hugeicons="TextBoldIcon"
            phosphor="TextBIcon"
            remixicon="RiBold"
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <IconPlaceholder
            lucide="ItalicIcon"
            tabler="IconItalic"
            hugeicons="TextItalicIcon"
            phosphor="TextItalicIcon"
            remixicon="RiItalic"
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
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
    <!-- ToggleGroupVerticalWithSpacing -->
    <Example title="Vertical With Spacing">
      <ToggleGroup
        size="sm"
        :default-value="['top']"
        orientation="vertical"
        :spacing="1"
      >
        <ToggleGroupItem value="top" aria-label="Toggle top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem value="left" aria-label="Toggle left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Toggle right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
    <!-- ToggleGroupFontWeightSelector -->
    <Example title="Font Weight Selector">
      <Field>
        <FieldLabel> Font Weight </FieldLabel>
        <ToggleGroup
          :model-value="[weight]"
          @update:model-value="(next: string[]) => (weight = next[0])"
          variant="outline"
          :spacing="2"
          size="lg"
        >
          <ToggleGroupItem
            value="light"
            aria-label="Light"
            :sx="styles.flexSize16FlexColItemsCe"
          >
            <span :sx="styles.text2XlLeadingNoneFontLi"> Aa </span>
            <span :sx="styles.textXsTextMutedForegroun"> Light </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="normal"
            aria-label="Normal"
            :sx="styles.flexSize16FlexColItemsCe"
          >
            <span :sx="styles.text2XlLeadingNoneFontNo"> Aa </span>
            <span :sx="styles.textXsTextMutedForegroun"> Normal </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="medium"
            aria-label="Medium"
            :sx="styles.flexSize16FlexColItemsCe"
          >
            <span :sx="styles.text2XlLeadingNoneFontMe"> Aa </span>
            <span :sx="styles.textXsTextMutedForegroun"> Medium </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="bold"
            aria-label="Bold"
            :sx="styles.flexSize16FlexColItemsCe"
          >
            <span :sx="styles.text2XlLeadingNoneFontBo"> Aa </span>
            <span :sx="styles.textXsTextMutedForegroun"> Bold </span>
          </ToggleGroupItem>
        </ToggleGroup>
        <FieldDescription>
          Use
          <code :sx="styles.roundedMdBgMutedPx1Py05F"> font-{{ weight }} </code>
          to set the font weight.
        </FieldDescription>
      </Field>
    </Example>
  </ExampleWrapper>
</template>
