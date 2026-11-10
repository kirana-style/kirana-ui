<script setup lang="ts">
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { computed } from "vue"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"

export type Plan = {
  title: string
  steps: { title: string; status: "done" | "running" | "pending" }[]
}

const { plan, streaming } = defineProps<{ plan: Plan; streaming: boolean }>()
const done = computed(
  () => plan.steps.filter((step) => step.status === "done").length
)
const running = computed(() => streaming && done.value < plan.steps.length)
</script>

<template>
  <TraceCollapsible default-open>
    <TraceCollapsibleTrigger>
      <TraceLine :status="running ? 'running' : undefined">
        <TraceIcon>
          <IconPlaceholder
            lucide="RouteIcon"
            tabler="IconRoute"
            hugeicons="Route01Icon"
            phosphor="PathIcon"
            remixicon="RiRouteLine"
          />
        </TraceIcon>
        <TraceTitle>
          {{ plan.title }}
        </TraceTitle>
        <TraceDescription>
          {{ done }} of {{ plan.steps.length }} done
        </TraceDescription>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <TraceLine
          v-for="step in plan.steps"
          :key="step.title"
          :status="
            step.status === 'pending'
              ? 'pending'
              : streaming && step.status === 'running'
                ? 'running'
                : undefined
          "
        >
          <TraceIcon>
            <IconPlaceholder
              v-if="step.status === 'done'"
              lucide="CircleCheckIcon"
              tabler="IconCircleCheckFilled"
              hugeicons="CheckmarkCircle01Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleFill"
            />
            <template v-else>
              <IconPlaceholder
                v-if="step.status === 'running'"
                lucide="CircleDotIcon"
                tabler="IconCircleDot"
                hugeicons="RecordIcon"
                phosphor="RecordIcon"
                remixicon="RiRecordCircleLine"
              />
              <IconPlaceholder
                v-else
                lucide="CircleIcon"
                tabler="IconCircle"
                hugeicons="CircleIcon"
                phosphor="CircleIcon"
                remixicon="RiCheckboxBlankCircleLine"
              />
            </template>
          </TraceIcon>
          <TraceTitle>
            {{ step.title }}
          </TraceTitle>
        </TraceLine>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</template>
