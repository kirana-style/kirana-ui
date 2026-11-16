import { Calendar } from "@kirana-ui/react/calendar"
import { useState } from "react"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<
    | "root"
    | "header"
    | "heading"
    | "arrow"
    | "grid"
    | "weekday"
    | "cell"
    | "day"
    | "chosen"
  >
}) {
  const [day, setDay] = useState<string | null>(null)
  return (
    <Calendar.Root
      locale="en-US"
      onValueChange={(next) => setDay(typeof next === "string" ? next : null)}
      {...s.root}
    >
      <div {...s.header}>
        <Calendar.Previous aria-label="Previous month" {...s.arrow}>
          ‹
        </Calendar.Previous>
        <Calendar.Heading {...s.heading} />
        <Calendar.Next aria-label="Next month" {...s.arrow}>
          ›
        </Calendar.Next>
      </div>
      <Calendar.Grid {...s.grid}>
        <thead>
          <tr>
            <Calendar.Weekdays>
              {(weekday) => (
                <Calendar.HeadCell weekday={weekday} {...s.weekday}>
                  {weekday.narrow}
                </Calendar.HeadCell>
              )}
            </Calendar.Weekdays>
          </tr>
        </thead>
        <tbody>
          <Calendar.Weeks>
            {(week) => (
              <tr>
                {week.map((each) => (
                  <Calendar.Cell key={each.date} date={each.date} {...s.cell}>
                    <Calendar.Day date={each.date} {...s.day}>
                      {each.label}
                    </Calendar.Day>
                  </Calendar.Cell>
                ))}
              </tr>
            )}
          </Calendar.Weeks>
        </tbody>
      </Calendar.Grid>
      <p {...s.chosen}>{day ? `Delivery on ${day}` : "Pick a delivery day"}</p>
    </Calendar.Root>
  )
}
