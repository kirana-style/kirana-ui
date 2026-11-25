import { Component, signal } from "@angular/core"
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
  { title: "Shipping", content: "Where should we send your order?" },
  { title: "Payment", content: "How would you like to pay?" },
  { title: "Review", content: "Check your order before you place it." },
]

@Component({
  selector: "steps-demo",
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
      <div
        kuiSteps
        [step]="step()"
        (stepChange)="step.set($event ?? 0)"
        [sx]="styles.steps"
      >
        <div kuiStepsList aria-label="Checkout">
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
        <div kuiStepsCompleted [sx]="styles.muted">
          Thank you. Your order is on its way.
        </div>
        <div [sx]="styles.actions">
          <button kuiStepsPrevious>Back</button>
          <button kuiStepsNext>
            {{ step() === steps.length - 1 ? "Place order" : "Next" }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class StepsDemo {
  protected readonly step = signal(0)
  protected readonly steps = STEPS
  protected readonly styles = styles
  protected readonly page = page
}
