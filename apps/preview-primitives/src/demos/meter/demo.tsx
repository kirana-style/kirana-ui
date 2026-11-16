import { Meter } from "@kirana-ui/react/meter"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"root" | "label" | "value" | "track" | "indicator">
}) {
  return (
    <Meter.Root
      value={41}
      max={64}
      format={{ style: "unit", unit: "gigabyte" }}
      {...s.root}
    >
      <Meter.Label {...s.label}>Storage used</Meter.Label>
      <Meter.Value {...s.value} />
      <Meter.Track {...s.track}>
        <Meter.Indicator {...s.indicator} />
      </Meter.Track>
    </Meter.Root>
  )
}
