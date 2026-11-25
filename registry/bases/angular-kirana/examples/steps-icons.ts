import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import type { IconNames } from "../../../icons/angular"
import { page } from "../../../styles/page.styles"
import {
  Steps,
  StepsContent,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsTitle,
  StepsTrigger,
} from "../ui/steps"

const styles = {
  steps: css({ maxWidth: containerSize.md }),
  muted: css({ color: theme.mutedForeground }),
}

const STEPS: { title: string; content: string; icon: IconNames }[] = [
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

@Component({
  selector: "steps-icons",
  imports: [
    IconPlaceholder,
    Steps,
    StepsContent,
    StepsIndicator,
    StepsItem,
    StepsList,
    StepsTitle,
    StepsTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiSteps [defaultStep]="1" [sx]="styles.steps">
        <div kuiStepsList aria-label="Purchase">
          @for (each of steps; track each.title; let index = $index) {
            <div kuiStepsItem [index]="index">
              <button kuiStepsTrigger>
                <span kuiStepsIndicator
                  ><svg
                    iconPlaceholder
                    [lucide]="each.icon.lucide"
                    [tabler]="each.icon.tabler"
                    [hugeicons]="each.icon.hugeicons"
                    [phosphor]="each.icon.phosphor"
                    [remixicon]="each.icon.remixicon"
                  ></svg
                ></span>
                <span kuiStepsTitle>{{ each.title }}</span>
              </button>
            </div>
          }
        </div>
        @for (each of steps; track each.title; let index = $index) {
          <div kuiStepsContent [index]="index" [sx]="styles.muted">
            {{ each.content }}
          </div>
        }
      </div>
    </div>
  `,
})
export default class StepsIcons {
  protected readonly steps = STEPS
  protected readonly styles = styles
  protected readonly page = page
}
