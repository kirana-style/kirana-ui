/**
 * Upstream's `chart-tooltip` (the Chart page's tooltip demo): the tooltip's parts named, a label,
 * a name and an indicator, each pointed at by a hand-drawn arrow, over four tooltips drawn as
 * `ChartTooltipContent` draws its rows, in the Chart's own tooltip styles.
 */
import type * as React from "react"
import { css } from "@kirana-style/core"

import {
  breakpoint,
  duration,
  easing,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import type { Sx } from "../../../lib/sx"
import { chart } from "../../../styles/chart.styles"
import { page } from "../../../styles/page.styles"

const styles = {
  // `grid aspect-video w-full max-w-md justify-center text-foreground md:grid-cols-2`. Upstream's
  // `md:` reads its page's width; this demo is in a frame about 650px wide, where `sm:` gives the
  // two columns upstream's page shows (and one on a phone, as upstream's).
  grid: css({
    display: "grid",
    aspectRatio: "16 / 9",
    width: "100%",
    maxWidth: "28rem",
    justifyContent: "center",
    color: theme.foreground,
    gridTemplateColumns: { [breakpoint.sm]: "repeat(2, minmax(0, 1fr))" },
  }),
  // `[&>div]:relative [&>div]:flex [&>div]:h-[137px] [&>div]:w-[224px] [&>div]:items-center
  // [&>div]:justify-center [&>div]:p-4`.
  cell: css({
    position: "relative",
    display: "flex",
    height: "137px",
    width: "224px",
    alignItems: "center",
    justifyContent: "center",
    padding: space[4],
  }),
  end: css({ alignItems: "flex-end" }),
  start: css({ alignItems: "flex-start", justifyContent: "flex-start" }),
  // `hidden! md:flex!`, at `sm:` as the grid.
  wide: css({ display: { base: "none", [breakpoint.sm]: "flex" } }),
  // `absolute z-10 text-sm font-medium`, at each name's place.
  name: css({
    position: "absolute",
    zIndex: 10,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  labelName: css({ top: "45px", left: "-35px" }),
  nameName: css({ top: "0px", left: "122px" }),
  indicatorName: css({ top: "60px", left: "50px" }),
  arrow: css({ position: "absolute", zIndex: 10 }),
  labelArrow: css({ top: "50px", left: "5px" }),
  // `-scale-x-100`.
  nameArrow: css({ top: "10px", left: "85px", transform: "scaleX(-1)" }),
  // `rotate-[-40deg]`.
  indicatorArrow: css({
    top: "38px",
    left: "30px",
    transform: "rotate(-40deg)",
  }),
  // `transition-all ease-in-out hover:-translate-y-0.5`, over the Chart's tooltip.
  tooltip: css({
    transitionProperty: "all",
    transitionTimingFunction: easing.inOut,
    transitionDuration: duration[150],
    translate: { ":hover": `0 calc(${space["0.5"]} * -1)` },
  }),
  w32: css({ width: "8rem" }),
  w36: css({ width: "9rem" }),
}

export default function ChartTooltipDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.grid}>
        <div sx={styles.cell}>
          <div sx={[styles.name, styles.labelName]}>Label</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 193 40"
            width="50"
            height="12"
            fill="none"
            sx={[styles.arrow, styles.labelArrow]}
          >
            <path
              fill="currentColor"
              d="M173.928 21.13C115.811 44.938 58.751 45.773 0 26.141c4.227-4.386 7.82-2.715 10.567-1.88 21.133 5.64 42.9 6.266 64.457 7.101 31.066 1.253 60.441-5.848 89.183-17.335 1.268-.418 2.325-1.253 4.861-2.924-14.582-2.924-29.165 2.089-41.845-3.76.212-.835.212-1.879.423-2.714 9.51-.627 19.231-1.253 28.742-2.089 9.51-.835 18.808-1.88 28.318-2.506 6.974-.418 9.933 2.924 7.397 9.19-3.17 8.145-7.608 15.664-11.623 23.391-.423.836-1.057 1.88-1.902 2.298-2.325.835-4.65 1.044-7.186 1.67-.422-2.088-1.479-4.386-1.268-6.265.423-2.506 1.902-4.595 3.804-9.19Z"
            />
          </svg>
          <TooltipDemo
            label="Page Views"
            payload={[
              { name: "Desktop", value: 186, fill: theme.chart1 },
              { name: "Mobile", value: 80, fill: theme.chart2 },
            ]}
            sx={styles.w32}
          />
        </div>
        <div sx={[styles.cell, styles.end]}>
          <div sx={[styles.name, styles.nameName]}>Name</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="42"
            fill="none"
            viewBox="0 0 122 148"
            sx={[styles.arrow, styles.nameArrow]}
          >
            <path
              fill="currentColor"
              d="M0 2.65c6.15-4.024 12.299-2.753 17.812-.847a115.56 115.56 0 0 1 21.84 10.59C70.4 32.727 88.849 61.744 96.483 97.54c1.908 9.108 2.544 18.639 3.817 29.017 8.481-4.871 12.934-14.402 21.416-19.909 1.061 4.236-1.06 6.989-2.756 9.319-6.998 9.531-14.207 19.062-21.63 28.382-3.604 4.448-6.36 4.871-10.177 1.059-8.058-7.837-12.935-17.368-14.42-28.382 0-.424.636-1.059 1.485-2.118 9.118 2.33 6.997 13.979 14.843 18.215 3.393-14.614.848-28.593-2.969-42.149-4.029-14.19-9.33-27.746-17.812-39.82-8.27-11.86-18.66-21.392-30.11-30.287C26.93 11.758 14.207 6.039 0 2.65Z"
            />
          </svg>
          <TooltipDemo
            label="Browser"
            hideLabel
            payload={[
              { name: "Chrome", value: 1286, fill: theme.chart3 },
              { name: "Firefox", value: 1000, fill: theme.chart4 },
            ]}
            indicator="dashed"
            sx={styles.w32}
          />
        </div>
        <div sx={[styles.cell, styles.wide]}>
          <TooltipDemo
            label="Page Views"
            payload={[{ name: "Desktop", value: 12486, fill: theme.chart3 }]}
            sx={styles.w36}
            indicator="line"
          />
        </div>
        <div sx={[styles.cell, styles.start]}>
          <div sx={[styles.name, styles.indicatorName]}>Indicator</div>
          <TooltipDemo
            label="Browser"
            hideLabel
            payload={[{ name: "Chrome", value: 1286, fill: theme.chart1 }]}
            indicator="dot"
            sx={styles.w32}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="34"
            fill="none"
            viewBox="0 0 75 175"
            sx={[styles.arrow, styles.indicatorArrow]}
          >
            <path
              fill="currentColor"
              d="M20.187 175c-4.439-2.109-7.186-2.531-8.032-4.008-3.17-5.484-6.763-10.968-8.454-17.084-5.073-16.242-4.439-32.694-1.057-49.146 5.707-28.053 18.388-52.942 34.24-76.565 1.692-2.531 3.171-5.063 4.862-7.805 0-.21-.211-.632-.634-1.265-4.65 1.265-9.511 2.53-14.161 3.585-2.537.422-5.496.422-8.032-.421-1.48-.422-3.593-2.742-3.593-4.219 0-1.898 1.48-4.218 2.747-5.906 1.057-1.054 2.96-1.265 4.65-1.687C35.406 7.315 48.088 3.729 60.98.776c10.99-2.53 14.584 1.055 13.95 11.812-.634 11.18-.846 22.358-1.268 33.326-.212 3.375-.846 6.96-1.268 10.757-8.878-4.007-8.878-4.007-12.048-38.177C47.03 33.259 38.153 49.289 29.91 65.741 21.667 82.193 16.17 99.49 13.212 117.84c-2.959 18.984.634 36.912 6.975 57.161Z"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

/** A tooltip as `ChartTooltipContent` draws it, from rows given here rather than a chart's points. */
function TooltipDemo({
  indicator = "dot",
  label,
  payload,
  hideLabel,
  hideIndicator,
  sx,
}: {
  label: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "line" | "dot" | "dashed"
  payload: { name: string; value: number; fill: string }[]
  sx?: Sx
}) {
  const tooltipLabel = hideLabel ? null : (
    <div sx={chart.tooltipLabel}>{label}</div>
  )
  if (!payload.length) return null
  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <div sx={[chart.tooltip, styles.tooltip, sx]}>
      {nestLabel ? null : tooltipLabel}
      <div sx={chart.tooltipRows}>
        {payload.map((item) => (
          <div
            key={item.name}
            sx={[chart.tooltipRow, indicator === "dot" && chart.tooltipRowDot]}
          >
            {hideIndicator ? null : (
              <div
                sx={[
                  chart.indicator,
                  indicator === "dot" && chart.indicatorDot,
                  indicator === "line" && chart.indicatorLine,
                  indicator === "dashed" && chart.indicatorDashed,
                  nestLabel && indicator === "dashed" && chart.indicatorNested,
                ]}
                style={
                  {
                    "--color-bg": item.fill,
                    "--color-border": item.fill,
                  } as React.CSSProperties
                }
              />
            )}
            <div
              sx={[
                chart.tooltipBody,
                nestLabel ? chart.tooltipBodyNested : chart.tooltipBodyFlat,
              ]}
            >
              <div sx={chart.tooltipNames}>
                {nestLabel ? tooltipLabel : null}
                <span sx={chart.tooltipName}>{item.name}</span>
              </div>
              <span sx={chart.tooltipValue}>{item.value.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
