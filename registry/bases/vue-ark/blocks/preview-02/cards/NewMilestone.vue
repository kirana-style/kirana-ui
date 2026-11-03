<script setup lang="ts">
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
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle> Set a new milestone </CardTitle>
      <CardDescription>
        Define your financial target and we&apos;ll help you pace your savings.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field>
          <FieldLabel for="goal-name"> Goal Name </FieldLabel>
          <Input id="goal-name" placeholder="e.g. New Car, Home Downpayment" />
        </Field>
        <div :sx="styles.div">
          <Field>
            <FieldLabel for="target-amount"> Target Amount </FieldLabel>
            <Input id="target-amount" value="$15,000" />
          </Field>
          <Field>
            <FieldLabel for="target-date"> Target Date </FieldLabel>
            <Input id="target-date" value="Dec 2025" />
          </Field>
        </div>
      </FieldGroup>
    </CardContent>
    <CardFooter :sx="styles.cardFooter">
      <Button :sx="styles.button"> Create Goal </Button>
      <Button variant="outline" :sx="styles.button2"> Cancel </Button>
    </CardFooter>
  </Card>
</template>
