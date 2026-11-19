import { For } from "solid-js"
import { css } from "@kirana-style/core"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function AccordionMultiple() {
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

  return (
    <div sx={page.example}>
      <Accordion multiple sx={styles.maxWLg} defaultValue={["notifications"]}>
        <For each={items}>
          {(item) => (
            <AccordionItem value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          )}
        </For>
      </Accordion>
    </div>
  )
}
