"use client"

import type * as React from "react"
import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
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

const STEPS: { title: string; content: string; icon: React.ReactNode }[] = [
  {
    title: "Account",
    content: "Sign in, or create an account.",
    icon: (
      <IconPlaceholder
        lucide="UserIcon"
        tabler="IconUser"
        hugeicons="UserIcon"
        phosphor="UserIcon"
        remixicon="RiUserLine"
      />
    ),
  },
  {
    title: "Payment",
    content: "Add a card to pay with.",
    icon: (
      <IconPlaceholder
        lucide="CreditCardIcon"
        tabler="IconCreditCard"
        hugeicons="CreditCardIcon"
        phosphor="CreditCardIcon"
        remixicon="RiBankCardLine"
      />
    ),
  },
  {
    title: "Confirmation",
    content: "We send a receipt to your email.",
    icon: (
      <IconPlaceholder
        lucide="MailIcon"
        tabler="IconMail"
        hugeicons="Mail01Icon"
        phosphor="EnvelopeIcon"
        remixicon="RiMailLine"
      />
    ),
  },
]

export default function StepsIcons() {
  return (
    <div sx={page.example}>
      <Steps defaultStep={1} sx={styles.steps}>
        <StepsList aria-label="Purchase">
          {STEPS.map((each, index) => (
            <StepsItem key={each.title} index={index}>
              <StepsTrigger>
                <StepsIndicator>{each.icon}</StepsIndicator>
                <StepsTitle>{each.title}</StepsTitle>
              </StepsTrigger>
            </StepsItem>
          ))}
        </StepsList>
        {STEPS.map((each, index) => (
          <StepsContent key={each.title} index={index} sx={styles.muted}>
            {each.content}
          </StepsContent>
        ))}
      </Steps>
    </div>
  )
}
