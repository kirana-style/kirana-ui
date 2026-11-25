import { Steps } from "@kirana-ui/react/steps"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

const STEPS = [
  { name: "Details", text: "Your name and email, for the receipt." },
  { name: "Shipping", text: "Where the parcel goes, and how fast." },
  { name: "Review", text: "Check the order, then place it." },
]

export default function Demo({
  s,
}: {
  s: Styles<
    | "root"
    | "list"
    | "item"
    | "trigger"
    | "indicator"
    | "tick"
    | "separator"
    | "content"
    | "controls"
    | "back"
    | "next"
  >
}) {
  const [step, setStep] = useState(0)

  return (
    <Steps.Root
      linear
      step={step}
      onStepChange={(next: number) => setStep(next)}
      {...s.root}
    >
      <Steps.List aria-label="Checkout" {...s.list}>
        {STEPS.map((each, index) => (
          <Steps.Item key={each.name} index={index} {...s.item}>
            <Steps.Trigger {...s.trigger}>
              <Steps.Indicator {...s.indicator}>
                {index < step ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    {...s.tick}
                  >
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                ) : (
                  index + 1
                )}
              </Steps.Indicator>
              {each.name}
            </Steps.Trigger>
            {index < STEPS.length - 1 ? (
              <Steps.Separator {...s.separator} />
            ) : null}
          </Steps.Item>
        ))}
      </Steps.List>
      {STEPS.map((each, index) => (
        <Steps.Content key={each.name} index={index} {...s.content}>
          {each.text}
        </Steps.Content>
      ))}
      <Steps.Completed {...s.content}>Order placed. Thank you!</Steps.Completed>
      <div {...s.controls}>
        <Steps.Previous {...s.back}>Back</Steps.Previous>
        <Steps.Next {...s.next}>
          {step < STEPS.length - 1 ? "Next" : "Place order"}
        </Steps.Next>
      </div>
    </Steps.Root>
  )
}
