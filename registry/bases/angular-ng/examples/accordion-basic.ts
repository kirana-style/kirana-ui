import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

const styles = {
  maxWLg: css({ maxWidth: containerSize.lg }),
}

const items = [
  {
    value: "item-1",
    trigger: "How do I reset my password?",
    content:
      "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
  },
  {
    value: "item-2",
    trigger: "Can I change my subscription plan?",
    content:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
  },
  {
    value: "item-3",
    trigger: "What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
  },
]

@Component({
  selector: "accordion-basic",
  imports: [
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiAccordion [defaultValue]="['item-1']" [sx]="styles.maxWLg">
        @for (item of items; track item.value) {
          <div kuiAccordionItem [value]="item.value">
            <h3 kuiAccordionTrigger>{{ item.trigger }}</h3>
            <div kuiAccordionContent>{{ item.content }}</div>
          </div>
        }
      </div>
    </div>
  `,
})
export default class AccordionBasic {
  protected readonly styles = styles
  protected readonly items = items
  protected readonly page = page
}
