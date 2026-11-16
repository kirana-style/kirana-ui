import { Combobox } from "@kirana-ui/react/combobox"

import type { Styles } from "../../styled.ts"

const FRUITS = [
  "Apple",
  "Apricot",
  "Banana",
  "Cherry",
  "Mango",
  "Orange",
  "Peach",
  "Pear",
]

export default function Demo({
  s,
}: {
  s: Styles<
    "control" | "input" | "trigger" | "popup" | "item" | "check" | "empty"
  >
}) {
  return (
    <Combobox.Root name="fruit">
      <div {...s.control}>
        <Combobox.Input
          {...s.input}
          aria-label="Fruit"
          placeholder="Pick a fruit"
        />
        <Combobox.Trigger {...s.trigger} aria-label="Show fruits">
          ▾
        </Combobox.Trigger>
      </div>
      <Combobox.Portal>
        <Combobox.Positioner sideOffset={4}>
          <Combobox.Popup {...s.popup} aria-label="Fruits">
            {FRUITS.map((fruit) => (
              <Combobox.Item key={fruit} value={fruit} {...s.item}>
                <span>{fruit}</span>
                <Combobox.ItemIndicator {...s.check}>✓</Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
            <Combobox.Empty {...s.empty}>No fruit found</Combobox.Empty>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  )
}
