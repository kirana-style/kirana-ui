<script setup lang="ts">
import { css } from "@kirana-style/core"

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
  { title: "Account", content: "Choose your email address and password." },
  { title: "Profile", content: "Tell us your name and where you work." },
  { title: "Plan", content: "Pick the plan that fits your team." },
]
</script>

<template>
  <div :sx="page.example">
    <Steps linear :sx="styles.steps">
      <StepsList aria-label="Sign up">
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
        Your account is ready.
      </StepsCompleted>
      <div :sx="styles.actions">
        <StepsPrevious>Back</StepsPrevious>
        <StepsNext>Continue</StepsNext>
      </div>
    </Steps>
  </div>
</template>
