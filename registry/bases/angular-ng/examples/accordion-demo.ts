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

@Component({
  selector: "accordion-demo",
  imports: [
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiAccordion [defaultValue]="['shipping']" [sx]="styles.maxWLg">
        <div kuiAccordionItem value="shipping">
          <h3 kuiAccordionTrigger>What are your shipping options?</h3>
          <div kuiAccordionContent>
            We offer standard (5-7 days), express (2-3 days), and overnight
            shipping. Free shipping on international orders.
          </div>
        </div>
        <div kuiAccordionItem value="returns">
          <h3 kuiAccordionTrigger>What is your return policy?</h3>
          <div kuiAccordionContent>
            Returns accepted within 30 days. Items must be unused and in
            original packaging. Refunds processed within 5-7 business days.
          </div>
        </div>
        <div kuiAccordionItem value="support">
          <h3 kuiAccordionTrigger>How can I contact customer support?</h3>
          <div kuiAccordionContent>
            Reach us via email, live chat, or phone. We respond within 24 hours
            during business days.
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class AccordionDemo {
  protected readonly styles = styles
  protected readonly page = page
}
