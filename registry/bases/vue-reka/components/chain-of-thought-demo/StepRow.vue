<script setup lang="ts">
import { computed } from "vue"

import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { Badge } from "../../ui/badge"
import { CodeBlock, CodeBlockContent } from "../../ui/code-block"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"
import { css } from "@kirana-style/core"
import { fontFamily, space } from "../../../../core/scales"
import Step from "./Step.vue"
import type { Status, StepPart } from "./types"

const styles = {
  stepRowCodeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  stepRowSpan: css({
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
  stepRowCodeBlockContent2: css({
    maxHeight: { "*": null, base: space[64] },
  }),
  stepRowDiv: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space["1.5"],
  }),
  stepRowBadge: css({
    fontFamily: { "*": null, base: fontFamily.mono },
  }),
}

const { part, streaming } = defineProps<{
  part: StepPart
  streaming: boolean
}>()
const status = computed<Status>(() =>
  part.state === "output-available"
    ? undefined
    : part.state === "output-error" || !streaming
      ? "error"
      : "running"
)
const verb = (running: string, done: string, failed: string) =>
  status.value === "running"
    ? running
    : status.value === "error"
      ? failed
      : done
const content = computed(
  () => part.state === "output-error" || part.state === "output-available"
)
</script>

<template>
  <Step
    v-if="part.type === 'tool-searchWeb'"
    :status="status"
    :content="content"
    :title="`${verb('Searching', 'Searched', 'Failed to search')} the web for ${part.input?.query}`"
  >
    <CodeBlock
      v-if="part.state === 'output-error'"
      size="sm"
      variant="destructive"
    >
      <CodeBlockContent wrap :sx="styles.stepRowCodeBlockContent">{{
        part.errorText
      }}</CodeBlockContent>
    </CodeBlock>
    <Trace v-else-if="part.state === 'output-available'">
      <a
        v-for="result in part.output.results"
        :key="result.url"
        :href="result.url"
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
            {{ result.title }}
            <span :sx="styles.stepRowSpan"> (opens in a new tab)</span>
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
  </Step>
  <Step
    v-else-if="part.type === 'tool-readBuildLog'"
    :status="status"
    :content="content"
    default-open
    :title="`${verb('Reading', 'Read', 'Failed to read')} the build log for ${part.input?.deployment}`"
  >
    <CodeBlock
      v-if="part.state === 'output-error'"
      size="sm"
      variant="destructive"
    >
      <CodeBlockContent wrap :sx="styles.stepRowCodeBlockContent">{{
        part.errorText
      }}</CodeBlockContent>
    </CodeBlock>
    <CodeBlock v-else-if="part.state === 'output-available'" size="sm">
      <CodeBlockContent wrap :sx="styles.stepRowCodeBlockContent2">{{
        part.output.log
      }}</CodeBlockContent>
    </CodeBlock>
  </Step>
  <Step
    v-else
    :status="status"
    :content="content"
    :title="`${verb('Searching', 'Searched', 'Failed to search')} the code for ${part.input?.query}`"
  >
    <CodeBlock
      v-if="part.state === 'output-error'"
      size="sm"
      variant="destructive"
    >
      <CodeBlockContent wrap :sx="styles.stepRowCodeBlockContent">{{
        part.errorText
      }}</CodeBlockContent>
    </CodeBlock>
    <div v-else-if="part.state === 'output-available'" :sx="styles.stepRowDiv">
      <Badge
        v-for="file in part.output.files"
        :key="file"
        variant="secondary"
        :sx="styles.stepRowBadge"
      >
        {{ file }}
      </Badge>
    </div>
  </Step>
</template>
