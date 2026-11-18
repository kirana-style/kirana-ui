<script setup lang="ts">
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import { css, keyframes } from "@kirana-style/core"
import type { Part } from "./types"

defineProps<{
  sources: Extract<Part, { type: "source-url" }>[]
  running: boolean
}>()

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
</script>

<template>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine :status="running ? 'running' : undefined">
        <TraceIcon>
          <IconPlaceholder
            v-if="running"
            lucide="LoaderCircleIcon"
            tabler="IconLoader2"
            hugeicons="Loading03Icon"
            phosphor="CircleNotchIcon"
            remixicon="RiLoader4Line"
            :sx="styles.sourcesRowIconPlaceholder"
          />
          <IconPlaceholder
            v-else
            lucide="GlobeIcon"
            tabler="IconGlobe"
            hugeicons="Globe02Icon"
            phosphor="GlobeIcon"
            remixicon="RiGlobeLine"
          />
        </TraceIcon>
        <TraceTitle
          >{{ running ? "Using" : "Used" }}
          {{ sources.length }} sources</TraceTitle
        >
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <a
          v-for="source in sources"
          :key="source.url"
          :href="source.url"
          target="_blank"
          rel="noreferrer"
        >
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
              {{ source.title ?? hostname(source.url) }}
              <span :sx="styles.sourcesRowSpan"> (opens in a new tab) </span>
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
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
