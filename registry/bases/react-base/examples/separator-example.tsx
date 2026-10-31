import { Example, ExampleWrapper } from "../components/example"
import { Separator } from "../ui/separator"
import { css } from "@kirana-style/core"
import { example } from "../../../styles/example.styles"
import { axes } from "../../../core/axes"
import { theme } from "../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../core/scales"

const styles = {
  separatorHorizontalDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
    fontSize: { base: fontSize.sm, [axes.style.lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [axes.style.lyra]: leading.relaxed },
  }),
  separatorHorizontalDiv2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  separatorHorizontalDiv3: css({
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  separatorHorizontalDiv4: css({
    color: theme.mutedForeground,
  }),
  separatorVerticalDiv: css({
    display: "flex",
    height: space[5],
    alignItems: "center",
    gap: space[4],
    fontSize: { base: fontSize.sm, [axes.style.lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [axes.style.lyra]: leading.relaxed },
  }),
  separatorVerticalMenuDiv: css({
    display: "flex",
    alignItems: "center",
    gap: { base: space[2], [breakpoint.md]: space[4] },
    fontSize: { base: fontSize.sm, [axes.style.lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [axes.style.lyra]: leading.relaxed },
  }),
  separatorVerticalMenuDiv2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  separatorVerticalMenuSpan: css({
    fontWeight: fontWeight.medium,
  }),
  separatorVerticalMenuSpan2: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  separatorVerticalMenuDiv3: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  separatorVerticalMenuSpan3: css({
    fontWeight: fontWeight.medium,
  }),
  separatorVerticalMenuSpan4: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  separatorVerticalMenuDiv4: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  separatorVerticalMenuSpan5: css({
    fontWeight: fontWeight.medium,
  }),
  separatorVerticalMenuSpan6: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  separatorInListDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
    fontSize: { base: fontSize.sm, [axes.style.lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [axes.style.lyra]: leading.relaxed },
  }),
  separatorInListDl: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  separatorInListDd: css({
    color: theme.mutedForeground,
  }),
  separatorInListDl2: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  separatorInListDd2: css({
    color: theme.mutedForeground,
  }),
  separatorInListDl3: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  separatorInListDd3: css({
    color: theme.mutedForeground,
  }),
}

export default function SeparatorExample() {
  return (
    <ExampleWrapper>
      <SeparatorHorizontal />
      <SeparatorVertical />
      <SeparatorVerticalMenu />
      <SeparatorInList />
    </ExampleWrapper>
  )
}

function SeparatorHorizontal() {
  return (
    <Example title="Horizontal">
      <div sx={styles.separatorHorizontalDiv}>
        <div sx={styles.separatorHorizontalDiv2}>
          <div sx={styles.separatorHorizontalDiv3}>shadcn/ui</div>
          <div sx={styles.separatorHorizontalDiv4}>
            The Foundation for your Design System
          </div>
        </div>
        <Separator />
        <div>
          A set of beautifully designed components that you can customize,
          extend, and build on.
        </div>
      </div>
    </Example>
  )
}

function SeparatorVertical() {
  return (
    <Example title="Vertical">
      <div sx={styles.separatorVerticalDiv}>
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </Example>
  )
}

function SeparatorVerticalMenu() {
  return (
    <Example title="Vertical Menu">
      <div sx={styles.separatorVerticalMenuDiv}>
        <div sx={styles.separatorVerticalMenuDiv2}>
          <span sx={styles.separatorVerticalMenuSpan}>Settings</span>
          <span sx={styles.separatorVerticalMenuSpan2}>Manage preferences</span>
        </div>
        <Separator orientation="vertical" />
        <div sx={styles.separatorVerticalMenuDiv3}>
          <span sx={styles.separatorVerticalMenuSpan3}>Account</span>
          <span sx={styles.separatorVerticalMenuSpan4}>Profile & security</span>
        </div>
        <Separator orientation="vertical" />
        <div sx={styles.separatorVerticalMenuDiv4}>
          <span sx={styles.separatorVerticalMenuSpan5}>Help</span>
          <span sx={styles.separatorVerticalMenuSpan6}>Support & docs</span>
        </div>
      </div>
    </Example>
  )
}

function SeparatorInList() {
  return (
    <Example title="In List">
      <div sx={[styles.separatorInListDiv, example.row]}>
        <dl sx={styles.separatorInListDl}>
          <dt>Item 1</dt>
          <dd sx={styles.separatorInListDd}>Value 1</dd>
        </dl>
        <Separator />
        <dl sx={styles.separatorInListDl2}>
          <dt>Item 2</dt>
          <dd sx={styles.separatorInListDd2}>Value 2</dd>
        </dl>
        <Separator />
        <dl sx={styles.separatorInListDl3}>
          <dt>Item 3</dt>
          <dd sx={styles.separatorInListDd3}>Value 3</dd>
        </dl>
      </div>
    </Example>
  )
}
