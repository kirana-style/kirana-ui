import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import type { ChartConfig } from "../../ui/chart"
import { radialBands } from "../../ui/chart"

const styles = {
  labels: css({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
    // `capitalize mix-blend-luminosity`: the labels are the config's, capitalised; white keeps
    // its lightness over any bar.
    mixBlendMode: "luminosity",
  }),
}

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: theme.chart1,
  },
  safari: {
    label: "Safari",
    color: theme.chart2,
  },
  firefox: {
    label: "Firefox",
    color: theme.chart3,
  },
  edge: {
    label: "Edge",
    color: theme.chart4,
  },
  other: {
    label: "Other",
    color: theme.chart5,
  },
} satisfies ChartConfig

const BROWSERS = chartData.map((row) => row.browser)

const radius = radialBands(BROWSERS, 30, 110)

function point(distance: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180
  return `${distance * Math.cos(radians)},${-distance * Math.sin(radians)}`
}

const bands = radius.scale().range(radius.range)
/** Each instance's own ids, for its paths. */
let instances = 0
// Each band's middle, the radius its label's arc is drawn at.
const middles = chartData.map(
  (row) => bands(row.browser)! + bands.bandwidth() / 2
)

@Component({
  selector: "kui-bar-labels",
  imports: [SxDirective],
  host: { style: "display: contents" },
  template: `
    <svg aria-hidden="true" [sx]="styles.labels">
      <svg x="50%" y="50%" overflow="visible">
        @for (label of labels; track label.id) {
          <text fill="white" font-size="11" dominant-baseline="central">
            <path [attr.id]="label.id" [attr.d]="label.d" fill="none"></path>
            <textPath [attr.href]="'#' + label.id">{{ label.text }}</textPath>
          </text>
        }
      </svg>
    </svg>
  `,
})
export class BarLabels {
  protected readonly styles = styles
  readonly #id = `bar-labels-${++instances}`
  protected readonly labels = chartData.map((row, i) => ({
    id: `${this.#id}-${row.browser}`,
    d: `M${point(middles[i]!, -85)}A${middles[i]},${middles[i]},0,1,0,${point(middles[i]!, -86)}`,
    text: chartConfig[row.browser as keyof typeof chartConfig].label,
  }))
}
