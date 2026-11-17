"use client"

import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Field, FieldGroup, FieldLabel } from "../../../ui/field"
import { Input } from "../../../ui/input"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"

const styles = {
  div: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[3],
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
  button2: css({
    width: { "*": null, base: "100%" },
  }),
}

export function NewMilestone() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set a new milestone</CardTitle>
        <CardDescription>
          Define your financial target and we&apos;ll help you pace your
          savings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="goal-name">Goal Name</FieldLabel>
            <Input
              id="goal-name"
              placeholder="e.g. New Car, Home Downpayment"
            />
          </Field>
          <div sx={styles.div}>
            <Field>
              <FieldLabel htmlFor="target-amount">Target Amount</FieldLabel>
              <Input id="target-amount" defaultValue="$15,000" />
            </Field>
            <Field>
              <FieldLabel htmlFor="target-date">Target Date</FieldLabel>
              <Input id="target-date" defaultValue="Dec 2025" />
            </Field>
          </div>
        </FieldGroup>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <Button sx={styles.button}>Create Goal</Button>
        <Button variant="outline" sx={styles.button2}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}
