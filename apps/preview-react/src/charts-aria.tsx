/**
 * `/create`'s charts preview on React Aria (`/preview/react/aria/charts`), the third beside upstream's
 * `preview-02` and `preview`: the registry's charts on one canvas as those blocks lay out their
 * cards, a column per type in the charts pages' order, so a design's chart colours, radius and
 * type show on every chart at once. The interactive charts, which span the charts pages' grid, are
 * left out. Site code, not an item. Its twin on Base UI is `charts-base.tsx`.
 */
import ChartAreaDefault from "@workspace/registry/bases/react-aria/charts/chart-area-default"
import ChartAreaLinear from "@workspace/registry/bases/react-aria/charts/chart-area-linear"
import ChartAreaStep from "@workspace/registry/bases/react-aria/charts/chart-area-step"
import ChartAreaLegend from "@workspace/registry/bases/react-aria/charts/chart-area-legend"
import ChartAreaStacked from "@workspace/registry/bases/react-aria/charts/chart-area-stacked"
import ChartAreaStackedExpand from "@workspace/registry/bases/react-aria/charts/chart-area-stacked-expand"
import ChartAreaIcons from "@workspace/registry/bases/react-aria/charts/chart-area-icons"
import ChartAreaGradient from "@workspace/registry/bases/react-aria/charts/chart-area-gradient"
import ChartAreaAxes from "@workspace/registry/bases/react-aria/charts/chart-area-axes"
import ChartBarDefault from "@workspace/registry/bases/react-aria/charts/chart-bar-default"
import ChartBarHorizontal from "@workspace/registry/bases/react-aria/charts/chart-bar-horizontal"
import ChartBarMultiple from "@workspace/registry/bases/react-aria/charts/chart-bar-multiple"
import ChartBarStacked from "@workspace/registry/bases/react-aria/charts/chart-bar-stacked"
import ChartBarLabel from "@workspace/registry/bases/react-aria/charts/chart-bar-label"
import ChartBarLabelCustom from "@workspace/registry/bases/react-aria/charts/chart-bar-label-custom"
import ChartBarMixed from "@workspace/registry/bases/react-aria/charts/chart-bar-mixed"
import ChartBarActive from "@workspace/registry/bases/react-aria/charts/chart-bar-active"
import ChartBarNegative from "@workspace/registry/bases/react-aria/charts/chart-bar-negative"
import ChartLineDefault from "@workspace/registry/bases/react-aria/charts/chart-line-default"
import ChartLineLinear from "@workspace/registry/bases/react-aria/charts/chart-line-linear"
import ChartLineStep from "@workspace/registry/bases/react-aria/charts/chart-line-step"
import ChartLineMultiple from "@workspace/registry/bases/react-aria/charts/chart-line-multiple"
import ChartLineDots from "@workspace/registry/bases/react-aria/charts/chart-line-dots"
import ChartLineDotsCustom from "@workspace/registry/bases/react-aria/charts/chart-line-dots-custom"
import ChartLineDotsColors from "@workspace/registry/bases/react-aria/charts/chart-line-dots-colors"
import ChartLineLabel from "@workspace/registry/bases/react-aria/charts/chart-line-label"
import ChartLineLabelCustom from "@workspace/registry/bases/react-aria/charts/chart-line-label-custom"
import ChartPieSimple from "@workspace/registry/bases/react-aria/charts/chart-pie-simple"
import ChartPieSeparatorNone from "@workspace/registry/bases/react-aria/charts/chart-pie-separator-none"
import ChartPieLabel from "@workspace/registry/bases/react-aria/charts/chart-pie-label"
import ChartPieLabelCustom from "@workspace/registry/bases/react-aria/charts/chart-pie-label-custom"
import ChartPieLabelList from "@workspace/registry/bases/react-aria/charts/chart-pie-label-list"
import ChartPieLegend from "@workspace/registry/bases/react-aria/charts/chart-pie-legend"
import ChartPieDonut from "@workspace/registry/bases/react-aria/charts/chart-pie-donut"
import ChartPieDonutActive from "@workspace/registry/bases/react-aria/charts/chart-pie-donut-active"
import ChartPieDonutText from "@workspace/registry/bases/react-aria/charts/chart-pie-donut-text"
import ChartPieStacked from "@workspace/registry/bases/react-aria/charts/chart-pie-stacked"
import ChartPieInteractive from "@workspace/registry/bases/react-aria/charts/chart-pie-interactive"
import ChartRadarDefault from "@workspace/registry/bases/react-aria/charts/chart-radar-default"
import ChartRadarDots from "@workspace/registry/bases/react-aria/charts/chart-radar-dots"
import ChartRadarLinesOnly from "@workspace/registry/bases/react-aria/charts/chart-radar-lines-only"
import ChartRadarLabelCustom from "@workspace/registry/bases/react-aria/charts/chart-radar-label-custom"
import ChartRadarGridCustom from "@workspace/registry/bases/react-aria/charts/chart-radar-grid-custom"
import ChartRadarGridNone from "@workspace/registry/bases/react-aria/charts/chart-radar-grid-none"
import ChartRadarGridCircle from "@workspace/registry/bases/react-aria/charts/chart-radar-grid-circle"
import ChartRadarGridCircleNoLines from "@workspace/registry/bases/react-aria/charts/chart-radar-grid-circle-no-lines"
import ChartRadarGridCircleFill from "@workspace/registry/bases/react-aria/charts/chart-radar-grid-circle-fill"
import ChartRadarGridFill from "@workspace/registry/bases/react-aria/charts/chart-radar-grid-fill"
import ChartRadarMultiple from "@workspace/registry/bases/react-aria/charts/chart-radar-multiple"
import ChartRadarLegend from "@workspace/registry/bases/react-aria/charts/chart-radar-legend"
import ChartRadarIcons from "@workspace/registry/bases/react-aria/charts/chart-radar-icons"
import ChartRadarRadius from "@workspace/registry/bases/react-aria/charts/chart-radar-radius"
import ChartRadialSimple from "@workspace/registry/bases/react-aria/charts/chart-radial-simple"
import ChartRadialLabel from "@workspace/registry/bases/react-aria/charts/chart-radial-label"
import ChartRadialGrid from "@workspace/registry/bases/react-aria/charts/chart-radial-grid"
import ChartRadialText from "@workspace/registry/bases/react-aria/charts/chart-radial-text"
import ChartRadialShape from "@workspace/registry/bases/react-aria/charts/chart-radial-shape"
import ChartRadialStacked from "@workspace/registry/bases/react-aria/charts/chart-radial-stacked"
import ChartTooltipDefault from "@workspace/registry/bases/react-aria/charts/chart-tooltip-default"
import ChartTooltipIndicatorLine from "@workspace/registry/bases/react-aria/charts/chart-tooltip-indicator-line"
import ChartTooltipIndicatorNone from "@workspace/registry/bases/react-aria/charts/chart-tooltip-indicator-none"
import ChartTooltipLabelCustom from "@workspace/registry/bases/react-aria/charts/chart-tooltip-label-custom"
import ChartTooltipLabelFormatter from "@workspace/registry/bases/react-aria/charts/chart-tooltip-label-formatter"
import ChartTooltipLabelNone from "@workspace/registry/bases/react-aria/charts/chart-tooltip-label-none"
import ChartTooltipFormatter from "@workspace/registry/bases/react-aria/charts/chart-tooltip-formatter"
import ChartTooltipIcons from "@workspace/registry/bases/react-aria/charts/chart-tooltip-icons"
import ChartTooltipAdvanced from "@workspace/registry/bases/react-aria/charts/chart-tooltip-advanced"

import { ChartsCanvas, styles } from "./charts-canvas"

export default function ChartsPreview() {
  return (
    <ChartsCanvas>
      <section sx={styles.column} aria-label="Area Charts">
        <h2 sx={styles.heading}>Area Charts</h2>
        <ChartAreaDefault />
        <ChartAreaLinear />
        <ChartAreaStep />
        <ChartAreaLegend />
        <ChartAreaStacked />
        <ChartAreaStackedExpand />
        <ChartAreaIcons />
        <ChartAreaGradient />
        <ChartAreaAxes />
      </section>
      <section sx={styles.column} aria-label="Bar Charts">
        <h2 sx={styles.heading}>Bar Charts</h2>
        <ChartBarDefault />
        <ChartBarHorizontal />
        <ChartBarMultiple />
        <ChartBarStacked />
        <ChartBarLabel />
        <ChartBarLabelCustom />
        <ChartBarMixed />
        <ChartBarActive />
        <ChartBarNegative />
      </section>
      <section sx={styles.column} aria-label="Line Charts">
        <h2 sx={styles.heading}>Line Charts</h2>
        <ChartLineDefault />
        <ChartLineLinear />
        <ChartLineStep />
        <ChartLineMultiple />
        <ChartLineDots />
        <ChartLineDotsCustom />
        <ChartLineDotsColors />
        <ChartLineLabel />
        <ChartLineLabelCustom />
      </section>
      <section sx={styles.column} aria-label="Pie Charts">
        <h2 sx={styles.heading}>Pie Charts</h2>
        <ChartPieSimple />
        <ChartPieSeparatorNone />
        <ChartPieLabel />
        <ChartPieLabelCustom />
        <ChartPieLabelList />
        <ChartPieLegend />
        <ChartPieDonut />
        <ChartPieDonutActive />
        <ChartPieDonutText />
        <ChartPieStacked />
        <ChartPieInteractive />
      </section>
      <section sx={styles.column} aria-label="Radar Charts">
        <h2 sx={styles.heading}>Radar Charts</h2>
        <ChartRadarDefault />
        <ChartRadarDots />
        <ChartRadarLinesOnly />
        <ChartRadarLabelCustom />
        <ChartRadarGridCustom />
        <ChartRadarGridNone />
        <ChartRadarGridCircle />
        <ChartRadarGridCircleNoLines />
        <ChartRadarGridCircleFill />
        <ChartRadarGridFill />
        <ChartRadarMultiple />
        <ChartRadarLegend />
        <ChartRadarIcons />
        <ChartRadarRadius />
      </section>
      <section sx={styles.column} aria-label="Radial Charts">
        <h2 sx={styles.heading}>Radial Charts</h2>
        <ChartRadialSimple />
        <ChartRadialLabel />
        <ChartRadialGrid />
        <ChartRadialText />
        <ChartRadialShape />
        <ChartRadialStacked />
      </section>
      <section sx={styles.column} aria-label="Tooltips">
        <h2 sx={styles.heading}>Tooltips</h2>
        <ChartTooltipDefault />
        <ChartTooltipIndicatorLine />
        <ChartTooltipIndicatorNone />
        <ChartTooltipLabelCustom />
        <ChartTooltipLabelFormatter />
        <ChartTooltipLabelNone />
        <ChartTooltipFormatter />
        <ChartTooltipIcons />
        <ChartTooltipAdvanced />
      </section>
    </ChartsCanvas>
  )
}
