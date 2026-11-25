<script setup lang="ts">
import { css } from "@kirana-style/core"
import { ref } from "vue"

import {
  Steps,
  StepsCompleted,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsNext,
  StepsPrevious,
  StepsTitle,
  StepsTrigger,
} from "../ui/steps"
import { containerSize, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  steps: css({ maxWidth: containerSize.md }),
  muted: css({ color: theme.mutedForeground }),
  actions: css({
    display: "flex",
    justifyContent: "flex-end",
    gap: space[2],
  }),
}

const STEPS = [
  { title: "Shipping", content: "Where should we send your order?" },
  { title: "Payment", content: "How would you like to pay?" },
  { title: "Review", content: "Check your order before you place it." },
]

const step = ref(0)
</script>

<template>
  <div :sx="page.example">
    <Steps v-model:step="step" :sx="styles.steps">
      <StepsList aria-label="Checkout">
        <StepsItem
          v-for="(each, index) in STEPS"
          :key="each.title"
          :index="index"
        >
          <StepsTrigger>
            <StepsIndicator />
            <StepsTitle>{{ each.title }}</StepsTitle>
          </StepsTrigger>
        </StepsItem>
      </StepsList>
      <StepsContent
        v-for="(each, index) in STEPS"
        :key="each.title"
        :index="index"
        :sx="styles.muted"
      >
        {{ each.content }}
      </StepsContent>
      <StepsCompleted :sx="styles.muted">
        Thank you. Your order is on its way.
      </StepsCompleted>
      <div :sx="styles.actions">
        <StepsPrevious>Back</StepsPrevious>
        <StepsNext>
          {{ step === STEPS.length - 1 ? "Place order" : "Next" }}
        </StepsNext>
      </div>
    </Steps>
  </div>
</template>
