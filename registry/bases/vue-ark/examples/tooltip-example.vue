<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
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
</script>

<template>
  <ExampleWrapper>
    <!-- TooltipBasic -->
    <Example title="Basic">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline" :sx="styles.tooltipBasicButton">
            Show Tooltip
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </Example>
    <!-- TooltipSides -->
    <Example title="Sides">
      <div :sx="styles.tooltipSidesDiv">
        <Tooltip
          v-for="side in [
            'inline-start',
            'left',
            'top',
            'bottom',
            'right',
            'inline-end',
          ] as const"
          :key="side"
        >
          <TooltipTrigger as-child>
            <Button variant="outline" :sx="styles.tooltipSidesButton">
              {{ side.replace("-", " ") }}
            </Button>
          </TooltipTrigger>
          <TooltipContent :side="side">
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Example>
    <!-- TooltipWithIcon -->
    <Example title="With Icon">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon">
            <IconPlaceholder
              lucide="InfoIcon"
              tabler="IconInfoCircle"
              hugeicons="AlertCircleIcon"
              phosphor="InfoIcon"
              remixicon="RiInformationLine"
            />
            <span :sx="styles.tooltipWithIconSpan">Info</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Additional information</p>
        </TooltipContent>
      </Tooltip>
    </Example>
    <!-- TooltipLongContent -->
    <Example title="Long Content">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline" :sx="styles.tooltipLongContentButton">
            Show Tooltip
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          To learn more about how this works, check out the docs. If you have
          any questions, please reach out to us.
        </TooltipContent>
      </Tooltip>
    </Example>
    <!-- TooltipDisabled -->
    <Example title="Disabled">
      <Tooltip>
        <TooltipTrigger as-child>
          <span :sx="styles.tooltipDisabledSpan">
            <Button variant="outline" disabled>Disabled</Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>This feature is currently unavailable</p>
        </TooltipContent>
      </Tooltip>
    </Example>
    <!-- TooltipWithKeyboard -->
    <Example title="With Keyboard Shortcut">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline" size="icon-sm">
            <IconPlaceholder
              lucide="SaveIcon"
              tabler="IconDeviceFloppy"
              hugeicons="FloppyDiskIcon"
              phosphor="FloppyDiskIcon"
              remixicon="RiSaveLine"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Save Changes
          <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
    </Example>
    <!-- TooltipOnLink -->
    <Example title="On Link">
      <Tooltip>
        <TooltipTrigger as-child>
          <a
            href="#"
            :sx="styles.tooltipOnLinkA"
            @click="(e) => e.preventDefault()"
          >
            Learn more
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to read the documentation</p>
        </TooltipContent>
      </Tooltip>
    </Example>
    <!-- TooltipFormatted -->
    <Example title="Formatted Content">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="outline" :sx="styles.tooltipFormattedButton">
            Status
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div :sx="styles.tooltipFormattedDiv">
            <p :sx="styles.tooltipFormattedP">Active</p>
            <p :sx="styles.tooltipFormattedP2">Last updated 2 hours ago</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </Example>
  </ExampleWrapper>
</template>
