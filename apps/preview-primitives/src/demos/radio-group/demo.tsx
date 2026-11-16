import { RadioGroup } from "@kirana-ui/react/radio-group"

import type { Styles } from "../../styled.ts"

const PLANS = ["Starter", "Pro", "Team"]

export default function Demo({
  s,
}: {
  s: Styles<"root" | "option" | "item" | "indicator">
}) {
  return (
    <RadioGroup.Root
      aria-label="Plan"
      name="plan"
      defaultValue="Pro"
      {...s.root}
    >
      {PLANS.map((plan) => (
        <label key={plan} {...s.option}>
          <RadioGroup.Item value={plan} {...s.item}>
            <RadioGroup.Indicator {...s.indicator} />
          </RadioGroup.Item>
          {plan}
        </label>
      ))}
    </RadioGroup.Root>
  )
}
