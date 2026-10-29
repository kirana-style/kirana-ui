import { css } from "@kirana-style/core"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { containerSize, space } from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  // `max-w-lg rounded-lg border`
  frame: css({
    maxWidth: containerSize.lg,
    borderRadius: { "*": null, base: radius.lg },
    borderWidth: { "*": null, base: "1px" },
    borderColor: theme.border,
  }),
  // `border-b px-4 last:border-b-0`
  item: css({
    borderBottomWidth: { "*": null, base: "1px", ":last-child": "0" },
    paddingInline: space[4],
  }),
}

const items = [
  {
    value: "billing",
    trigger: "How does billing work?",
    content:
      "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members.",
  },
  {
    value: "security",
    trigger: "Is my data secure?",
    content:
      "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols.",
  },
  {
    value: "integration",
    trigger: "What integrations do you support?",
    content:
      "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks.",
  },
]

export default function AccordionBorders() {
  return (
    <div sx={page.example}>
      <Accordion sx={styles.frame} defaultExpandedKeys={["billing"]}>
        {items.map((item) => (
          <AccordionItem key={item.value} id={item.value} sx={styles.item}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
