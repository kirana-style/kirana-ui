"use client"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Slider } from "../../../ui/slider"
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div: css({
    display: "flex",
    height: space[32],
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: radius.lg,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    backgroundColor: theme.muted,
  }),
  div2: css({
    backgroundColor: theme.mutedForeground,
    transitionDuration: duration[300],
    transitionProperty: "all",
    transitionTimingFunction: easing.inOut,
  }),
  div3: css({
    display: "flex",
    alignItems: "center",
    gap: space[3],
  }),
  span: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  slider: css({
    flex: "1 1 0%",
  }),
  span2: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  toggleGroup: css({
    width: "100%",
  }),
  toggleGroupItem: css({
    flex: "1 1 0%",
  }),
  toggleGroupItem2: css({
    flex: "1 1 0%",
  }),
  toggleGroupItem3: css({
    flex: "1 1 0%",
  }),
}

export function RollerShades() {
  const [position, setPosition] = React.useState([50])

  const preset =
    position[0] <= 10 ? "open" : position[0] >= 90 ? "closed" : "half"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Living Room</CardTitle>
        <CardDescription>Roller Shades</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.div}>
          <div sx={styles.div2} style={{ height: `${position[0]}%` }} />
        </div>
        <div sx={styles.div3}>
          <span sx={styles.span}>Open</span>
          <Slider
            value={position}
            onChange={(value) =>
              setPosition(Array.isArray(value) ? [...value] : [value])
            }
            maxValue={100}
            sx={styles.slider}
          />
          <span sx={styles.span2}>Close</span>
        </div>
      </CardContent>
      <CardFooter>
        <ToggleGroup
          selectedKeys={[preset]}
          onSelectionChange={(value) => {
            const v = Array.from(value)[0]
            if (v === "open") setPosition([0])
            if (v === "half") setPosition([50])
            if (v === "closed") setPosition([100])
          }}
          variant="outline"
          spacing={1}
          sx={styles.toggleGroup}
        >
          <ToggleGroupItem id="open" sx={styles.toggleGroupItem}>
            Open
          </ToggleGroupItem>
          <ToggleGroupItem id="half" sx={styles.toggleGroupItem2}>
            Half
          </ToggleGroupItem>
          <ToggleGroupItem id="closed" sx={styles.toggleGroupItem3}>
            Closed
          </ToggleGroupItem>
        </ToggleGroup>
      </CardFooter>
    </Card>
  )
}
