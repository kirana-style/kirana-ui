import { For, splitProps } from "solid-js"
import { css, keyframes, props as styleProps } from "@kirana-style/core"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import type { Sx } from "@kirana-style/core"
import type { Part } from "./types"

export function SourcesRow(props: {
  sources: Extract<Part, { type: "source-url" }>[]
  running: boolean
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["sources", "running", "class", "sx"])
  // Tailwind's `spin`.
  const spin = keyframes({ to: { transform: "rotate(360deg)" } })

  const hostname = (url: string) => new URL(url).hostname

  const styles = {
    sourcesRowIconPlaceholder: css({
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationName: spin,
      animationTimingFunction: "linear",
    }),
    sourcesRowSpan: css({
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
  }

  return (
    <TraceCollapsible {...rest} class={local.class} sx={[local.sx]}>
      <TraceCollapsibleTrigger>
        <TraceLine status={local.running ? "running" : undefined}>
          <TraceIcon>
            {local.running ? (
              <IconPlaceholder
                lucide="LoaderCircleIcon"
                tabler="IconLoader2"
                hugeicons="Loading03Icon"
                phosphor="CircleNotchIcon"
                remixicon="RiLoader4Line"
                {...styleProps(styles.sourcesRowIconPlaceholder)}
              />
            ) : (
              <IconPlaceholder
                lucide="GlobeIcon"
                tabler="IconGlobe"
                hugeicons="Globe02Icon"
                phosphor="GlobeIcon"
                remixicon="RiGlobeLine"
              />
            )}
          </TraceIcon>
          <TraceTitle>
            {local.running ? "Using" : "Used"} {local.sources.length} sources
          </TraceTitle>
        </TraceLine>
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Trace>
          <For each={local.sources}>
            {(source) => (
              <a href={source.url} target="_blank" rel="noreferrer">
                <TraceLine>
                  <TraceIcon>
                    <IconPlaceholder
                      lucide="GlobeIcon"
                      tabler="IconGlobe"
                      hugeicons="Globe02Icon"
                      phosphor="GlobeIcon"
                      remixicon="RiGlobeLine"
                    />
                  </TraceIcon>
                  <TraceTitle>
                    {source.title ?? hostname(source.url)}{" "}
                    <span sx={styles.sourcesRowSpan}>(opens in a new tab)</span>
                  </TraceTitle>
                  <TraceIcon>
                    <IconPlaceholder
                      lucide="ArrowUpRightIcon"
                      tabler="IconArrowUpRight"
                      hugeicons="ArrowUpRightIcon"
                      phosphor="ArrowUpRightIcon"
                      remixicon="RiArrowRightUpLine"
                    />
                  </TraceIcon>
                </TraceLine>
              </a>
            )}
          </For>
        </Trace>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}
