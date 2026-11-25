<script setup lang="ts">
import { elementOf } from "@kirana-ui/vue/runtime"
import { css } from "@kirana-style/core"
import { ref, useTemplateRef } from "vue"

import { Button } from "../ui/button"
import { Tour, TourContent } from "../ui/tour"
import type { TourStep } from "../ui/tour"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[6],
  }),
}

const open = ref(false)
const target = useTemplateRef("target")

const steps: TourStep[] = (["top", "right", "bottom", "left"] as const).map(
  (side) => ({
    id: side,
    target: () => elementOf(target.value),
    side,
    title: `On the ${side}`,
    description: `This step's popup is on the ${side} of its target.`,
  })
)
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.stack">
      <Button ref="target" variant="outline">Target</Button>
      <Button @click="open = true">Show each side</Button>
    </div>
    <Tour v-model:open="open" :steps="steps">
      <TourContent />
    </Tour>
  </div>
</template>
