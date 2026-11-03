<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert"
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
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle> Book Appointment </CardTitle>
      <CardDescription> Dr. Sarah Chen · Cardiology </CardDescription>
    </CardHeader>
    <CardContent :sx="styles.cardContent">
      <FieldGroup>
        <Field>
          <FieldLabel> Available on March 18, 2026 </FieldLabel>
          <ToggleGroup :spacing="2" :default-value="['slot-0']">
            <ToggleGroupItem
              v-for="(time, index) in [
                '9:00 AM',
                '10:30 AM',
                '11:00 AM',
                '1:30 PM',
              ]"
              :key="time"
              :value="`slot-${index}`"
            >
              {{ time }}
            </ToggleGroupItem>
          </ToggleGroup>
        </Field>
      </FieldGroup>
      <Alert>
        <AlertTitle> New patient? </AlertTitle>
        <AlertDescription> Please arrive 15 minutes early. </AlertDescription>
      </Alert>
    </CardContent>
    <CardFooter>
      <Button :sx="styles.button"> Book Appointment </Button>
    </CardFooter>
  </Card>
</template>
