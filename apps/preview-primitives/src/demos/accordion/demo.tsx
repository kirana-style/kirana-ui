import { Accordion } from "@kirana-ui/react/accordion"

import type { Styles } from "../../styled.ts"

const QUESTIONS = [
  {
    value: "delivery",
    question: "When will my order arrive?",
    answer: "Orders leave the next working day and take two to four days.",
  },
  {
    value: "returns",
    question: "Can I send something back?",
    answer: "Yes, within 30 days, in its box. The return label is free.",
  },
  {
    value: "abroad",
    question: "Do you ship abroad?",
    answer: "To most of Europe and North America, for a flat fee.",
  },
]

export default function Demo({
  s,
}: {
  s: Styles<"root" | "item" | "header" | "trigger" | "panel" | "text">
}) {
  return (
    <Accordion.Root defaultValue={["delivery"]} {...s.root}>
      {QUESTIONS.map((each) => (
        <Accordion.Item key={each.value} value={each.value} {...s.item}>
          <Accordion.Header {...s.header}>
            <Accordion.Trigger {...s.trigger}>
              {each.question}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel {...s.panel}>
            <p {...s.text}>{each.answer}</p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
