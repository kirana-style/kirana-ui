<script setup lang="ts">
import { css } from "@kirana-style/core"
import { ref } from "vue"

import { space } from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import type { AgentState } from "./bar-visualizer"
import BarVisualizer from "./BarVisualizer.vue"

const styles = {
  barVisualizer: css({
    height: space[40],
    maxWidth: "100%",
  }),
  cardFooter: css({
    gap: { "*": null, base: space[2] },
  }),
}

const state = ref<AgentState>("speaking")
const states = [
  { value: "connecting", label: "Connecting" },
  { value: "listening", label: "Listening" },
  { value: "speaking", label: "Speaking" },
] as const
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Audio Frequency Visualizer</CardTitle>
      <CardDescription>
        Real-time frequency band visualization with animated state transitions
      </CardDescription>
    </CardHeader>
    <CardContent>
      <BarVisualizer
        :state="state"
        demo
        :bar-count="20"
        :min-height="15"
        :max-height="90"
        :sx="styles.barVisualizer"
      />
    </CardContent>
    <CardFooter :sx="styles.cardFooter">
      <Button
        v-for="option in states"
        :key="option.value"
        size="sm"
        :variant="state === option.value ? 'default' : 'outline'"
        @click="state = option.value"
      >
        {{ option.label }}
      </Button>
    </CardFooter>
  </Card>
</template>
