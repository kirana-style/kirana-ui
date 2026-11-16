import { Autocomplete } from "@kirana-ui/react/autocomplete"

import type { Styles } from "../../styled.ts"

const CITIES = [
  "Amsterdam",
  "Barcelona",
  "Berlin",
  "Copenhagen",
  "Lisbon",
  "London",
  "Madrid",
  "Paris",
  "Rome",
  "Vienna",
]

export default function Demo({
  s,
}: {
  s: Styles<"label" | "input" | "popup" | "item" | "empty">
}) {
  return (
    <Autocomplete.Root name="city" openOnInputClick>
      <label {...s.label}>
        City
        <Autocomplete.Input placeholder="Where to?" {...s.input} />
      </label>
      <Autocomplete.Portal>
        <Autocomplete.Positioner sideOffset={4}>
          <Autocomplete.Popup aria-label="Cities" {...s.popup}>
            {CITIES.map((each) => (
              <Autocomplete.Item key={each} value={each} {...s.item}>
                {each}
              </Autocomplete.Item>
            ))}
            <Autocomplete.Empty {...s.empty}>
              No city by that name
            </Autocomplete.Empty>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  )
}
