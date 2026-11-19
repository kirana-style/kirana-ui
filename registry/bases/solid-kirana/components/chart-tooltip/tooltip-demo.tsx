import { For, Show, createMemo, mergeProps, splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { duration, easing, space } from "../../../../core/scales"
import { chart } from "../../../../styles/chart.styles"
import type { Sx } from "@kirana-style/core"

export function TooltipDemo(props: {
  indicator?: "line" | "dot" | "dashed"
  label: string
  payload: { name: string; value: number; fill: string }[]
  hideLabel?: boolean
  hideIndicator?: boolean
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local] = splitProps(mergeProps({ indicator: "dot" } as const, props), [
    "indicator",
    "label",
    "payload",
    "hideLabel",
    "hideIndicator",
    "class",
    "sx",
  ])
  const styles = {
    // `transition-all ease-in-out hover:-translate-y-0.5`, over the Chart's tooltip.
    tooltip: css({
      transitionProperty: "all",
      transitionTimingFunction: easing.inOut,
      transitionDuration: duration[150],
      translate: { ":hover": `0 calc(${space["0.5"]} * -1)` },
    }),
  }

  const nestLabel = createMemo(
    () => local.payload.length === 1 && local.indicator !== "dot"
  )

  return (
    <Show when={!!local.payload.length}>
      <div
        {...styleProps(local.class, chart.tooltip, styles.tooltip, local.sx)}
      >
        <Show when={!nestLabel() && !local.hideLabel}>
          <div sx={chart.tooltipLabel}>{local.label}</div>
        </Show>
        <div sx={chart.tooltipRows}>
          <For each={local.payload}>
            {(item) => (
              <>
                <div
                  sx={[
                    chart.tooltipRow,
                    local.indicator === "dot" && chart.tooltipRowDot,
                  ]}
                >
                  <Show when={!local.hideIndicator}>
                    <>
                      <div
                        sx={[
                          chart.indicator,
                          local.indicator === "dot" && chart.indicatorDot,
                          local.indicator === "line" && chart.indicatorLine,
                          local.indicator === "dashed" && chart.indicatorDashed,
                          nestLabel() &&
                            local.indicator === "dashed" &&
                            chart.indicatorNested,
                        ]}
                        style={{
                          "--color-bg": item.fill,
                          "--color-border": item.fill,
                        }}
                      />
                    </>
                  </Show>
                  <div
                    sx={[
                      chart.tooltipBody,
                      nestLabel()
                        ? chart.tooltipBodyNested
                        : chart.tooltipBodyFlat,
                    ]}
                  >
                    <div sx={chart.tooltipNames}>
                      <Show when={nestLabel() && !local.hideLabel}>
                        <div sx={chart.tooltipLabel}>{local.label}</div>
                      </Show>
                      <span sx={chart.tooltipName}>{item.name}</span>
                    </div>
                    <span sx={chart.tooltipValue}>
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              </>
            )}
          </For>
        </div>
      </div>
    </Show>
  )
}
