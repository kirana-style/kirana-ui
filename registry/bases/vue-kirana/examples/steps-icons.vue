<script setup lang="ts">
import { css } from "@kirana-style/core"

import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import {
  Steps,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsTitle,
  StepsTrigger,
} from "../ui/steps"
import { containerSize } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  steps: css({ maxWidth: containerSize.md }),
  muted: css({ color: theme.mutedForeground }),
}

const STEPS = [
  {
    title: "Account",
    content: "Sign in, or create an account.",
    icon: {
      lucide: "UserIcon",
      tabler: "IconUser",
      hugeicons: "UserIcon",
      phosphor: "UserIcon",
      remixicon: "RiUserLine",
    },
  },
  {
    title: "Payment",
    content: "Add a card to pay with.",
    icon: {
      lucide: "CreditCardIcon",
      tabler: "IconCreditCard",
      hugeicons: "CreditCardIcon",
      phosphor: "CreditCardIcon",
      remixicon: "RiBankCardLine",
    },
  },
  {
    title: "Confirmation",
    content: "We send a receipt to your email.",
    icon: {
      lucide: "MailIcon",
      tabler: "IconMail",
      hugeicons: "Mail01Icon",
      phosphor: "EnvelopeIcon",
      remixicon: "RiMailLine",
    },
  },
]
</script>

<template>
  <div :sx="page.example">
    <Steps :default-step="1" :sx="styles.steps">
      <StepsList aria-label="Purchase">
        <StepsItem
          v-for="(each, index) in STEPS"
          :key="each.title"
          :index="index"
        >
          <StepsTrigger>
            <StepsIndicator
              ><IconPlaceholder v-bind="each.icon"
            /></StepsIndicator>
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
    </Steps>
  </div>
</template>
