import { DatePicker } from "@kirana-ui/react/date-picker"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<
    | "control"
    | "field"
    | "segment"
    | "trigger"
    | "popup"
    | "header"
    | "heading"
    | "nav"
    | "grid"
    | "weekday"
    | "cell"
    | "day"
  >
}) {
  return (
    <DatePicker.Root
      locale="en-US"
      name="due"
      defaultValue="2026-03-14"
      fixedWeeks
    >
      <div {...s.control}>
        <DatePicker.Field {...s.field} aria-label="Due date">
          <DatePicker.Segments>
            {(segment) => (
              <DatePicker.Segment {...s.segment} segment={segment} />
            )}
          </DatePicker.Segments>
          <DatePicker.Input />
        </DatePicker.Field>
        <DatePicker.Trigger {...s.trigger} aria-label="Pick a day">
          ▾
        </DatePicker.Trigger>
      </div>
      <DatePicker.Portal>
        <DatePicker.Positioner sideOffset={4}>
          <DatePicker.Popup {...s.popup} aria-label="Calendar">
            <DatePicker.Calendar>
              <div {...s.header}>
                <DatePicker.Previous {...s.nav} aria-label="Previous month">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M10 4l-4 4 4 4" />
                  </svg>
                </DatePicker.Previous>
                <DatePicker.Heading {...s.heading} />
                <DatePicker.Next {...s.nav} aria-label="Next month">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </DatePicker.Next>
              </div>
              <DatePicker.Grid {...s.grid}>
                <thead>
                  <tr>
                    <DatePicker.Weekdays>
                      {(weekday) => (
                        <DatePicker.HeadCell {...s.weekday} weekday={weekday}>
                          {weekday.short}
                        </DatePicker.HeadCell>
                      )}
                    </DatePicker.Weekdays>
                  </tr>
                </thead>
                <tbody>
                  <DatePicker.Weeks>
                    {(week) => (
                      <tr>
                        {week.map((day) => (
                          <DatePicker.Cell
                            {...s.cell}
                            key={day.date}
                            date={day.date}
                          >
                            <DatePicker.Day {...s.day} date={day.date}>
                              {day.label}
                            </DatePicker.Day>
                          </DatePicker.Cell>
                        ))}
                      </tr>
                    )}
                  </DatePicker.Weeks>
                </tbody>
              </DatePicker.Grid>
            </DatePicker.Calendar>
          </DatePicker.Popup>
        </DatePicker.Positioner>
      </DatePicker.Portal>
    </DatePicker.Root>
  )
}
