import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Steps,
  StepsContent,
  StepsDescription,
  StepsIndicator,
  StepsItem,
  StepsList,
  StepsTitle,
  StepsTrigger,
} from "../ui/steps"

const styles = {
  steps: css({ maxWidth: containerSize.lg }),
}

const STEPS = [
  {
    title: "Create a project",
    description: "Name it and choose a template.",
    content: "Give your project a name and pick the template it starts from.",
  },
  {
    title: "Invite your team",
    description: "Add the people you work with.",
    content: "Send an invitation to each person who should see the project.",
  },
  {
    title: "Deploy",
    description: "Put it on the web.",
    content: "Connect a domain and deploy the first version.",
  },
]

@Component({
  selector: "steps-vertical",
  imports: [
    Steps,
    StepsContent,
    StepsDescription,
    StepsIndicator,
    StepsItem,
    StepsList,
    StepsTitle,
    StepsTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div
        kuiSteps
        [orientation]="'vertical'"
        [defaultStep]="1"
        [sx]="styles.steps"
      >
        <div kuiStepsList aria-label="Getting started">
          @for (each of steps; track each.title; let index = $index) {
            <div kuiStepsItem [index]="index">
              <button kuiStepsTrigger>
                <span kuiStepsIndicator></span>
                <span kuiStepsTitle>{{ each.title }}</span>
                <span kuiStepsDescription>{{ each.description }}</span>
              </button>
            </div>
          }
        </div>
        @for (each of steps; track each.title; let index = $index) {
          <div kuiStepsContent [index]="index">{{ each.content }}</div>
        }
      </div>
    </div>
  `,
})
export default class StepsVertical {
  protected readonly steps = STEPS
  protected readonly styles = styles
  protected readonly page = page
}
