import { booleanAttribute, Component, computed, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { duration, easing, space } from "../../../../core/scales"
import { chart } from "../../../../styles/chart.styles"

const styles = {
  // `transition-all ease-in-out hover:-translate-y-0.5`, over the Chart's tooltip.
  tooltip: css({
    transitionProperty: "all",
    transitionTimingFunction: easing.inOut,
    transitionDuration: duration[150],
    translate: { ":hover": `0 calc(${space["0.5"]} * -1)` },
  }),
}

@Component({
  selector: "kui-tooltip-demo",
  imports: [SxDirective],
  host: { style: "display: contents" },
  template: `
    @if (!!payload().length) {
      <div [sx]="look()">
        @if (!nestLabel() && !hideLabel()) {
          <div [sx]="chart.tooltipLabel">{{ label() }}</div>
        }
        <div [sx]="chart.tooltipRows">
          @for (item of payload(); track item.name) {
            <div
              [sx]="[
                chart.tooltipRow,
                indicator() === 'dot' && chart.tooltipRowDot,
              ]"
            >
              @if (!hideIndicator()) {
                <div
                  [sx]="[
                    chart.indicator,
                    indicator() === 'dot' && chart.indicatorDot,
                    indicator() === 'line' && chart.indicatorLine,
                    indicator() === 'dashed' && chart.indicatorDashed,
                    nestLabel() &&
                      indicator() === 'dashed' &&
                      chart.indicatorNested,
                  ]"
                  [style.--color-bg]="item.fill"
                  [style.--color-border]="item.fill"
                ></div>
              }
              <div
                [sx]="[
                  chart.tooltipBody,
                  nestLabel() ? chart.tooltipBodyNested : chart.tooltipBodyFlat,
                ]"
              >
                <div [sx]="chart.tooltipNames">
                  @if (nestLabel() && !hideLabel()) {
                    <div [sx]="chart.tooltipLabel">{{ label() }}</div>
                  }
                  <span [sx]="chart.tooltipName">{{ item.name }}</span>
                </div>
                <span [sx]="chart.tooltipValue">{{
                  item.value.toLocaleString()
                }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class TooltipDemo {
  readonly indicator = input<"line" | "dot" | "dashed">("dot")
  readonly label = input.required<string>()
  readonly payload =
    input.required<{ name: string; value: number; fill: string }[]>()
  readonly hideLabel = input(false, { transform: booleanAttribute })
  readonly hideIndicator = input(false, { transform: booleanAttribute })
  readonly sx = input<SxInput>()
  protected readonly styles = styles
  protected readonly nestLabel = computed(
    () => this.payload().length === 1 && this.indicator() !== "dot"
  )
  protected readonly chart = chart
  protected readonly look = computed(
    () => [chart.tooltip, styles.tooltip, this.sx()] as SxInput
  )
}
