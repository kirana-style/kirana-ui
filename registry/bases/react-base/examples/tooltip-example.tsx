import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
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
    display: { "*": null, base: "inline-block" },
    width: { "*": null, base: "fit-content" },
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
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="outline" sx={styles.tooltipBasicButton} />}
        >
          Show Tooltip
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipSides() {
  return (
    <Example title="Sides">
      <div sx={styles.tooltipSidesDiv}>
        {(
          [
            "inline-start",
            "left",
            "top",
            "bottom",
            "right",
            "inline-end",
          ] as const
        ).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger
              render={
                <Button variant="outline" sx={styles.tooltipSidesButton} />
              }
            >
              {side.replace("-", " ")}
            </TooltipTrigger>
            <TooltipContent side={side}>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Example>
  )
}

function TooltipWithIcon() {
  return (
    <Example title="With Icon">
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
          <IconPlaceholder
            lucide="InfoIcon"
            tabler="IconInfoCircle"
            hugeicons="AlertCircleIcon"
            phosphor="InfoIcon"
            remixicon="RiInformationLine"
          />
          <span sx={styles.tooltipWithIconSpan}>Info</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Additional information</p>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipLongContent() {
  return (
    <Example title="Long Content">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="outline" sx={styles.tooltipLongContentButton} />
          }
        >
          Show Tooltip
        </TooltipTrigger>
        <TooltipContent>
          To learn more about how this works, check out the docs. If you have
          any questions, please reach out to us.
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipDisabled() {
  return (
    <Example title="Disabled">
      <Tooltip>
        <TooltipTrigger render={<span sx={styles.tooltipDisabledSpan} />}>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This feature is currently unavailable</p>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipWithKeyboard() {
  return (
    <Example title="With Keyboard Shortcut">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon-sm" />}>
          <IconPlaceholder
            lucide="SaveIcon"
            tabler="IconDeviceFloppy"
            hugeicons="FloppyDiskIcon"
            phosphor="FloppyDiskIcon"
            remixicon="RiSaveLine"
          />
        </TooltipTrigger>
        <TooltipContent>
          Save Changes <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipOnLink() {
  return (
    <Example title="On Link">
      <Tooltip>
        <TooltipTrigger
          render={
            <a
              href="#"
              sx={styles.tooltipOnLinkA}
              onClick={(e) => e.preventDefault()}
            />
          }
        >
          Learn more
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to read the documentation</p>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipFormatted() {
  return (
    <Example title="Formatted Content">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="outline" sx={styles.tooltipFormattedButton} />
          }
        >
          Status
        </TooltipTrigger>
        <TooltipContent>
          <div sx={styles.tooltipFormattedDiv}>
            <p sx={styles.tooltipFormattedP}>Active</p>
            <p sx={styles.tooltipFormattedP2}>Last updated 2 hours ago</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}
