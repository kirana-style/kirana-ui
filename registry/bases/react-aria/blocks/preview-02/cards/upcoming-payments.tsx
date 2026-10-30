"use client"

import * as React from "react"
import { getLocalTimeZone, today } from "@internationalized/date"
import type { CalendarDate } from "@internationalized/date"

import { Badge } from "../../../ui/badge"
import { Calendar } from "../../../ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "../../../ui/item"
import { css } from "@kirana-style/core"
import { calendarCtx } from "../../../../../core/context"
import { axes } from "../../../../../core/axes"
import { breakpoint, space, spacing } from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  item: css({
    justifyContent: { "*": null, base: "center" },
  }),
  calendar: css({
    width: { "*": null, base: "100%" },
    [calendarCtx.cellSize]: {
      "*": null,
      base: spacing(8),
      [breakpoint.md]: spacing(10),
      [axes.style.sera]: {
        [breakpoint.md]: spacing(9),
      },
    },
  }),
  itemGroup: css({
    width: { "*": null, base: "100%" },
  }),
}

export function UpcomingPayments() {
  const [date, setDate] = React.useState<CalendarDate | undefined>(
    today(getLocalTimeZone())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
        <CardDescription>
          Select a date to view scheduled payments.
        </CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <Item variant="outline" sx={styles.item}>
          <Calendar value={date} onChange={setDate} sx={styles.calendar} />
        </Item>
        <ItemGroup sx={styles.itemGroup}>
          <Item variant="muted">
            <ItemContent>
              <ItemTitle>Netflix Subscription</ItemTitle>
              <ItemDescription>Apr 15, 2024</ItemDescription>
            </ItemContent>
            <Badge variant="secondary">$19.99</Badge>
          </Item>
          <Item variant="muted">
            <ItemContent>
              <ItemTitle>Rent Payment</ItemTitle>
              <ItemDescription>Apr 1, 2024</ItemDescription>
            </ItemContent>
            <Badge variant="secondary">$2,400.00</Badge>
          </Item>
          <Item variant="muted">
            <ItemContent>
              <ItemTitle>Auto Insurance</ItemTitle>
              <ItemDescription>Apr 22, 2024</ItemDescription>
            </ItemContent>
            <Badge variant="secondary">$186.00</Badge>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
