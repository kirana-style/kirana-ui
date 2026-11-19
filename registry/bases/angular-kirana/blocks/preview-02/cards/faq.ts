import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { Button } from "../../../ui/button"
import { Card, CardContent, CardFooter } from "../../../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs"
import { QuestionList } from "./question-list"

const styles = {
  tabsList: css({
    width: { "*": null, base: "100%" },
  }),
  tabsTrigger: css({
    flex: "1 1 0%",
  }),
  tabsTrigger2: css({
    flex: "1 1 0%",
  }),
  tabsTrigger3: css({
    flex: "1 1 0%",
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
  button2: css({
    width: { "*": null, base: "100%" },
  }),
}

const GENERAL_QUESTIONS = [
  {
    q: "How secure is my financial data with Ledger?",
    a: "We use bank-level AES-256 encryption, SOC 2 Type II certified infrastructure, and never store your credentials. All connections use read-only access tokens. We are a SEC registered investment advisor.",
  },
  {
    q: "How do I connect my bank or investment accounts?",
    a: "Go to Settings > Linked Accounts and search for your institution. We support over 12,000 banks and brokerages via Plaid and MX.",
  },
  {
    q: "Can I export my data for tax purposes?",
    a: "Yes. Navigate to Reports > Tax Export to download a CSV or PDF summary of your transactions, dividends, and capital gains for any tax year.",
  },
]

const BILLING_QUESTIONS = [
  {
    q: "What is the difference between Basic and Pro pricing tiers?",
    a: "Basic includes budgeting, goal tracking, and up to 3 linked accounts. Pro adds unlimited accounts, dividend tracking, portfolio analysis, and priority support.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Go to Settings > Billing > Manage Plan and click Cancel. Your access continues until the end of your current billing period.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes. All new accounts start with a 14-day Pro trial. No credit card required.",
  },
]

const GOALS_QUESTIONS = [
  {
    q: "How do I set up a custom financial goal?",
    a: "Click New Goal from the Savings Targets card. Choose a category, set a target amount and date, and we'll calculate the monthly contribution needed.",
  },
  {
    q: "Can I track multiple goals at once?",
    a: "Yes. Pro accounts can track unlimited goals. Basic accounts support up to 3 active goals.",
  },
  {
    q: "How are monthly contributions calculated?",
    a: "We divide the remaining amount by the number of months until your target date, adjusted for your current savings rate and any auto-transfer schedules.",
  },
]

@Component({
  selector: "kui-faq",
  imports: [
    Button,
    Card,
    CardContent,
    CardFooter,
    QuestionList,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent>
        <div kuiTabs defaultValue="general">
          <div kuiTabsList [sx]="styles.tabsList">
            <button kuiTabsTrigger value="general" [sx]="styles.tabsTrigger">
              General
            </button>
            <button kuiTabsTrigger value="billing" [sx]="styles.tabsTrigger2">
              Billing
            </button>
            <button kuiTabsTrigger value="goals" [sx]="styles.tabsTrigger3">
              Goals
            </button>
          </div>
          <div kuiTabsContent value="general">
            <kui-question-list [questions]="GENERAL_QUESTIONS" />
          </div>
          <div kuiTabsContent value="billing">
            <kui-question-list [questions]="BILLING_QUESTIONS" />
          </div>
          <div kuiTabsContent value="goals">
            <kui-question-list [questions]="GOALS_QUESTIONS" />
          </div>
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton variant="outline" [sx]="styles.button">
          Contact Support
        </button>
        <button kuiButton variant="link" [sx]="styles.button2">
          Learn More
        </button>
      </div>
    </div>
  `,
})
export class Faq {
  protected readonly styles = styles
  protected readonly GENERAL_QUESTIONS = GENERAL_QUESTIONS
  protected readonly BILLING_QUESTIONS = BILLING_QUESTIONS
  protected readonly GOALS_QUESTIONS = GOALS_QUESTIONS
}
