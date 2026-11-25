import { For } from "solid-js"
import { css } from "@kirana-style/core"
import type { JSX } from "@solidjs/web"

import { IconPlaceholder } from "../ui/icon-placeholder"
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

/** Each step's icon is drawn by a function, inside the page, so it reads the page's icon library. */
const STEPS: { title: string; content: string; icon: () => JSX.Element }[] = [
  {
    title: "Account",
    content: "Sign in, or create an account.",
    icon: () => (
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
    icon: () => (
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
    icon: () => (
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
          <For each={STEPS}>
            {(each, index) => (
              <StepsItem index={index()}>
                <StepsTrigger>
                  <StepsIndicator>{each.icon()}</StepsIndicator>
                  <StepsTitle>{each.title}</StepsTitle>
                </StepsTrigger>
              </StepsItem>
            )}
          </For>
        </StepsList>
        <For each={STEPS}>
          {(each, index) => (
            <StepsContent index={index()} sx={styles.muted}>
              {each.content}
            </StepsContent>
          )}
        </For>
      </Steps>
    </div>
  )
}
