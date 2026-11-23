import { Checkbox } from "@kirana-ui/react/checkbox"
import { CheckboxGroup } from "@kirana-ui/react/checkbox-group"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

const TOPICS = [
  { value: "comments", label: "Comments" },
  { value: "mentions", label: "Mentions" },
  { value: "releases", label: "New releases" },
]
const ALL = TOPICS.map((topic) => topic.value)

export default function Demo({
  s,
}: {
  s: Styles<"group" | "option" | "box" | "mark" | "list">
}) {
  // The values of the checked boxes: the parent box above them is read from these.
  const [topics, setTopics] = useState(["comments", "mentions"])
  const some = topics.length > 0 && topics.length < ALL.length
  return (
    <CheckboxGroup
      aria-label="Email me about"
      value={topics}
      onValueChange={setTopics}
      allValues={ALL}
      {...s.group}
    >
      <label {...s.option}>
        <Checkbox.Root parent {...s.box}>
          <Checkbox.Indicator {...s.mark}>
            {some ? "–" : "✓"}
          </Checkbox.Indicator>
        </Checkbox.Root>
        Everything
      </label>
      <div {...s.list}>
        {TOPICS.map((topic) => (
          <label key={topic.value} {...s.option}>
            <Checkbox.Root name="topics" value={topic.value} {...s.box}>
              <Checkbox.Indicator {...s.mark}>✓</Checkbox.Indicator>
            </Checkbox.Root>
            {topic.label}
          </label>
        ))}
      </div>
    </CheckboxGroup>
  )
}
