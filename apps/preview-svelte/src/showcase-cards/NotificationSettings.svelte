<script lang="ts">
  import { Button } from "@workspace/registry/bases/svelte-ark/ui/button/index.ts"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@workspace/registry/bases/svelte-ark/ui/card/index.ts"
  import { Checkbox } from "@workspace/registry/bases/svelte-ark/ui/checkbox/index.ts"
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
  } from "@workspace/registry/bases/svelte-ark/ui/field/index.ts"
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
</script>

<Card>
  <CardHeader>
    <CardTitle>
      Notifications
    </CardTitle>
    <CardDescription>
      Choose which email and push alerts you want to receive.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <FieldGroup>
      {#each NOTIFICATIONS as n (n.id)}
        <Field orientation="horizontal">
          <Checkbox id={`notify-${n.id}`} defaultChecked={n.defaultChecked} />
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
