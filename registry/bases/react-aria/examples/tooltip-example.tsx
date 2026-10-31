import { Link } from "react-aria-components"

import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import { Tooltip, TooltipTrigger } from "../ui/tooltip"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"

const styles = {
  tooltipBasicButton: css({
    width: { "*": null, base: "fit-content" },
  }),
  tooltipSidesDiv: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  tooltipSidesButton: css({
    width: { "*": null, base: "fit-content" },
    textTransform: { "*": null, base: "capitalize" },
  }),
  tooltipWithIconSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  tooltipLongContentButton: css({
    width: { "*": null, base: "fit-content" },
  }),
  tooltipDisabledSpan: css({
    display: "inline-block",
    width: "fit-content",
  }),
  tooltipOnLinkA: css({
    width: "fit-content",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.primary,
    textUnderlineOffset: "4px",
    textDecorationLine: { ":hover": "underline" },
  }),
  tooltipFormattedButton: css({
    width: { "*": null, base: "fit-content" },
  }),
  tooltipFormattedDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  tooltipFormattedP: css({
    fontWeight: fontWeight.semibold,
  }),
  tooltipFormattedP2: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    opacity: "80%",
  }),
}

export default function TooltipExample() {
  return (
    <ExampleWrapper>
      <TooltipBasic />
      <TooltipSides />
      <TooltipWithIcon />
      <TooltipLongContent />
      <TooltipDisabled />
      <TooltipWithKeyboard />
      <TooltipOnLink />
      <TooltipFormatted />
    </ExampleWrapper>
  )
}

function TooltipBasic() {
  return (
    <Example title="Basic">
      <TooltipTrigger>
        <Button variant="outline" sx={styles.tooltipBasicButton}>
          Show Tooltip
        </Button>
        <Tooltip>
          <p>Add to library</p>
        </Tooltip>
      </TooltipTrigger>
    </Example>
  )
}

function TooltipSides() {
  return (
    <Example title="Sides">
      <div sx={styles.tooltipSidesDiv}>
        {(["start", "left", "top", "bottom", "right", "end"] as const).map(
          (placement) => (
            <TooltipTrigger key={placement}>
              <Button variant="outline" sx={styles.tooltipSidesButton}>
                {placement}
              </Button>
              <Tooltip placement={placement}>
                <p>Add to library</p>
              </Tooltip>
            </TooltipTrigger>
          )
        )}
      </div>
    </Example>
  )
}

function TooltipWithIcon() {
  return (
    <Example title="With Icon">
      <TooltipTrigger>
        <Button variant="ghost" size="icon">
          <IconPlaceholder
            lucide="InfoIcon"
            tabler="IconInfoCircle"
            hugeicons="AlertCircleIcon"
            phosphor="InfoIcon"
            remixicon="RiInformationLine"
          />
          <span sx={styles.tooltipWithIconSpan}>Info</span>
        </Button>
        <Tooltip>
          <p>Additional information</p>
        </Tooltip>
      </TooltipTrigger>
    </Example>
  )
}

function TooltipLongContent() {
  return (
    <Example title="Long Content">
      <TooltipTrigger>
        <Button variant="outline" sx={styles.tooltipLongContentButton}>
          Show Tooltip
        </Button>
        <Tooltip>
          To learn more about how this works, check out the docs. If you have
          any questions, please reach out to us.
        </Tooltip>
      </TooltipTrigger>
    </Example>
  )
}

function TooltipDisabled() {
  return (
    <Example title="Disabled">
      <TooltipTrigger>
        <span sx={styles.tooltipDisabledSpan}>
          <Button variant="outline" isDisabled>
            Disabled
          </Button>
        </span>
        <Tooltip>
          <p>This feature is currently unavailable</p>
        </Tooltip>
      </TooltipTrigger>
    </Example>
  )
}

function TooltipWithKeyboard() {
  return (
    <Example title="With Keyboard Shortcut">
      <TooltipTrigger>
        <Button variant="outline" size="icon-sm">
          <IconPlaceholder
            lucide="SaveIcon"
            tabler="IconDeviceFloppy"
            hugeicons="FloppyDiskIcon"
            phosphor="FloppyDiskIcon"
            remixicon="RiSaveLine"
          />
        </Button>
        <Tooltip>
          Save Changes <Kbd>S</Kbd>
        </Tooltip>
      </TooltipTrigger>
    </Example>
  )
}

function TooltipOnLink() {
  return (
    <Example title="On Link">
      <TooltipTrigger>
        <Link
          href="#"
          {...styleProps(styles.tooltipOnLinkA)}
          onClick={(e) => e.preventDefault()}
        >
          Learn more
        </Link>
        <Tooltip>
          <p>Click to read the documentation</p>
        </Tooltip>
      </TooltipTrigger>
    </Example>
  )
}

function TooltipFormatted() {
  return (
    <Example title="Formatted Content">
      <TooltipTrigger>
        <Button variant="outline" sx={styles.tooltipFormattedButton}>
          Status
        </Button>
        <Tooltip>
          <div sx={styles.tooltipFormattedDiv}>
            <p sx={styles.tooltipFormattedP}>Active</p>
            <p sx={styles.tooltipFormattedP2}>Last updated 2 hours ago</p>
          </div>
        </Tooltip>
      </TooltipTrigger>
    </Example>
  )
}
