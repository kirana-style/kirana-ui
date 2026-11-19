/**
 * TanStack Charts' Solid `Chart` on Solid 2, in place of `@tanstack/charts/solid` (LF-032): that
 * adapter (1.5.0, peer `solid-js ^1.8`) is compiled for Solid 1 (`solid-js/web`, `onMount`,
 * `splitProps`), and none is published for Solid 2. This is a port of it, the same props and
 * behaviour, on the same framework-free entries (`@tanstack/charts/adapter/renderer`, `/svg` and
 * `/svg/renderer`) at the same version. Remove it, and import `@tanstack/charts/solid` again, once
 * TanStack Charts ships a Solid 2 adapter.
 *
 * Ported from TanStack Charts (`packages/solid-charts/src/Chart.tsx`), MIT License,
 * Copyright (c) 2026-present Tanner Linsley: https://github.com/TanStack/charts
 */
import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  omit,
  onSettled,
  untrack,
} from "solid-js"
import { Portal } from "@solidjs/web"
import type { JSX } from "@solidjs/web"
import type {
  ChartHostCommonOptions,
  ChartHostOptions,
  ChartRendererHostOptions,
  ChartTooltipBodyContext,
  ChartTooltipBodyTarget,
  ChartTooltipContent,
  ChartValue,
} from "@tanstack/charts"
import { createChartRendererAdapter } from "@tanstack/charts/adapter/renderer"
import { renderChartSvg } from "@tanstack/charts/svg"
import { createSvgChartRenderer } from "@tanstack/charts/svg/renderer"

export type {
  DomChartDefinition as ChartDefinition,
  ChartPoint,
} from "@tanstack/charts"

export interface ChartPresentationProps {
  class?: string
  style?: JSX.CSSProperties
}

export interface ChartTooltipBodyRenderContext<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> extends ChartTooltipBodyContext<TDatum, TXValue, TYValue> {
  defaultBody: JSX.Element
}

export interface ChartTooltipBodyRenderProps<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> {
  renderTooltipBody?: (
    context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue>
  ) => JSX.Element
}

export type ChartCommonProps<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = ChartHostCommonOptions<TDatum, TXValue, TYValue> &
  ChartPresentationProps &
  ChartTooltipBodyRenderProps<TDatum, TXValue, TYValue>

export type ChartProps<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = ChartHostOptions<TDatum, TXValue, TYValue> &
  ChartPresentationProps &
  ChartTooltipBodyRenderProps<TDatum, TXValue, TYValue>

type Target<
  TDatum,
  TXValue extends ChartValue,
  TYValue extends ChartValue,
> = ChartTooltipBodyTarget<TDatum, TXValue, TYValue>

export function Chart<
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>(props: ChartProps<TDatum, TXValue, TYValue>): JSX.Element {
  const id = `ts-chart-${createUniqueId().replaceAll(/[^a-zA-Z0-9_-]/g, "")}`
  const renderer = createMemo(() =>
    createSvgChartRenderer<TDatum, TXValue, TYValue>(
      props.renderSvg ?? renderChartSvg
    )
  )
  const [target, setTarget] = createSignal<Target<
    TDatum,
    TXValue,
    TYValue
  > | null>(null)
  // What the core's host takes: every prop but the presentation ones, which the adapter reads.
  const host = omit(
    props,
    "class",
    "style",
    "renderSvg",
    "renderTooltipBody",
    "onRender"
  )
  const options = (): ChartRendererHostOptions<TDatum, TXValue, TYValue> => {
    const onRender = props.onRender
    return {
      ...host,
      idPrefix: props.idPrefix ?? id,
      renderer: renderer(),
      onRender: onRender
        ? (context) => {
            const svg =
              context.surface.defaultElement ?? context.surface.element
            const SVGSVG =
              context.container.ownerDocument.defaultView?.SVGSVGElement
            if (!SVGSVG || !(svg instanceof SVGSVG))
              throw new TypeError("Expected the SVG chart surface.")
            onRender({
              container: context.container,
              scene: context.scene,
              surface: context.surface,
              svg,
              interaction: context.interaction,
            })
          }
        : undefined,
      onTooltipBodyChange: props.renderTooltipBody ? setTarget : undefined,
    }
  }
  const adapter = createChartRendererAdapter(untrack(options))
  const prerendered = adapter.prerender()
  let surface: HTMLDivElement | undefined
  createEffect(options, (next) => adapter.update(next))
  onSettled(() => {
    if (surface) adapter.mount(surface)
    return () => adapter.destroy()
  })
  const aspectRatio = () =>
    typeof props.aspectRatio === "number" &&
    Number.isFinite(props.aspectRatio) &&
    props.aspectRatio > 0
      ? props.aspectRatio
      : undefined
  return (
    <>
      <div
        class={props.class ? `ts-chart-host ${props.class}` : "ts-chart-host"}
        style={{
          position: "relative",
          width: props.width === undefined ? "100%" : `${props.width}px`,
          height:
            props.height === undefined
              ? aspectRatio() === undefined
                ? "320px"
                : undefined
              : `${props.height}px`,
          "aspect-ratio":
            props.height === undefined ? aspectRatio()?.toString() : undefined,
          ...props.style,
        }}
      >
        <div
          ref={(node) => (surface = node)}
          class="ts-chart-surface"
          style="width:100%;height:100%"
          innerHTML={prerendered}
        />
      </div>
      <Show when={props.renderTooltipBody} keyed>
        {(render) => (
          <Show when={target()}>
            {(current) => <TooltipBody render={render} target={current} />}
          </Show>
        )}
      </Show>
    </>
  )
}

function TooltipBody<
  TDatum,
  TXValue extends ChartValue,
  TYValue extends ChartValue,
>(props: {
  render: NonNullable<
    ChartTooltipBodyRenderProps<TDatum, TXValue, TYValue>["renderTooltipBody"]
  >
  target: () => Target<TDatum, TXValue, TYValue>
}) {
  // Live: each field reads the current target, so one body follows every focus.
  const context: ChartTooltipBodyRenderContext<TDatum, TXValue, TYValue> = {
    get primaryPoint() {
      return props.target().primaryPoint
    },
    get points() {
      return props.target().points
    },
    get content() {
      return props.target().content
    },
    defaultBody: <DefaultTooltipBody content={props.target().content} />,
    get pinned() {
      return props.target().pinned
    },
    get dismiss() {
      return props.target().dismiss
    },
  }
  // Called once, as the Solid 1 adapter does: the body reads the context's getters to update.
  const body = props.render(context)
  return <Portal mount={props.target().element}>{body}</Portal>
}

function DefaultTooltipBody(props: { content: ChartTooltipContent | string }) {
  return (
    <Show
      when={typeof props.content === "string" ? undefined : props.content}
      fallback={props.content as string}
    >
      {(content) => <TooltipContent content={content()} />}
    </Show>
  )
}

function TooltipContent(props: { content: ChartTooltipContent }) {
  return (
    <>
      <Show when={props.content.title}>
        <div
          class="ts-chart-tooltip__title"
          style={{
            display: "flex",
            "align-items": "center",
            gap: "0.4rem",
            "font-weight": "650",
            "margin-bottom": props.content.rows.length ? "0.3rem" : "0",
          }}
        >
          <Show when={props.content.color}>
            {(color) => <Swatch color={color()} />}
          </Show>
          {props.content.title}
        </div>
      </Show>
      <Show when={props.content.rows.length}>
        <div class="ts-chart-tooltip__rows" aria-hidden="true">
          <For each={props.content.rows}>
            {(row) => (
              <div
                class="ts-chart-tooltip__row"
                data-active={String(row.active === true)}
                style={{
                  display: "grid",
                  "grid-template-columns": "0.55rem minmax(0,1fr) auto",
                  "align-items": "center",
                  "column-gap": "0.4rem",
                  "font-weight": row.active
                    ? "var(--ts-chart-tooltip-active-row-font-weight, 700)"
                    : undefined,
                  background: row.active
                    ? "var(--ts-chart-tooltip-active-row-background, color-mix(in srgb, currentColor 12%, transparent))"
                    : undefined,
                  "border-radius": row.active
                    ? "var(--ts-chart-tooltip-active-row-border-radius, .2rem)"
                    : undefined,
                  "box-shadow": row.active
                    ? "var(--ts-chart-tooltip-active-row-shadow, 0 0 0 2px color-mix(in srgb, currentColor 12%, transparent))"
                    : undefined,
                }}
              >
                {row.color ? <Swatch color={row.color} /> : <span />}
                <span>{row.label}</span>
                <span style="text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap">
                  {row.value}
                </span>
              </div>
            )}
          </For>
        </div>
      </Show>
    </>
  )
}

function Swatch(props: { color: string }) {
  return (
    <span
      class="ts-chart-tooltip__swatch"
      aria-hidden="true"
      style={{
        display: "block",
        width: "0.55rem",
        height: "0.55rem",
        "border-radius": "0.15rem",
        "box-shadow": "inset 0 0 0 1px rgb(0 0 0/.12)",
        background: props.color,
      }}
    />
  )
}
