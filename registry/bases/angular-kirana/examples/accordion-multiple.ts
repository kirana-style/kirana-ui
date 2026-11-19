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
    value: "notifications",
    trigger: "Notification Settings",
    content:
      "Manage how you receive notifications. You can enable email alerts for updates or push notifications for mobile devices.",
  },
  {
    value: "privacy",
    trigger: "Privacy & Security",
    content:
      "Control your privacy settings and security preferences. Enable two-factor authentication, manage connected devices, review active sessions, and configure data sharing preferences. You can also download your data or delete your account.",
  },
  {
    value: "billing",
    trigger: "Billing & Subscription",
    content:
      "View your current plan, payment history, and upcoming invoices. Update your payment method, change your subscription tier, or cancel your subscription.",
  },
]

@Component({
  selector: "accordion-multiple",
  imports: [
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div
        kuiAccordion
        multiple
        [sx]="styles.maxWLg"
        [defaultValue]="['notifications']"
      >
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
export default class AccordionMultiple {
  protected readonly styles = styles
  protected readonly items = items
  protected readonly page = page
}
