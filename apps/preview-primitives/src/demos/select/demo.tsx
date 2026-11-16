import { Select } from "@kirana-ui/react/select"

import type { Styles } from "../../styled.ts"

const FRUITS = ["Apple", "Banana", "Cherry", "Mango", "Peach"]

export default function Demo({
  s,
}: {
  s: Styles<"trigger" | "value" | "icon" | "popup" | "item" | "indicator">
}) {
  return (
    <Select.Root name="fruit">
      <Select.Trigger {...s.trigger}>
        <Select.Value placeholder="Pick a fruit" {...s.value} />
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          {...s.icon}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={4}>
          <Select.Popup {...s.popup}>
            {FRUITS.map((fruit) => (
              <Select.Item key={fruit} value={fruit} {...s.item}>
                <Select.ItemText>{fruit}</Select.ItemText>
                <Select.ItemIndicator {...s.indicator}>✓</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}
