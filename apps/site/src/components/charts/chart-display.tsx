/**
 * One chart on the charts pages, as upstream's `ChartDisplay`: a toolbar (the chart's type with its
 * icon, copy the code, View Code) over the chart in a frame. The frame is the chart's preview page
 * (`/preview/<framework>/<base>/<name>`, the chart alone, in the reader's design, which `setDesign`
 * messages to it; in upstream's blue while the design keeps the default chart colours, `?charts=`), 460px tall as upstream's, created once the page has hydrated so it loads once,
 * and lazily. View Code opens the chart's installed file in a sheet, as upstream's code viewer.
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import {
  ChartAreaIcon,
  ChartColumnBigIcon,
  ChartLineIcon,
  ChartRadarIcon,
  ChartRingIcon,
  Cursor02Icon,
  PieChartIcon,
} from "@hugeicons/core-free-icons"

import { useInstalledFiles } from "@/lib/installed-files"
import { CHART_TYPES } from "@workspace/registry/charts"
import type { ChartItem } from "@workspace/registry/charts"
import {
  CodeBlock,
  CopyButton,
} from "@workspace/docs-ui/markdown/code-block.tsx"
import { fontSize, lineHeight, space } from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/registry/bases/react-base/ui/sheet"
import { Icon } from "@workspace/shell/icon"

/** Each type's icon, as upstream's toolbar has lucide's. */
const ICONS = {
  area: ChartAreaIcon,
  bar: ChartColumnBigIcon,
  line: ChartLineIcon,
  pie: PieChartIcon,
  radar: ChartRadarIcon,
  radial: ChartRingIcon,
  tooltip: Cursor02Icon,
} as const

const subscribeNever = () => () => {}
const isClient = () => true
const isServer = () => false

const styles = {
  // `group relative flex flex-col overflow-hidden rounded-xl`.
  root: css({
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: radius.xl,
  }),
  // `flex justify-end px-3 py-2.5`.
  toolbar: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space[3],
    paddingBlock: space["2.5"],
  }),
  title: css({
    display: "flex",
    alignItems: "center",
    gap: space["1.5"],
    paddingInlineStart: space[1],
    fontSize: "13px",
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  titleIcon: css({ width: "0.9rem", height: "0.9rem" }),
  actions: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    marginInlineStart: "auto",
  }),
  rule: css({ width: "1px", height: space[4], backgroundColor: theme.border }),
  // `rounded-xl bg-background`, the frame's box.
  frameBox: css({
    overflow: "hidden",
    height: "460px",
    borderRadius: radius.xl,
    backgroundColor: theme.background,
  }),
  frame: css({ display: "block", width: "100%", height: "100%", border: 0 }),
  // The code sheet: wider than a menu's, its code scrolling under its header.
  sheet: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: "100%", "@media (width >= 40rem)": "40rem" },
    gap: 0,
  }),
  sheetBody: css({
    flex: "1 1 0%",
    minHeight: 0,
    overflowY: "auto",
    padding: space[4],
  }),
  message: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

function ChartCode({
  chart,
  combination,
}: {
  chart: ChartItem
  combination: string
}) {
  const { failed, files, html } = useInstalledFiles(chart.name, combination)
  const file = files?.[0]
  if (failed)
    return (
      <p sx={styles.message}>The code for {chart.name} could not be loaded.</p>
    )
  if (!file)
    return <p sx={styles.message}>Loading the code for {chart.name}…</p>
  return (
    <CodeBlock
      html={html(file.source, file.lang)}
      source={file.source}
      lang={file.lang}
      file={file.file}
    />
  )
}

/** Copies the chart's installed file, fetched when first pressed. */
function CopyChart({
  chart,
  combination,
}: {
  chart: ChartItem
  combination: string
}) {
  const { files } = useInstalledFiles(chart.name, combination)
  return files?.[0] ? <CopyButton source={files[0].source} /> : null
}

export function ChartDisplay({
  chart,
  combination,
}: {
  chart: ChartItem
  combination: string
}) {
  const hydrated = React.useSyncExternalStore(
    subscribeNever,
    isClient,
    isServer
  )
  const type = CHART_TYPES.find((entry) => entry.slug === chart.type)
  const icon = ICONS[chart.type as keyof typeof ICONS]
  return (
    <article sx={styles.root} aria-label={chart.title} id={chart.name}>
      <div sx={styles.toolbar}>
        <div sx={styles.title}>
          {icon ? <Icon icon={icon} sx={styles.titleIcon} /> : null}
          {type?.label ?? chart.name}
        </div>
        <div sx={styles.actions}>
          {hydrated ? (
            <CopyChart chart={chart} combination={combination} />
          ) : null}
          <span sx={styles.rule} />
          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="xs" />}>
              View Code
            </SheetTrigger>
            <SheetContent side="right" sx={styles.sheet}>
              <SheetHeader>
                <SheetTitle>{chart.title}</SheetTitle>
                <SheetDescription>
                  {chart.description} Install it with{" "}
                  <code>kirana-style ui add {chart.name}</code>.
                </SheetDescription>
              </SheetHeader>
              <div sx={styles.sheetBody}>
                <ChartCode chart={chart} combination={combination} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div sx={styles.frameBox}>
        {hydrated ? (
          <iframe
            key={combination}
            title={`${chart.title} preview`}
            src={`/preview/${combination}/${chart.name}?charts=blue`}
            loading="lazy"
            sx={styles.frame}
          />
        ) : null}
      </div>
    </article>
  )
}
