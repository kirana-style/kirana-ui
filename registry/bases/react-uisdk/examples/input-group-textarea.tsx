import { css } from "@kirana-style/core"

import { axes } from "../../../core/axes"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group"
import {
  containerSize,
  fontFamily,
  fontWeight,
  space,
  spacing,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const { maia, luma, sera } = axes.style

const styles = {
  gridWFullMaxWMdGap4: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    gap: { "*": null, base: space[4] },
  }),
  minH200Px: css({ minHeight: { "*": null, base: "200px" } }),
  // `border-t`, and the addon's `[.border-t]:pt-*` that a Kirana style cannot key on a class.
  borderT: css({
    borderTopWidth: "1px",
    borderTopColor: theme.border,
    paddingBlockStart: {
      base: space[2],
      [maia]: space[3],
      [luma]: spacing(3.5),
      [sera]: spacing(3.5),
    },
  }),
  mlAuto: css({ marginLeft: "auto" }),
  // `border-b`, and the addon's `[.border-b]:pb-*` that a Kirana style cannot key on a class.
  borderB: css({
    borderBottomWidth: "1px",
    borderBottomColor: theme.border,
    paddingBlockEnd: {
      base: space[2],
      [maia]: space[3],
      [luma]: spacing(3.5),
      [sera]: spacing(3.5),
    },
  }),
  fontMonoFontMedium: css({
    fontFamily: fontFamily.mono,
    fontWeight: fontWeight.medium,
  }),
}

export default function InputGroupTextareaExample() {
  return (
    <div sx={page.example}>
      <div sx={styles.gridWFullMaxWMdGap4}>
        <InputGroup>
          <InputGroupTextarea
            id="textarea-code-32"
            placeholder="console.log('Hello, world!');"
            sx={styles.minH200Px}
          />
          <InputGroupAddon align="block-end" sx={styles.borderT}>
            <InputGroupText>Line 1, Column 1</InputGroupText>
            <InputGroupButton size="sm" sx={styles.mlAuto} variant="default">
              Run{" "}
              <IconPlaceholder
                lucide="CornerDownLeftIcon"
                tabler="IconCornerDownLeft"
                hugeicons="ArrowTurnBackwardIcon"
                phosphor="ArrowBendDownLeftIcon"
                remixicon="RiCornerDownLeftLine"
              />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupAddon align="block-start" sx={styles.borderB}>
            <InputGroupText sx={styles.fontMonoFontMedium}>
              <IconPlaceholder
                lucide="CodeIcon"
                tabler="IconBrandJavascript"
                hugeicons="CodeIcon"
                phosphor="CodeIcon"
                remixicon="RiCodeLine"
              />
              script.js
            </InputGroupText>
            <InputGroupButton sx={styles.mlAuto} size="icon-xs">
              <IconPlaceholder
                lucide="RefreshCcwIcon"
                tabler="IconRefresh"
                hugeicons="ReloadIcon"
                phosphor="ArrowClockwiseIcon"
                remixicon="RiRefreshLine"
              />
            </InputGroupButton>
            <InputGroupButton variant="ghost" size="icon-xs">
              <IconPlaceholder
                lucide="CopyIcon"
                tabler="IconCopy"
                hugeicons="Copy01Icon"
                phosphor="CopyIcon"
                remixicon="RiFileCopyLine"
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
