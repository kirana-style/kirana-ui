/** Upstream's `preview` block's fitness card: a bar per day, in the third chart colour. */
import { css } from "@kirana-style/core"

import { Button } from "@workspace/registry/bases/react-base/ui/button"
import { shared } from "./shared"
import { fontSize, lineHeight, space } from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/react-base/ui/card"

const styles = {
  week: css({
    display: "grid",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    gap: space["1.5"],
  }),
  day: css({
    borderRadius: radius.md,
    padding: space["1.5"],
    textAlign: "center",
    boxShadow: `0 0 0 1px ${theme.border}`,
  }),
  dayName: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  dayTrack: css({
    position: "relative",
    marginTop: space[1],
    height: space[16],
    overflow: "hidden",
    borderRadius: radius.sm,
    backgroundColor: theme.muted,
  }),
  dayBar: css({
    position: "absolute",
    insetInline: 0,
    bottom: 0,
    borderRadius: radius.sm,
    backgroundColor: theme.chart3,
  }),
}

const WEEK = [
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
      <CardContent>
        <div sx={styles.week}>
          {WEEK.map((day, index) => (
            <div key={index} sx={styles.day}>
              <div sx={styles.dayName}>{day.day}</div>
              <div sx={styles.dayTrack}>
                <div sx={styles.dayBar} style={{ height: `${day.load}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button sx={shared.full}>View details</Button>
      </CardFooter>
    </Card>
  )
}
