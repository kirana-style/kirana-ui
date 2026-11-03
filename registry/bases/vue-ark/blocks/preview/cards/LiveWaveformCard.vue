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
import LiveWaveform from "./LiveWaveform.vue"

const styles = {
  cardFooter: css({
    gap: { "*": null, base: space[2] },
  }),
}

const active = ref(false)
const processing = ref(true)
const mode = ref<"static" | "scrolling">("static")

function toggleActive() {
  if (!active.value) processing.value = false
  active.value = !active.value
}

function toggleProcessing() {
  if (!processing.value) active.value = false
  processing.value = !processing.value
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Live Audio Waveform</CardTitle>
      <CardDescription>
        Real-time microphone input visualization with audio reactivity
      </CardDescription>
    </CardHeader>
    <CardContent>
      <LiveWaveform
        :active="active"
        :processing="processing"
        :height="80"
        :bar-width="3"
        :bar-gap="2"
        :mode="mode"
        fade-edges
        bar-color="gray"
        :history-size="120"
      />
    </CardContent>
    <CardFooter :sx="styles.cardFooter">
      <Button
        size="sm"
        :variant="active ? 'default' : 'outline'"
        @click="toggleActive"
      >
        {{ active ? "Stop" : "Start" }} Listening
      </Button>
      <Button
        size="sm"
        :variant="processing ? 'default' : 'outline'"
        @click="toggleProcessing"
      >
        {{ processing ? "Stop" : "Start" }} Processing
      </Button>
      <Button
        size="sm"
        variant="outline"
        @click="mode = mode === 'static' ? 'scrolling' : 'static'"
      >
        {{ mode === "static" ? "Static" : "Scrolling" }}
      </Button>
    </CardFooter>
  </Card>
</template>
