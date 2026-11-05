import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
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

@Component({
  selector: "toggle-group-example",
  imports: [
    Example,
    ExampleWrapper,
    Field,
    FieldDescription,
    FieldLabel,
    Input,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    ToggleGroup,
    ToggleGroupItem,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- ToggleGroupBasic -->
      <div kuiExample title="Basic">
        <div kuiToggleGroup multiple [spacing]="1">
          <button kuiToggleGroupItem value="bold" aria-label="Toggle bold">
            <svg
              iconPlaceholder
              lucide="BoldIcon"
              tabler="IconBold"
              hugeicons="TextBoldIcon"
              phosphor="TextBIcon"
              remixicon="RiBold"
            ></svg>
          </button>
          <button kuiToggleGroupItem value="italic" aria-label="Toggle italic">
            <svg
              iconPlaceholder
              lucide="ItalicIcon"
              tabler="IconItalic"
              hugeicons="TextItalicIcon"
              phosphor="TextItalicIcon"
              remixicon="RiItalic"
            ></svg>
          </button>
          <button
            kuiToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
          >
            <svg
              iconPlaceholder
              lucide="UnderlineIcon"
              tabler="IconUnderline"
              hugeicons="TextUnderlineIcon"
              phosphor="TextUnderlineIcon"
              remixicon="RiUnderline"
            ></svg>
          </button>
        </div>
      </div>
      <!-- ToggleGroupOutline -->
      <div kuiExample title="Outline">
        <div kuiToggleGroup variant="outline" [defaultValue]="['all']">
          <button kuiToggleGroupItem value="all" aria-label="Toggle all">
            All
          </button>
          <button kuiToggleGroupItem value="missed" aria-label="Toggle missed">
            Missed
          </button>
        </div>
      </div>
      <!-- ToggleGroupOutlineWithIcons -->
      <div kuiExample title="Outline With Icons">
        <div kuiToggleGroup variant="outline" multiple size="sm">
          <button kuiToggleGroupItem value="bold" aria-label="Toggle bold">
            <svg
              iconPlaceholder
              lucide="BoldIcon"
              tabler="IconBold"
              hugeicons="TextBoldIcon"
              phosphor="TextBIcon"
              remixicon="RiBold"
            ></svg>
          </button>
          <button kuiToggleGroupItem value="italic" aria-label="Toggle italic">
            <svg
              iconPlaceholder
              lucide="ItalicIcon"
              tabler="IconItalic"
              hugeicons="TextItalicIcon"
              phosphor="TextItalicIcon"
              remixicon="RiItalic"
            ></svg>
          </button>
          <button
            kuiToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
          >
            <svg
              iconPlaceholder
              lucide="UnderlineIcon"
              tabler="IconUnderline"
              hugeicons="TextUnderlineIcon"
              phosphor="TextUnderlineIcon"
              remixicon="RiUnderline"
            ></svg>
          </button>
        </div>
      </div>
      <!-- ToggleGroupSizes -->
      <div kuiExample title="Sizes">
        <div [sx]="styles.flexFlexColGap4">
          <div
            kuiToggleGroup
            size="sm"
            [defaultValue]="['top']"
            variant="outline"
          >
            <button kuiToggleGroupItem value="top" aria-label="Toggle top">
              Top
            </button>
            <button
              kuiToggleGroupItem
              value="bottom"
              aria-label="Toggle bottom"
            >
              Bottom
            </button>
            <button kuiToggleGroupItem value="left" aria-label="Toggle left">
              Left
            </button>
            <button kuiToggleGroupItem value="right" aria-label="Toggle right">
              Right
            </button>
          </div>
          <div kuiToggleGroup [defaultValue]="['top']" variant="outline">
            <button kuiToggleGroupItem value="top" aria-label="Toggle top">
              Top
            </button>
            <button
              kuiToggleGroupItem
              value="bottom"
              aria-label="Toggle bottom"
            >
              Bottom
            </button>
            <button kuiToggleGroupItem value="left" aria-label="Toggle left">
              Left
            </button>
            <button kuiToggleGroupItem value="right" aria-label="Toggle right">
              Right
            </button>
          </div>
        </div>
      </div>
      <!-- ToggleGroupSpacing -->
      <div kuiExample title="With Spacing">
        <div kuiToggleGroup size="sm" [defaultValue]="['top']" [spacing]="2">
          <button kuiToggleGroupItem value="top" aria-label="Toggle top">
            Top
          </button>
          <button kuiToggleGroupItem value="bottom" aria-label="Toggle bottom">
            Bottom
          </button>
          <button kuiToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </button>
          <button kuiToggleGroupItem value="right" aria-label="Toggle right">
            Right
          </button>
        </div>
      </div>
      <!-- ToggleGroupWithIcons -->
      <div kuiExample title="With Icons">
        <div kuiToggleGroup multiple variant="outline" [spacing]="2" size="sm">
          <button
            kuiToggleGroupItem
            value="star"
            aria-label="Toggle star"
            [sx]="styles.ariaPressedBgTransparent"
          >
            <svg
              iconPlaceholder
              lucide="StarIcon"
              tabler="IconStar"
              hugeicons="StarIcon"
              phosphor="StarIcon"
              remixicon="RiStarLine"
            ></svg>
            Star
          </button>
          <button
            kuiToggleGroupItem
            value="heart"
            aria-label="Toggle heart"
            [sx]="styles.ariaPressedBgTransparent"
          >
            <svg
              iconPlaceholder
              lucide="HeartIcon"
              tabler="IconHeart"
              hugeicons="FavouriteIcon"
              phosphor="HeartIcon"
              remixicon="RiHeartLine"
            ></svg>
            Heart
          </button>
          <button
            kuiToggleGroupItem
            value="bookmark"
            aria-label="Toggle bookmark"
            [sx]="styles.ariaPressedBgTransparent"
          >
            <svg
              iconPlaceholder
              lucide="BookmarkIcon"
              tabler="IconBookmark"
              hugeicons="BookmarkIcon"
              phosphor="BookmarkIcon"
              remixicon="RiBookmarkLine"
            ></svg>
            Bookmark
          </button>
        </div>
      </div>
      <!-- ToggleGroupFilter -->
      <div kuiExample title="Filter">
        <div
          kuiToggleGroup
          [defaultValue]="['all']"
          variant="outline"
          size="sm"
        >
          <button kuiToggleGroupItem value="all" aria-label="All">All</button>
          <button kuiToggleGroupItem value="active" aria-label="Active">
            Active
          </button>
          <button kuiToggleGroupItem value="completed" aria-label="Completed">
            Completed
          </button>
          <button kuiToggleGroupItem value="archived" aria-label="Archived">
            Archived
          </button>
        </div>
      </div>
      <!-- ToggleGroupDateRange -->
      <div kuiExample title="Date Range">
        <div
          kuiToggleGroup
          [defaultValue]="['today']"
          variant="outline"
          size="sm"
          [spacing]="2"
        >
          <button kuiToggleGroupItem value="today" aria-label="Today">
            Today
          </button>
          <button kuiToggleGroupItem value="week" aria-label="This Week">
            This Week
          </button>
          <button kuiToggleGroupItem value="month" aria-label="This Month">
            This Month
          </button>
          <button kuiToggleGroupItem value="year" aria-label="This Year">
            This Year
          </button>
        </div>
      </div>
      <!-- ToggleGroupSort -->
      <div kuiExample title="Sort">
        <div
          kuiToggleGroup
          [defaultValue]="['newest']"
          variant="outline"
          size="sm"
        >
          <button kuiToggleGroupItem value="newest" aria-label="Newest">
            <svg
              iconPlaceholder
              lucide="ArrowDownIcon"
              tabler="IconArrowDown"
              hugeicons="ArrowDownIcon"
              phosphor="ArrowDownIcon"
              remixicon="RiArrowDownLine"
            ></svg>
            Newest
          </button>
          <button kuiToggleGroupItem value="oldest" aria-label="Oldest">
            <svg
              iconPlaceholder
              lucide="ArrowUpIcon"
              tabler="IconArrowUp"
              hugeicons="ArrowUpIcon"
              phosphor="ArrowUpIcon"
              remixicon="RiArrowUpLine"
            ></svg>
            Oldest
          </button>
          <button kuiToggleGroupItem value="popular" aria-label="Popular">
            <svg
              iconPlaceholder
              lucide="TrendingUpIcon"
              tabler="IconTrendingUp"
              hugeicons="TradeUpIcon"
              phosphor="TrendUpIcon"
              remixicon="RiLineChartLine"
            ></svg>
            Popular
          </button>
        </div>
      </div>
      <!-- ToggleGroupWithInputAndSelect -->
      <div kuiExample title="With Input and Select">
        <div [sx]="styles.pair">
          <input
            kuiInput
            type="search"
            placeholder="Search..."
            [sx]="styles.flex1"
          />
          <ng-container
            kuiSelect
            [items]="items"
            [defaultValue]="items[0].value"
          >
            <button kuiSelectTrigger [sx]="styles.w32">
              <span kuiSelectValue></span>
            </button>
            <div kuiSelectContent>
              <div kuiSelectGroup>
                @for (item of items; track item.value) {
                  <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
                }
              </div>
            </div>
          </ng-container>
          <div kuiToggleGroup [defaultValue]="['grid']" variant="outline">
            <button kuiToggleGroupItem value="grid" aria-label="Grid view">
              Grid
            </button>
            <button kuiToggleGroupItem value="list" aria-label="List view">
              List
            </button>
          </div>
        </div>
      </div>
      <!-- ToggleGroupVertical -->
      <div kuiExample title="Vertical">
        <div kuiToggleGroup multiple orientation="vertical" [spacing]="1">
          <button kuiToggleGroupItem value="bold" aria-label="Toggle bold">
            <svg
              iconPlaceholder
              lucide="BoldIcon"
              tabler="IconBold"
              hugeicons="TextBoldIcon"
              phosphor="TextBIcon"
              remixicon="RiBold"
            ></svg>
          </button>
          <button kuiToggleGroupItem value="italic" aria-label="Toggle italic">
            <svg
              iconPlaceholder
              lucide="ItalicIcon"
              tabler="IconItalic"
              hugeicons="TextItalicIcon"
              phosphor="TextItalicIcon"
              remixicon="RiItalic"
            ></svg>
          </button>
          <button
            kuiToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
          >
            <svg
              iconPlaceholder
              lucide="UnderlineIcon"
              tabler="IconUnderline"
              hugeicons="TextUnderlineIcon"
              phosphor="TextUnderlineIcon"
              remixicon="RiUnderline"
            ></svg>
          </button>
        </div>
      </div>
      <!-- ToggleGroupVerticalOutline -->
      <div kuiExample title="Vertical Outline">
        <div
          kuiToggleGroup
          variant="outline"
          [defaultValue]="['all']"
          orientation="vertical"
          size="sm"
        >
          <button kuiToggleGroupItem value="all" aria-label="Toggle all">
            All
          </button>
          <button kuiToggleGroupItem value="active" aria-label="Toggle active">
            Active
          </button>
          <button
            kuiToggleGroupItem
            value="completed"
            aria-label="Toggle completed"
          >
            Completed
          </button>
          <button
            kuiToggleGroupItem
            value="archived"
            aria-label="Toggle archived"
          >
            Archived
          </button>
        </div>
      </div>
      <!-- ToggleGroupVerticalOutlineWithIcons -->
      <div kuiExample title="Vertical Outline With Icons">
        <div
          kuiToggleGroup
          variant="outline"
          multiple
          orientation="vertical"
          size="sm"
        >
          <button kuiToggleGroupItem value="bold" aria-label="Toggle bold">
            <svg
              iconPlaceholder
              lucide="BoldIcon"
              tabler="IconBold"
              hugeicons="TextBoldIcon"
              phosphor="TextBIcon"
              remixicon="RiBold"
            ></svg>
          </button>
          <button kuiToggleGroupItem value="italic" aria-label="Toggle italic">
            <svg
              iconPlaceholder
              lucide="ItalicIcon"
              tabler="IconItalic"
              hugeicons="TextItalicIcon"
              phosphor="TextItalicIcon"
              remixicon="RiItalic"
            ></svg>
          </button>
          <button
            kuiToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
          >
            <svg
              iconPlaceholder
              lucide="UnderlineIcon"
              tabler="IconUnderline"
              hugeicons="TextUnderlineIcon"
              phosphor="TextUnderlineIcon"
              remixicon="RiUnderline"
            ></svg>
          </button>
        </div>
      </div>
      <!-- ToggleGroupVerticalWithSpacing -->
      <div kuiExample title="Vertical With Spacing">
        <div
          kuiToggleGroup
          size="sm"
          [defaultValue]="['top']"
          orientation="vertical"
          [spacing]="1"
        >
          <button kuiToggleGroupItem value="top" aria-label="Toggle top">
            Top
          </button>
          <button kuiToggleGroupItem value="bottom" aria-label="Toggle bottom">
            Bottom
          </button>
          <button kuiToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </button>
          <button kuiToggleGroupItem value="right" aria-label="Toggle right">
            Right
          </button>
        </div>
      </div>
      <!-- ToggleGroupFontWeightSelector -->
      <div kuiExample title="Font Weight Selector">
        <div kuiField>
          <label kuiFieldLabel>Font Weight</label>
          <div
            kuiToggleGroup
            [value]="[weight()]"
            (valueChange)="weight.set($any($event)[0])"
            variant="outline"
            [spacing]="2"
            size="lg"
          >
            <button
              kuiToggleGroupItem
              value="light"
              aria-label="Light"
              [sx]="styles.flexSize16FlexColItemsCe"
            >
              <span [sx]="styles.text2XlLeadingNoneFontLi">Aa</span>
              <span [sx]="styles.textXsTextMutedForegroun">Light</span>
            </button>
            <button
              kuiToggleGroupItem
              value="normal"
              aria-label="Normal"
              [sx]="styles.flexSize16FlexColItemsCe"
            >
              <span [sx]="styles.text2XlLeadingNoneFontNo">Aa</span>
              <span [sx]="styles.textXsTextMutedForegroun">Normal</span>
            </button>
            <button
              kuiToggleGroupItem
              value="medium"
              aria-label="Medium"
              [sx]="styles.flexSize16FlexColItemsCe"
            >
              <span [sx]="styles.text2XlLeadingNoneFontMe">Aa</span>
              <span [sx]="styles.textXsTextMutedForegroun">Medium</span>
            </button>
            <button
              kuiToggleGroupItem
              value="bold"
              aria-label="Bold"
              [sx]="styles.flexSize16FlexColItemsCe"
            >
              <span [sx]="styles.text2XlLeadingNoneFontBo">Aa</span>
              <span [sx]="styles.textXsTextMutedForegroun">Bold</span>
            </button>
          </div>
          <p kuiFieldDescription>
            Use
            <code [sx]="styles.roundedMdBgMutedPx1Py05F"
              >font-{{ weight() }}</code
            >
            to set the font weight().
          </p>
        </div>
      </div>
    </div>
  `,
})
export default class ToggleGroupExample {
  protected readonly weight = signal("normal")
  protected readonly styles = styles
  protected readonly items = items
  protected readonly spacing = spacing
}
