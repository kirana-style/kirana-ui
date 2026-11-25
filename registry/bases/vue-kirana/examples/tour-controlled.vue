<script setup lang="ts">
import { elementOf } from "@kirana-ui/vue/runtime"
import { css } from "@kirana-style/core"
import { ref, useTemplateRef } from "vue"

import { Button } from "../ui/button"
import { Tour, TourContent } from "../ui/tour"
import type { TourStep } from "../ui/tour"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[6],
  }),
  row: css({ display: "flex", alignItems: "center", gap: space[2] }),
  status: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
}

const open = ref(false)
const step = ref(0)
const draft = useTemplateRef("draft")
const preview = useTemplateRef("preview")
const publish = useTemplateRef("publish")

const steps: TourStep[] = [
  {
    id: "draft",
    target: () => elementOf(draft.value),
    title: "Draft",
    description: "Write the post. It saves as you type.",
  },
  {
    id: "preview",
    target: () => elementOf(preview.value),
    title: "Preview",
    description: "See the post as readers will.",
  },
  {
    id: "publish",
    target: () => elementOf(publish.value),
    title: "Publish",
    description: "Put it live when it is ready.",
  },
]

function start(at: number) {
  step.value = at
  open.value = true
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.stack">
      <div :sx="styles.row">
        <Button ref="draft" variant="outline">Draft</Button>
        <Button ref="preview" variant="outline">Preview</Button>
        <Button ref="publish" variant="outline">Publish</Button>
      </div>
      <div :sx="styles.row">
        <Button @click="start(0)">Start</Button>
        <Button variant="outline" @click="start(2)">Go to the last step</Button>
      </div>
      <p :sx="styles.status" aria-live="polite">
        {{ open ? `Showing step ${step + 1} of 3` : "Not started" }}
      </p>
    </div>
    <Tour v-model:open="open" v-model:step="step" :steps="steps">
      <TourContent />
    </Tour>
  </div>
</template>
