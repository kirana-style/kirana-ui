<script setup lang="ts">
import { computed } from "vue"

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
import TestRow from "./TestRow.vue"
import type { Test, ToolPart } from "./types"

function countTests(tests: Test[]) {
  return {
    total: tests.length,
    failed: tests.filter((test) => test.status === "failed").length,
    skipped: tests.filter((test) => test.status === "skipped").length,
  }
}

function formatCounts({
  total,
  failed,
  skipped,
}: ReturnType<typeof countTests>) {
  return [
    `${total} tests`,
    failed > 0 && `${failed} failed`,
    skipped > 0 && `${skipped} skipped`,
  ]
    .filter(Boolean)
    .join(", ")
}

const { part, streaming } = defineProps<{
  part: ToolPart
  streaming: boolean
}>()
const command = computed(() => part.input?.command)
const running = computed(() => streaming && part.state !== "output-error")
const summary = computed(() =>
  part.state === "output-available"
    ? countTests(part.output.suites.flatMap((suite) => suite.tests))
    : undefined
)
</script>

<template>
  <TraceLine
    v-if="part.state !== 'output-available'"
    :status="running ? 'running' : 'error'"
  >
    <TraceIcon>
      <IconPlaceholder
        lucide="FlaskConicalIcon"
        tabler="IconFlask"
        hugeicons="TestTube01Icon"
        phosphor="FlaskIcon"
        remixicon="RiFlaskLine"
      />
    </TraceIcon>
    <TraceTitle>
      {{ running ? "Running" : "Failed to run" }} {{ command }}
    </TraceTitle>
  </TraceLine>
  <TraceCollapsible v-else :default-open="summary!.failed > 0">
    <TraceCollapsibleTrigger>
      <TraceLine :status="summary!.failed > 0 ? 'error' : undefined">
        <TraceIcon>
          <IconPlaceholder
            lucide="FlaskConicalIcon"
            tabler="IconFlask"
            hugeicons="TestTube01Icon"
            phosphor="FlaskIcon"
            remixicon="RiFlaskLine"
          />
        </TraceIcon>
        <TraceTitle>Ran {{ formatCounts(summary!) }}</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent keep-mounted>
      <Trace>
        <TraceCollapsible
          v-for="suite in part.output.suites"
          :key="suite.name"
          :default-open="countTests(suite.tests).failed > 0"
        >
          <TraceCollapsibleTrigger>
            <TraceLine
              :status="countTests(suite.tests).failed > 0 ? 'error' : undefined"
            >
              <TraceIcon>
                <IconPlaceholder
                  lucide="FileCodeIcon"
                  tabler="IconFileCode"
                  hugeicons="File01Icon"
                  phosphor="FileCodeIcon"
                  remixicon="RiFileCodeLine"
                />
              </TraceIcon>
              <TraceTitle>
                {{ suite.name }}, {{ formatCounts(countTests(suite.tests)) }}
              </TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent keep-mounted>
            <Trace>
              <TestRow
                v-for="test in suite.tests"
                :key="test.name"
                :test="test"
              />
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
