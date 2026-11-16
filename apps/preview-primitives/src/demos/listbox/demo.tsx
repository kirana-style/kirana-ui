import { Listbox } from "@kirana-ui/react/listbox"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

const FRUITS = ["Apple", "Banana", "Blueberry", "Cherry", "Mango"]

export default function Demo({
  s,
}: {
  s: Styles<"root" | "item" | "indicator">
}) {
  const [chosen, setChosen] = useState(["Banana"])
  return (
    <Listbox.Root
      aria-label="Fruit"
      value={chosen}
      onValueChange={(next) => setChosen(next)}
      {...s.root}
    >
      {FRUITS.map((fruit) => (
        <Listbox.Item
          key={fruit}
          value={fruit}
          disabled={fruit === "Blueberry"}
          {...s.item}
        >
          {fruit}
          <Listbox.ItemIndicator {...s.indicator}>✓</Listbox.ItemIndicator>
        </Listbox.Item>
      ))}
    </Listbox.Root>
  )
}
