import { For, splitProps } from "solid-js"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion"
import type { Sx } from "@kirana-style/core"

export function QuestionList(props: {
  questions: { q: string; a: string }[]
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["questions", "sx", "class"])
  return (
    <Accordion defaultValue={["0"]}>
      <For each={local.questions}>
        {(item, index) => (
          <AccordionItem value={String(index())}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        )}
      </For>
    </Accordion>
  )
}
