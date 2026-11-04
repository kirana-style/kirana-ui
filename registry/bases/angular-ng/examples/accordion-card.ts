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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
}

const items = [
  {
    value: "plans",
    trigger: "What subscription plans do you offer?",
    content:
      "We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and Enterprise ($99/month). Each plan includes increasing storage limits, API access, priority support, and team collaboration features.",
  },
  {
    value: "billing",
    trigger: "How does billing work?",
    content:
      "Billing occurs automatically at the start of each billing cycle. We accept all major credit cards, PayPal, and ACH transfers for enterprise customers. You'll receive an invoice via email after each payment.",
  },
  {
    value: "cancel",
    trigger: "How do I cancel my subscription?",
    content:
      "You can cancel your subscription anytime from your account settings. There are no cancellation fees or penalties. Your access will continue until the end of your current billing period.",
  },
]

@Component({
  selector: "accordion-card",
  imports: [
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiCard [sx]="styles.narrowSm">
        <div kuiCardHeader>
          <div kuiCardTitle>Subscription & Billing</div>
          <div kuiCardDescription>
            Common questions about your account, plans, payments and
            cancellations.
          </div>
        </div>
        <div kuiCardContent>
          <div kuiAccordion [defaultValue]="['plans']">
            @for (item of items; track item.value) {
              <div kuiAccordionItem [value]="item.value">
                <h3 kuiAccordionTrigger>{{ item.trigger }}</h3>
                <div kuiAccordionContent>{{ item.content }}</div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class AccordionCard {
  protected readonly styles = styles
  protected readonly items = items
  protected readonly page = page
}
