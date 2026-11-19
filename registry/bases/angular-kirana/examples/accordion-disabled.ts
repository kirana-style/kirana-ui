import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"

const styles = {
  full: css({ width: "100%" }),
}

@Component({
  selector: "accordion-disabled",
  imports: [
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiAccordion [sx]="styles.full">
        <div kuiAccordionItem value="item-1">
          <h3 kuiAccordionTrigger>Can I access my account history?</h3>
          <div kuiAccordionContent>
            Yes, you can view your complete account history including all
            transactions, plan changes, and support tickets in the Account
            History section of your dashboard.
          </div>
        </div>
        <div kuiAccordionItem value="item-2" disabled>
          <h3 kuiAccordionTrigger>Premium feature information</h3>
          <div kuiAccordionContent>
            This section contains information about premium features. Upgrade
            your plan to access this content.
          </div>
        </div>
        <div kuiAccordionItem value="item-3">
          <h3 kuiAccordionTrigger>How do I update my email address?</h3>
          <div kuiAccordionContent>
            You can update your email address in your account settings. You'll
            receive a verification email at your new address to confirm the
            change.
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class AccordionDisabled {
  protected readonly styles = styles
  protected readonly page = page
}
