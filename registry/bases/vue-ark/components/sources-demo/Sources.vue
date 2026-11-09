<script setup lang="ts">
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import type { UIMessage } from "ai"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import { css } from "@kirana-style/core"

const styles = {
  sourcesSpan: css({
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

export type SourcePart = Extract<
  UIMessage["parts"][number],
  { type: "source-url" }
>

defineProps<{ sources: SourcePart[] }>()

const hostname = (url: string) => new URL(url).hostname
</script>

<template>
  <Trace>
    <TraceCollapsible default-open>
      <TraceCollapsibleTrigger>
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
          <TraceTitle> Used {{ sources.length }} sources </TraceTitle>
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
              <TraceTitle>
                {{ source.title ?? hostname(source.url) }}
                <span :sx="styles.sourcesSpan"> (opens in a new tab) </span>
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
  </Trace>
</template>
