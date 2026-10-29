import { css } from "@kirana-style/core"

import { Example, ExampleWrapper } from "../components/example"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { axes } from "../../../core/axes"
import {
  breakpoint,
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { accordion as accordionState, when } from "../../../core/states"
import { alpha, radius, theme } from "../../../core/tokens"

const { nova, vega, lyra, maia, mira, luma } = axes.style

/** `px-*` per style, on a trigger or a content part. */
const STYLE_PADDING = {
  [vega]: space[4],
  [nova]: space["2.5"],
  [lyra]: space[2],
}

const styles = {
  // `w-full max-w-4xl lg:grid-cols-1 2xl:max-w-4xl 2xl:grid-cols-1`
  page: css({
    maxWidth: {
      base: containerSize["4xl"],
      [breakpoint["2xl"]]: containerSize["4xl"],
    },
    gridTemplateColumns: {
      [breakpoint.lg]: "repeat(1, minmax(0, 1fr))",
      [breakpoint["2xl"]]: "repeat(1, minmax(0, 1fr))",
    },
  }),
  mxAutoMaxWLg: css({ marginInline: "auto", maxWidth: containerSize.lg }),
  // `mx-auto max-w-lg style-vega:gap-2 style-nova:gap-2 style-lyra:gap-2`
  bordered: css({
    marginInline: "auto",
    maxWidth: containerSize.lg,
    gap: { [vega]: space[2], [nova]: space[2], [lyra]: space[2] },
  }),
  // `style-vega:rounded-lg style-vega:border style-nova:rounded-lg style-nova:border style-lyra:border`
  borderedItem: css({
    borderRadius: { [vega]: radius.lg, [nova]: radius.lg },
    borderWidth: { [vega]: "1px", [nova]: "1px", [lyra]: "1px" },
  }),
  // `font-medium style-vega:px-4 style-vega:text-sm style-nova:px-2.5 style-nova:text-sm
  // style-lyra:px-2 style-lyra:text-xs style-maia:text-sm style-mira:text-xs style-luma:text-sm`:
  // `font-medium` beats Sera's `font-semibold` hook, as a class beats upstream's hooks.
  borderedTrigger: css({
    fontWeight: { "*": null, base: fontWeight.medium },
    paddingInline: STYLE_PADDING,
    fontSize: {
      [vega]: fontSize.sm,
      [nova]: fontSize.sm,
      [lyra]: fontSize.xs,
      [maia]: fontSize.sm,
      [mira]: fontSize.xs,
      [luma]: fontSize.sm,
    },
    lineHeight: {
      [vega]: lineHeight.sm,
      [nova]: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [maia]: lineHeight.sm,
      [mira]: lineHeight.xs,
      [luma]: lineHeight.sm,
    },
  }),
  // `text-muted-foreground style-vega:px-4 style-nova:px-2.5 style-nova:text-sm style-lyra:px-2
  // style-lyra:text-xs style-maia:px-0 style-mira:px-0 style-luma:px-0`, on the inner part.
  borderedContent: css({
    color: theme.mutedForeground,
    paddingInline: {
      ...STYLE_PADDING,
      [maia]: "0",
      [mira]: "0",
      [luma]: "0",
    },
    fontSize: { [nova]: fontSize.sm, [lyra]: fontSize.xs },
    lineHeight: { [nova]: lineHeight.sm, [lyra]: lineHeight.xs },
  }),
  mxAutoWFullMaxWLgGap4: css({
    marginInline: "auto",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.lg,
    gap: { "*": null, base: space[4] },
  }),
  // `style-maia:rounded-md style-mira:rounded-md`
  inCard: css({ borderRadius: { [maia]: radius.md, [mira]: radius.md } }),
  // `mx-auto max-w-lg overflow-hidden border style-vega:rounded-lg style-nova:rounded-lg
  // style-lyra:rounded-none style-maia:rounded-lg style-mira:rounded-lg style-luma:rounded-xl`
  framed: css({
    marginInline: "auto",
    maxWidth: containerSize.lg,
    overflow: "hidden",
    borderWidth: "1px",
    borderColor: theme.border,
    borderRadius: {
      [vega]: radius.lg,
      [nova]: radius.lg,
      [lyra]: "0",
      [maia]: radius.lg,
      [mira]: radius.lg,
      [luma]: radius.xl,
    },
  }),
  // `p-1 data-open:bg-muted/50` (React Aria's copy: `data-expanded:`)
  framedItem: css({
    padding: space[1],
    backgroundColor: when(accordionState.expanded, alpha.muted50),
  }),
  // `style-vega:px-4 style-nova:px-2.5 style-lyra:px-2`
  framedPart: css({ paddingInline: STYLE_PADDING }),
}

export default function AccordionExample() {
  return (
    <ExampleWrapper sx={styles.page}>
      <AccordionBasic />
      <AccordionMultiple />
      <AccordionWithBorders />
      <AccordionInCard />
      <AccordionWithDisabled />
    </ExampleWrapper>
  )
}

function AccordionBasic() {
  const items = [
    {
      value: "item-1",
      trigger: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      value: "item-2",
      trigger: "Is it styled?",
      content:
        "Yes. It comes with default styles that matches the other components' aesthetic.",
    },
    {
      value: "item-3",
      trigger: "Is it animated?",
      content:
        "Yes. It's animated by default, but you can disable it if you prefer.",
    },
  ]

  return (
    <Example title="Basic">
      <Accordion sx={styles.mxAutoMaxWLg}>
        {items.map((item) => (
          <AccordionItem key={item.value} id={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Example>
  )
}

function AccordionMultiple() {
  const items = [
    {
      value: "item-1",
      trigger:
        "What are the key considerations when implementing a comprehensive enterprise-level authentication system?",
      content:
        "Implementing a robust enterprise authentication system requires careful consideration of multiple factors. This includes secure password hashing and storage, multi-factor authentication (MFA) implementation, session management, OAuth2 and SSO integration, regular security audits, rate limiting to prevent brute force attacks, and maintaining detailed audit logs. Additionally, you'll need to consider scalability, performance impact, and compliance with relevant data protection regulations such as GDPR or HIPAA.",
    },
    {
      value: "item-2",
      trigger:
        "How does modern distributed system architecture handle eventual consistency and data synchronization across multiple regions?",
      content:
        "Modern distributed systems employ various strategies to maintain data consistency across regions. This often involves using techniques like CRDT (Conflict-Free Replicated Data Types), vector clocks, and gossip protocols. Systems might implement event sourcing patterns, utilize message queues for asynchronous updates, and employ sophisticated conflict resolution strategies. Popular solutions like Amazon's DynamoDB and Google's Spanner demonstrate different approaches to solving these challenges, balancing between consistency, availability, and partition tolerance as described in the CAP theorem.",
    },
  ]

  return (
    <Example title="Multiple">
      <Accordion allowsMultipleExpanded sx={styles.mxAutoMaxWLg}>
        {items.map((item) => (
          <AccordionItem key={item.value} id={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Example>
  )
}

function AccordionWithBorders() {
  const items = [
    {
      value: "billing",
      trigger: "How does billing work?",
      content:
        "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members. There are no hidden fees or setup costs.",
    },
    {
      value: "security",
      trigger: "Is my data secure?",
      content:
        "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols. We also offer optional two-factor authentication and single sign-on for enterprise customers.",
    },
    {
      value: "integration",
      trigger: "What integrations do you support?",
      content: (
        <>
          <p>
            We integrate with 500+ popular tools including Slack, Zapier,
            Salesforce, HubSpot, and more. You can also build custom
            integrations using our REST API and webhooks.{" "}
          </p>
          <p>
            Our API documentation includes code examples in 10+ programming
            languages.
          </p>
        </>
      ),
    },
  ]

  return (
    <Example title="With Borders">
      <Accordion sx={styles.bordered}>
        {items.map((item) => (
          <AccordionItem
            key={item.value}
            id={item.value}
            sx={styles.borderedItem}
          >
            <AccordionTrigger sx={styles.borderedTrigger}>
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent sx={styles.borderedContent}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Example>
  )
}

function AccordionInCard() {
  const items = [
    {
      value: "plans",
      trigger: "What subscription plans do you offer?",
      content: (
        <>
          <p>
            We offer three subscription tiers: Starter ($9/month), Professional
            ($29/month), and Enterprise ($99/month). Each plan includes
            increasing storage limits, API access, priority support, and team
            collaboration features.
          </p>
          <p>
            <a href="#">Annual billing is available</a> with a 20% discount. All
            plans include a 14-day free trial with no credit card required.
          </p>
          <Button size="sm">
            View plans
            <IconPlaceholder
              lucide="ArrowUpRightIcon"
              tabler="IconArrowUpRight"
              hugeicons="ArrowUpRight01Icon"
              phosphor="ArrowUpRightIcon"
              remixicon="RiArrowRightUpLine"
            />
          </Button>
        </>
      ),
    },
    {
      value: "billing",
      trigger: "How does billing work?",
      content: (
        <>
          <p>
            Billing occurs automatically at the start of each billing cycle. We
            accept all major credit cards, PayPal, and ACH transfers for
            enterprise customers.
          </p>
          <p>
            You&apos;ll receive an invoice via email after each payment. You can
            update your payment method or billing information anytime in your
            account settings. Failed payments will trigger automated retry
            attempts and email notifications.
          </p>
        </>
      ),
    },
    {
      value: "upgrade",
      trigger: "Can I upgrade or downgrade my plan?",
      content: (
        <>
          <p>
            Yes, you can change your plan at any time. When upgrading,
            you&apos;ll be charged a prorated amount for the remainder of your
            billing cycle and immediately gain access to new features.
          </p>
          <p>
            When downgrading, the change takes effect at the end of your current
            billing period, and you&apos;ll retain access to premium features
            until then. No refunds are provided for downgrades.
          </p>
        </>
      ),
    },
    {
      value: "cancel",
      trigger: "How do I cancel my subscription?",
      content: (
        <>
          <p>
            You can cancel your subscription anytime from your account settings.
            There are no cancellation fees or penalties. Your access will
            continue until the end of your current billing period.
          </p>
          <p>
            After cancellation, your data is retained for 30 days in case you
            want to reactivate. You can export all your data before or after
            canceling. We&apos;d love to hear your feedback about why
            you&apos;re leaving.
          </p>
        </>
      ),
    },
    {
      value: "refund",
      trigger: "What is your refund policy?",
      content: (
        <>
          <p>
            We offer a 30-day money-back guarantee for new subscriptions. If
            you&apos;re not satisfied within the first 30 days, contact our
            support team for a full refund.
          </p>
          <p>
            After 30 days, we don&apos;t provide refunds for partial billing
            periods, but you can cancel anytime to avoid future charges.
            Enterprise customers have custom refund terms outlined in their
            contracts.
          </p>
        </>
      ),
    },
  ]

  return (
    <Example title="In Card">
      <Card sx={styles.mxAutoWFullMaxWLgGap4}>
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
          <CardDescription>
            Common questions about your account, plans, and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion
            allowsMultipleExpanded
            defaultExpandedKeys={["plans"]}
            sx={styles.inCard}
          >
            {items.map((item) => (
              <AccordionItem key={item.value} id={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </Example>
  )
}

function AccordionWithDisabled() {
  const items = [
    {
      value: "item-1",
      trigger: "Can I access my account history?",
      content:
        "Yes, you can view your complete account history including all transactions, plan changes, and support tickets in the Account History section of your dashboard.",
      disabled: false,
    },
    {
      value: "item-2",
      trigger: "Premium feature information",
      content:
        "This section contains information about premium features. Upgrade your plan to access this content.",
      disabled: true,
    },
    {
      value: "item-3",
      trigger: "How do I update my email address?",
      content:
        "You can update your email address in your account settings. You'll receive a verification email at your new address to confirm the change.",
      disabled: false,
    },
  ]

  return (
    <Example title="With Disabled">
      <Accordion sx={styles.framed}>
        {items.map((item) => (
          <AccordionItem
            key={item.value}
            id={item.value}
            isDisabled={item.disabled}
            sx={styles.framedItem}
          >
            <AccordionTrigger sx={styles.framedPart}>
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent sx={styles.framedPart}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Example>
  )
}
