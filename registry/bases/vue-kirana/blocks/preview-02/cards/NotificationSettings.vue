<script setup lang="ts">
import { computed, ref } from "vue"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Checkbox } from "../../../ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../../ui/field"
import { css } from "@kirana-style/core"

const styles = {
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

const NOTIFICATIONS = [
  {
    id: "transactions",
    label: "Transaction alerts",
    description: "Deposits, withdrawals, and transfers.",
    defaultChecked: true,
  },
  {
    id: "security",
    label: "Security alerts",
    description: "Login attempts and account changes.",
    defaultChecked: true,
  },
  {
    id: "goals",
    label: "Goal milestones",
    description: "Updates at 25%, 50%, 75%, and 100%.",
    defaultChecked: false,
  },
  {
    id: "market",
    label: "Market updates",
    description: "Daily portfolio summary and price alerts.",
    defaultChecked: false,
  },
]

const checked = ref<Record<string, boolean>>(
  Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, n.defaultChecked]))
)
const allChecked = computed(() =>
  NOTIFICATIONS.every((n) => checked.value[n.id])
)
const someChecked = computed(
  () => NOTIFICATIONS.some((n) => checked.value[n.id]) && !allChecked.value
)
const handleSelectAll = (value: boolean) => {
  checked.value = Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, value]))
}
const handleToggle = (id: string, value: boolean) => {
  checked.value = { ...checked.value, [id]: value }
}
type CheckedChange = { checked: boolean | "indeterminate" }
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle> Notifications </CardTitle>
      <CardDescription>
        Choose what you want to be notified about.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field orientation="horizontal">
          <Checkbox
            id="notify-all"
            :checked="someChecked ? 'indeterminate' : allChecked"
            @checked-change="
              (d: CheckedChange) => handleSelectAll(d.checked === true)
            "
          />
          <FieldContent>
            <FieldLabel for="notify-all"> Select all </FieldLabel>
          </FieldContent>
        </Field>
        <Field v-for="n in NOTIFICATIONS" :key="n.id" orientation="horizontal">
          <Checkbox
            :id="`notify-${n.id}`"
            :checked="checked[n.id]"
            @checked-change="
              (d: CheckedChange) => handleToggle(n.id, d.checked === true)
            "
          />
          <FieldContent>
            <FieldLabel :for="`notify-${n.id}`">
              {{ n.label }}
            </FieldLabel>
            <FieldDescription>
              {{ n.description }}
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter>
      <Button :sx="styles.button"> Save Preferences </Button>
    </CardFooter>
  </Card>
</template>
