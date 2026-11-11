<script lang="ts">
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

  let checked = $state<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, n.defaultChecked]))
  )
  const allChecked = $derived.by(() => NOTIFICATIONS.every((n) => checked[n.id])
  )
  const someChecked = $derived.by(
    () => NOTIFICATIONS.some((n) => checked[n.id]) && !allChecked
  )
  const handleSelectAll = (value: boolean) => {
    checked = Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, value]))
  }
  const handleToggle = (id: string, value: boolean) => {
    checked = { ...checked, [id]: value }
  }
  type CheckedChange = { checked: boolean | "indeterminate" }
</script>

<Card>
  <CardHeader>
    <CardTitle>
      Notifications
    </CardTitle>
    <CardDescription>
      Choose what you want to be notified about.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="notify-all" checked={someChecked ? 'indeterminate' : allChecked} onCheckedChange={
              (d: CheckedChange) => handleSelectAll(d.checked === true)
            } />
        <FieldContent>
          <FieldLabel for="notify-all">
            Select all
          </FieldLabel>
        </FieldContent>
      </Field>
      {#each NOTIFICATIONS as n (n.id)}
        <Field orientation="horizontal">
          <Checkbox id={`notify-${n.id}`} checked={checked[n.id]} onCheckedChange={
              (d: CheckedChange) => handleToggle(n.id, d.checked === true)
            } />
          <FieldContent>
            <FieldLabel for={`notify-${n.id}`}>
              {n.label}
            </FieldLabel>
            <FieldDescription>
              {n.description}
            </FieldDescription>
          </FieldContent>
        </Field>
      {/each}
    </FieldGroup>
  </CardContent>
  <CardFooter>
    <Button sx={styles.button}>
      Save Preferences
    </Button>
  </CardFooter>
</Card>
