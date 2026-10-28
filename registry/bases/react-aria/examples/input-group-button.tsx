import { css, props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { useCopyToClipboard } from "../../../lib/use-copy-to-clipboard"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { Popover, PopoverTrigger } from "../ui/popover"
import {
  color,
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { radius, radiusBase, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  gridWFullMaxWSmGap6: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    gap: { "*": null, base: space[6] },
  }),
  radius9999Px: css({ [radiusBase.value]: "9999px" }),
  flexFlexColGap1RoundedXl: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[1] },
    borderRadius: radius.xl,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  medium: css({ fontWeight: fontWeight.medium }),
  pl15TextMutedForeground: css({
    paddingLeft: { "*": null, base: spacing(1.5) },
    color: theme.mutedForeground,
  }),
  dataFavoriteTrueFillBlue: css({
    fill: { '[data-favorite="true"]': color.blue[600] },
    stroke: { '[data-favorite="true"]': color.blue[600] },
  }),
}

export default function InputGroupButtonExample() {
  const { copyToClipboard, isCopied } = useCopyToClipboard()
  const [isFavorite, setIsFavorite] = React.useState(false)

  return (
    <div sx={page.example}>
      <div sx={styles.gridWFullMaxWSmGap6}>
        <InputGroup>
          <InputGroupInput placeholder="https://x.com/shadcn" readOnly />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Copy"
              size="icon-xs"
              onClick={() => {
                void copyToClipboard("https://x.com/shadcn")
              }}
            >
              {isCopied ? (
                <IconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                  phosphor="CheckIcon"
                  remixicon="RiCheckLine"
                />
              ) : (
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup sx={styles.radius9999Px}>
          <PopoverTrigger>
            <InputGroupAddon>
              <InputGroupButton variant="secondary" size="icon-xs">
                <IconPlaceholder
                  lucide="InfoIcon"
                  tabler="IconInfoCircle"
                  hugeicons="AlertCircleIcon"
                  phosphor="InfoIcon"
                  remixicon="RiInformationLine"
                />
              </InputGroupButton>
            </InputGroupAddon>
            <Popover
              placement="bottom start"
              sx={styles.flexFlexColGap1RoundedXl}
            >
              <p sx={styles.medium}>Your connection is not secure.</p>
              <p>
                You should not enter any sensitive information on this site.
              </p>
            </Popover>
          </PopoverTrigger>
          <InputGroupAddon sx={styles.pl15TextMutedForeground}>
            https://
          </InputGroupAddon>
          <InputGroupInput id="input-secure-19" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={() => setIsFavorite(!isFavorite)}
              size="icon-xs"
            >
              <IconPlaceholder
                lucide="StarIcon"
                tabler="IconStar"
                hugeicons="StarIcon"
                phosphor="StarIcon"
                remixicon="RiStarLine"
                data-favorite={isFavorite}
                {...styleProps(styles.dataFavoriteTrueFillBlue)}
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Type to search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="secondary">Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
