import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, keyframes } from "@kirana-style/core"
import type { Status } from "./types"
import { IconPlaceholder } from "../../../../icons/angular"

const spin = keyframes({ to: { transform: "rotate(360deg)" } })

const styles = {
  statusIconIconPlaceholder: css({
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationName: spin,
    animationTimingFunction: "linear",
  }),
}

@Component({
  selector: "kui-status-icon",
  imports: [IconPlaceholder, SxDirective],
  host: { style: "display: contents" },
  template: `
    @if (status() === "running") {
      <svg
        iconPlaceholder
        lucide="LoaderCircleIcon"
        tabler="IconLoader2"
        hugeicons="Loading03Icon"
        phosphor="CircleNotchIcon"
        remixicon="RiLoader4Line"
        [sx]="styles.statusIconIconPlaceholder"
      ></svg>
    } @else if (status() === "error") {
      <svg
        iconPlaceholder
        lucide="CircleAlertIcon"
        tabler="IconExclamationCircle"
        hugeicons="AlertCircleIcon"
        phosphor="WarningCircleIcon"
        remixicon="RiErrorWarningLine"
      ></svg>
    } @else {
      <svg
        iconPlaceholder
        lucide="CircleCheckIcon"
        tabler="IconCircleCheckFilled"
        hugeicons="CheckmarkCircle01Icon"
        phosphor="CheckCircleIcon"
        remixicon="RiCheckboxCircleFill"
      ></svg>
    }
  `,
})
export class StatusIcon {
  readonly status = input<Status>()
  protected readonly styles = styles
}
