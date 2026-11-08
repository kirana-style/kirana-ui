/**
 * Chart on TanStack Charts' Angular `Chart` (`tanstack-chart`), as React's on its `RendererChart`:
 * the chart, its series colours and its tooltip in a `16 / 9` box (upstream's `aspect-video`).
 * Size it as TanStack Charts does: `initialWidth` with `aspectRatio` (by default the box's) or
 * `height`. The tooltip body is the caller's `<ng-template kuiChartTooltip>` (a
 * `ChartTooltipContent`), the legend a projected `ChartLegendContent`. Angular's `Chart` draws with
 * its own SVG renderer, so the marks appear without React's entrance, as Vue's (LF-007).
 */
import { NgTemplateOutlet } from "@angular/common"
import {
  Component,
  Directive,
  ElementRef,
  InjectionToken,
  TemplateRef,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
} from "@angular/core"
import type { WritableSignal } from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import type { StyleHandle } from "@kirana-style/core"
import type {
  ChartPoint,
  ChartValue,
  DomChartDefinition,
} from "@tanstack/charts"
import {
  Chart as TanStackChart,
  ChartTooltipBodyDirective,
} from "@tanstack/charts/angular"

import { IconPlaceholder } from "../../../icons/angular"
import {
  categoryOf,
  pointConfig,
  seriesColors,
  pointValue,
} from "../../../lib/chart"
import { chart as styles } from "../../../styles/chart.styles"

export * from "../../../lib/chart"

type Theme = "light" | "dark"

/** An icon by its names in each library, as `iconPlaceholder` takes them. */
export type ChartIcon = {
  lucide: string
  tabler: string
  hugeicons: string
  phosphor: string
  remixicon: string
}

export type ChartConfig = Record<
  string,
  {
    label?: string
    icon?: ChartIcon
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<Theme, string> }
  )
>

/** The chart's config and the focused points, which its tooltip and legend read. */
type ChartContext = {
  config: () => ChartConfig
  points: WritableSignal<readonly ChartPoint[]>
}
const CHART = new InjectionToken<ChartContext>("kui chart")

/** The caller's tooltip body: `<ng-template kuiChartTooltip><div kuiChartTooltipContent>…`. */
@Directive({ selector: "ng-template[kuiChartTooltip]" })
class ChartTooltip {}

/** Hands the container the points TanStack Charts focuses, as React's `PointsContext`. */
@Directive({ selector: "[kuiChartPoints]" })
class ChartPoints {
  readonly points = input.required<readonly ChartPoint[]>({
    alias: "kuiChartPoints",
  })

  constructor() {
    const chart = inject(CHART)
    effect(() => chart.points.set(this.points()))
  }
}

/** A row's markup in place of its indicator, name and value: `<ng-template kuiChartTooltipRow let-value="value" let-name="name">`. */
@Directive({ selector: "ng-template[kuiChartTooltipRow]" })
class ChartTooltipRow {}

/** The legend: `<div kuiChartLegendContent>` inside the container, under the chart. */
@Component({
  selector: "[kuiChartLegendContent]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    "[class]": "part().class",
    "[style]": "part().style",
    "[style.display]": "entries().length ? null : 'none'",
  },
  template: `
    @for (key of entries(); track key) {
      <div [sx]="styles.legendItem">
        @if (config()[key]!.icon && !hideIcon()) {
          <svg
            iconPlaceholder
            [lucide]="config()[key]!.icon!.lucide"
            [tabler]="config()[key]!.icon!.tabler"
            [hugeicons]="config()[key]!.icon!.hugeicons"
            [phosphor]="config()[key]!.icon!.phosphor"
            [remixicon]="config()[key]!.icon!.remixicon"
          ></svg>
        } @else {
          <div
            [sx]="styles.legendSwatch"
            [style.--color-bg]="'var(--color-' + key + ')'"
          ></div>
        }
        {{ config()[key]!.label }}
      </div>
    }
  `,
})
class ChartLegendContent {
  readonly hideIcon = input(false, { transform: booleanAttribute })
  readonly verticalAlign = input<"top" | "bottom">("bottom")
  /** The series to list, in order; by default every config entry with a colour. */
  readonly keys = input<readonly string[]>()
  readonly sx = input<SxInput>()
  protected readonly styles = styles
  readonly #chart = inject(CHART)
  protected readonly config = computed(() => this.#chart.config())
  protected readonly entries = computed(() =>
    (this.keys() ?? Object.keys(this.config())).filter(
      (key) => this.config()[key]?.color || this.config()[key]?.theme
    )
  )
  protected readonly part = computed(() =>
    partSx(
      [
        styles.legend,
        this.verticalAlign() === "top" ? styles.legendTop : styles.legendBottom,
      ],
      this.sx()
    )
  )
}

/** The tooltip's body: the focused category and a row per series. */
@Component({
  selector: "[kuiChartTooltipContent]",
  imports: [IconPlaceholder, NgTemplateOutlet, SxDirective],
  providers: [provideSxPart()],
  host: {
    "[class]": "part().class",
    "[style]": "part().style",
    "[style.display]": "rows().length ? null : 'none'",
  },
  template: `
    @if (!nestLabel() && headingText() !== undefined) {
      <div [sx]="labelLook()">{{ headingText() }}</div>
    }
    <div [sx]="styles.tooltipRows">
      @for (row of rows(); track row.key) {
        <div
          [sx]="
            indicator() === 'dot'
              ? [styles.tooltipRow, styles.tooltipRowDot]
              : styles.tooltipRow
          "
        >
          @if (rowTemplate(); as template) {
            <ng-container
              [ngTemplateOutlet]="template"
              [ngTemplateOutletContext]="{
                value: row.raw,
                name: row.name,
                point: row.point,
                index: row.index,
                datum: row.point.datum,
              }"
            />
          } @else if (formatter(); as format) {
            {{
              format(row.raw, row.name, row.point, row.index, row.point.datum)
            }}
          } @else {
            @if (row.item?.icon; as icon) {
              <svg
                iconPlaceholder
                [lucide]="icon.lucide"
                [tabler]="icon.tabler"
                [hugeicons]="icon.hugeicons"
                [phosphor]="icon.phosphor"
                [remixicon]="icon.remixicon"
              ></svg>
            } @else if (!hideIndicator()) {
              <div
                [sx]="indicatorLook()"
                [style.--color-bg]="row.indicatorColor"
                [style.--color-border]="row.indicatorColor"
              ></div>
            }
            <div
              [sx]="
                nestLabel()
                  ? [styles.tooltipBody, styles.tooltipBodyNested]
                  : [styles.tooltipBody, styles.tooltipBodyFlat]
              "
            >
              <div [sx]="styles.tooltipNames">
                @if (nestLabel() && headingText() !== undefined) {
                  <div [sx]="labelLook()">{{ headingText() }}</div>
                }
                <span [sx]="styles.tooltipName">{{
                  row.item?.label ?? row.name
                }}</span>
              </div>
              <span [sx]="styles.tooltipValue">{{ row.value }}</span>
            </div>
          }
        </div>
      }
    </div>
  `,
})
class ChartTooltipContent {
  readonly hideLabel = input(false, { transform: booleanAttribute })
  readonly hideIndicator = input(false, { transform: booleanAttribute })
  readonly indicator = input<"line" | "dot" | "dashed">("dot")
  /** The heading; by default the focused category, or its config label. */
  readonly label = input<string>()
  readonly labelFormatter =
    input<(label: string, points: readonly ChartPoint[]) => string>()
  /** A row's text, in place of its indicator, name and value. */
  readonly formatter =
    input<
      (
        value: ChartValue,
        name: string,
        point: ChartPoint,
        index: number,
        datum: unknown
      ) => string
    >()
  /** One indicator colour for every row, instead of each series' own. */
  readonly color = input<string>()
  readonly nameKey = input<string>()
  readonly labelKey = input<string>()
  readonly labelSx = input<StyleHandle>()
  readonly sx = input<SxInput>()
  protected readonly styles = styles
  protected readonly rowTemplate = contentChild(ChartTooltipRow, {
    read: TemplateRef,
  })
  readonly #chart = inject(CHART)

  readonly #points = computed(() => this.#chart.points())
  protected readonly labelLook = computed(
    () => [styles.tooltipLabel, this.labelSx()] as SxInput
  )
  protected readonly heading = computed(() => {
    const first = this.#points()[0]
    if (this.hideLabel() || !first) return undefined
    const config = this.#chart.config()
    const labelKey = this.labelKey()
    return (
      this.label() ??
      (labelKey
        ? config[labelKey]?.label
        : (config[String(categoryOf(first))]?.label ??
          String(categoryOf(first))))
    )
  })
  // One series with a line or dashed marker: its label beside the value, not above the tooltip.
  protected readonly nestLabel = computed(
    () => this.#points().length === 1 && this.indicator() !== "dot"
  )
  protected readonly headingText = computed(() => {
    const heading = this.heading()
    const format = this.labelFormatter()
    return heading === undefined
      ? undefined
      : format
        ? format(heading, this.#points())
        : heading
  })
  protected readonly indicatorLook = computed(
    () =>
      [
        styles.indicator,
        this.indicator() === "dot" && styles.indicatorDot,
        this.indicator() === "line" && styles.indicatorLine,
        this.indicator() === "dashed" && styles.indicatorDashed,
        this.nestLabel() &&
          this.indicator() === "dashed" &&
          styles.indicatorNested,
      ] as SxInput
  )
  protected readonly rows = computed(() =>
    this.#points().map((point, index) => {
      const { name, item } = pointConfig(
        this.#chart.config(),
        point,
        this.nameKey()
      )
      const datum = point.datum as { fill?: unknown } | null
      const indicatorColor =
        this.color() ??
        (typeof datum?.fill === "string"
          ? datum.fill
          : item?.color || item?.theme
            ? `var(--color-${name})`
            : point.color)
      const value = pointValue(point)
      return {
        key: point.key,
        point,
        index,
        name,
        item,
        indicatorColor,
        value:
          typeof value === "number" ? value.toLocaleString() : String(value),
        raw: value,
      }
    })
  )
  protected readonly part = computed(() => partSx(styles.tooltip, this.sx()))
}

/**
 * The chart: `<div kuiChartContainer [config]="…" [definition]="…" [initialWidth]="480">`, with an
 * `<ng-template kuiChartTooltip>` for its tooltip and a `<div kuiChartLegendContent>` for its legend.
 */
@Component({
  selector: "[kuiChartContainer]",
  imports: [
    ChartPoints,
    ChartTooltipBodyDirective,
    NgTemplateOutlet,
    SxDirective,
    TanStackChart,
  ],
  providers: [
    provideSxPart(),
    {
      provide: CHART,
      useFactory: (): ChartContext => {
        const container = inject(ChartContainer)
        return { config: container.config, points: signal([]) }
      },
    },
  ],
  host: {
    "data-slot": "chart",
    "[attr.data-entering]": "width() === undefined ? '' : null",
    "[class]": "part().class",
    "[style]": "style()",
  },
  template: `
    <!-- The adapter's element draws no box: its own surface is the flex item React's is, which
         fills the box's width and, with a legend, takes the height the legend leaves. -->
    <ng-template #plot>
      <tanstack-chart [options]="options()" style="display: contents">
        @if (tooltip(); as body) {
          <ng-template [tanstackChartTooltipBody]="definition()" let-context>
            <ng-container [kuiChartPoints]="context.points" />
            <ng-container [ngTemplateOutlet]="body" />
          </ng-template>
        }
      </tanstack-chart>
    </ng-template>
    @if (legend()) {
      <div [sx]="styles.withLegend">
        <ng-container [ngTemplateOutlet]="plot" />
        <ng-content select="[kuiChartLegendContent]" />
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="plot" />
    }
  `,
})
class ChartContainer {
  readonly config = input.required<ChartConfig>()
  // `any`: a caller's definition is of its own data, which `unknown` would refuse.
  // oxlint-disable-next-line no-explicit-any
  readonly definition = input.required<DomChartDefinition<any, any, any>>()
  readonly aspectRatio = input(16 / 9)
  readonly height = input<number>()
  readonly initialWidth = input<number>()
  readonly ariaLabel = input.required<string>()
  readonly sx = input<SxInput>()
  protected readonly styles = styles
  protected readonly tooltip = contentChild(ChartTooltip, { read: TemplateRef })
  protected readonly legend = contentChild(ChartLegendContent)
  /** The box's width, once mounted and once the page's fonts have come; the marks wait meanwhile. */
  protected readonly width = signal<number | undefined>(undefined)
  protected readonly part = computed(() => partSx(styles.container, this.sx()))
  protected readonly style = computed(() => ({
    ...this.part().style,
    ...seriesColors(this.config()),
  }))
  // With a legend and no height, the chart fills what the legend leaves of the box.
  readonly #fill = computed(
    () => !!this.legend() && this.height() === undefined
  )
  protected readonly options = computed(() => {
    const plot = partSx(
      [styles.plot, this.#fill() && styles.plotWithLegend],
      undefined
    )
    const style = Object.entries({
      ...plot.style,
      ...(this.#fill() ? { height: "auto" } : {}),
    })
      .map(([name, value]) => `${name}:${value}`)
      .join(";")
    return {
      definition: this.definition(),
      ariaLabel: this.ariaLabel(),
      height: this.height(),
      initialWidth: this.width() ?? this.initialWidth(),
      aspectRatio:
        this.height() === undefined && !this.#fill()
          ? this.aspectRatio()
          : undefined,
      class: plot.class,
      style,
    }
  })

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    afterNextRender(() => {
      void document.fonts.ready.then(() =>
        this.width.set(element.getBoundingClientRect().width || undefined)
      )
    })
  }
}

export {
  ChartContainer,
  ChartLegendContent,
  ChartPoints,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipRow,
}
