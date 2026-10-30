"use client"

import * as React from "react"

import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import { fontSize, lineHeight, space } from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div: css({
    display: "grid",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    gap: space["1.5"],
  }),
  div2: css({
    borderRadius: radius.md,
    padding: space["1.5"],
    textAlign: "center",
    boxShadow: `0 0 0 1px ${theme.border}`,
  }),
  div3: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  div4: css({
    position: "relative",
    marginTop: space[1],
    height: space[16],
    overflow: "hidden",
    borderRadius: radius.sm,
    backgroundColor: theme.muted,
  }),
  div5: css({
    position: "absolute",
    insetInline: space["0"],
    bottom: space["0"],
    borderRadius: radius.sm,
    backgroundColor: theme.chart3,
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

const FITNESS_WEEKLY_LOAD = [
  { day: "M", load: 84 },
  { day: "T", load: 52 },
  { day: "W", load: 73 },
  { day: "T", load: 66 },
  { day: "F", load: 91 },
  { day: "S", load: 48 },
  { day: "S", load: 61 },
]

export function WeeklyFitnessSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Fitness Summary</CardTitle>
        <CardDescription>Calories and workout load by day</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.div}>
          {FITNESS_WEEKLY_LOAD.map((day, index) => (
            <div key={`${day.day}-${index}`} sx={styles.div2}>
              <div sx={styles.div3}>{day.day}</div>
              <div sx={styles.div4}>
                <div
                  sx={styles.div5}
                  style={
                    {
                      height: `${day.load}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button}>View details</Button>
      </CardFooter>
    </Card>
  )
}
