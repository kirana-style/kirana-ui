import { For } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { theme } from "../../../core/tokens"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"

export default function TooltipExample() {
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

  return (
    <ExampleWrapper>
      <Example title="Basic">
        <Tooltip>
          <TooltipTrigger
            asChild={(props) => (
              <Button
                {...props()}
                variant="outline"
                sx={styles.tooltipBasicButton}
              >
                Show Tooltip
              </Button>
            )}
          />
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </Example>
      <Example title="Sides">
        <div sx={styles.tooltipSidesDiv}>
          <For
            each={
              [
                "inline-start",
                "left",
                "top",
                "bottom",
                "right",
                "inline-end",
              ] as const
            }
          >
            {(side) => (
              <Tooltip>
                <TooltipTrigger
                  asChild={(props) => (
                    <Button
                      {...props()}
                      variant="outline"
                      sx={styles.tooltipSidesButton}
                    >
                      {side.replace("-", " ")}
                    </Button>
                  )}
                />
                <TooltipContent side={side}>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
            )}
          </For>
        </div>
      </Example>
      <Example title="With Icon">
        <Tooltip>
          <TooltipTrigger
            asChild={(props) => (
              <Button {...props()} variant="ghost" size="icon">
                <IconPlaceholder
                  lucide="InfoIcon"
                  tabler="IconInfoCircle"
                  hugeicons="AlertCircleIcon"
                  phosphor="InfoIcon"
                  remixicon="RiInformationLine"
                />
                <span sx={styles.tooltipWithIconSpan}>Info</span>
              </Button>
            )}
          />
          <TooltipContent>
            <p>Additional information</p>
          </TooltipContent>
        </Tooltip>
      </Example>
      <Example title="Long Content">
        <Tooltip>
          <TooltipTrigger
            asChild={(props) => (
              <Button
                {...props()}
                variant="outline"
                sx={styles.tooltipLongContentButton}
              >
                Show Tooltip
              </Button>
            )}
          />
          <TooltipContent>
            To learn more about how this works, check out the docs. If you have
            any questions, please reach out to us.
          </TooltipContent>
        </Tooltip>
      </Example>
      <Example title="Disabled">
        <Tooltip>
          <TooltipTrigger
            asChild={(props) => (
              <span
                {...props()}
                {...styleProps(props().class, styles.tooltipDisabledSpan)}
              >
                <Button variant="outline" disabled>
                  Disabled
                </Button>
              </span>
            )}
          />
          <TooltipContent>
            <p>This feature is currently unavailable</p>
          </TooltipContent>
        </Tooltip>
      </Example>
      <Example title="With Keyboard Shortcut">
        <Tooltip>
          <TooltipTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" size="icon-sm">
                <IconPlaceholder
                  lucide="SaveIcon"
                  tabler="IconDeviceFloppy"
                  hugeicons="FloppyDiskIcon"
                  phosphor="FloppyDiskIcon"
                  remixicon="RiSaveLine"
                />
              </Button>
            )}
          />
          <TooltipContent>
            Save Changes <Kbd>S</Kbd>
          </TooltipContent>
        </Tooltip>
      </Example>
      <Example title="On Link">
        <Tooltip>
          <TooltipTrigger
            asChild={(props) => (
              <a
                {...props()}
                href="#"
                {...styleProps(props().class, styles.tooltipOnLinkA)}
                onClick={(e) => e.preventDefault()}
              >
                Learn more
              </a>
            )}
          />
          <TooltipContent>
            <p>Click to read the documentation</p>
          </TooltipContent>
        </Tooltip>
      </Example>
      <Example title="Formatted Content">
        <Tooltip>
          <TooltipTrigger
            asChild={(props) => (
              <Button
                {...props()}
                variant="outline"
                sx={styles.tooltipFormattedButton}
              >
                Status
              </Button>
            )}
          />
          <TooltipContent>
            <div sx={styles.tooltipFormattedDiv}>
              <p sx={styles.tooltipFormattedP}>Active</p>
              <p sx={styles.tooltipFormattedP2}>Last updated 2 hours ago</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </Example>
    </ExampleWrapper>
  )
}
