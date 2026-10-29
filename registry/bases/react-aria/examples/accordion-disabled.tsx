import { css } from "@kirana-style/core"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { page } from "../../../styles/page.styles"

const styles = {
  full: css({ width: "100%" }),
}

export default function AccordionDisabled() {
  return (
    <div sx={page.example}>
      <Accordion sx={styles.full}>
        <AccordionItem id="item-1">
          <AccordionTrigger>Can I access my account history?</AccordionTrigger>
          <AccordionContent>
            Yes, you can view your complete account history including all
            transactions, plan changes, and support tickets in the Account
            History section of your dashboard.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="item-2" isDisabled>
          <AccordionTrigger>Premium feature information</AccordionTrigger>
          <AccordionContent>
            This section contains information about premium features. Upgrade
            your plan to access this content.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="item-3">
          <AccordionTrigger>How do I update my email address?</AccordionTrigger>
          <AccordionContent>
            You can update your email address in your account settings.
            You&apos;ll receive a verification email at your new address to
            confirm the change.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
