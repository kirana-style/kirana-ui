import { Switch } from "@kirana-ui/react/switch"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"label" | "switch" | "thumb">
}) {
  return (
    <label {...s.label}>
      Email alerts
      <Switch.Root
        name="alerts"
        defaultChecked
        aria-label="Email alerts"
        {...s.switch}
      >
        <Switch.Thumb {...s.thumb} />
      </Switch.Root>
    </label>
  )
}
