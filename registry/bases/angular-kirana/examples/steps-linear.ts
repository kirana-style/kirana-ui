import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
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

@Component({
  selector: "steps-linear",
  imports: [
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
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiSteps [linear]="true" [sx]="styles.steps">
        <div kuiStepsList aria-label="Sign up">
          @for (each of steps; track each.title; let index = $index) {
            <div kuiStepsItem [index]="index">
              <button kuiStepsTrigger>
                <span kuiStepsIndicator></span>
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
        <div kuiStepsCompleted [sx]="styles.muted">Your account is ready.</div>
        <div [sx]="styles.actions">
          <button kuiStepsPrevious>Back</button>
          <button kuiStepsNext>Continue</button>
        </div>
      </div>
    </div>
  `,
})
export default class StepsLinear {
  protected readonly steps = STEPS
  protected readonly styles = styles
  protected readonly page = page
}
