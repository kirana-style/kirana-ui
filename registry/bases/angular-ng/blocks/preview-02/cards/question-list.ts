import { Component, input } from "@angular/core"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion"

@Component({
  selector: "kui-question-list",
  imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
  host: { style: "display: contents" },
  template: `
    <div kuiAccordion [defaultValue]="['0']">
      @for (item of questions(); track index; let index = $index) {
        <div kuiAccordionItem [value]="'' + index">
          <h3 kuiAccordionTrigger>{{ item.q }}</h3>
          <div kuiAccordionContent>{{ item.a }}</div>
        </div>
      }
    </div>
  `,
})
export class QuestionList {
  readonly questions = input.required<{ q: string; a: string }[]>()
}
