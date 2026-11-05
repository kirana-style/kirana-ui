import { For } from "solid-js"
import { Button } from "@workspace/registry/bases/solid-ark/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/solid-ark/ui/card.tsx"
import { Checkbox } from "@workspace/registry/bases/solid-ark/ui/checkbox.tsx"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/registry/bases/solid-ark/ui/field.tsx"
import { css } from "@kirana-style/core"

export default function NotificationSettings() {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose which email and push alerts you want to receive.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <For each={NOTIFICATIONS}>
            {(n) => (
              <Field orientation="horizontal">
                <Checkbox
                  id={`notify-${n.id}`}
                  defaultChecked={n.defaultChecked}
                />
                <FieldContent>
                  <FieldLabel for={`notify-${n.id}`}>{n.label}</FieldLabel>
                  <FieldDescription>{n.description}</FieldDescription>
                </FieldContent>
              </Field>
            )}
          </For>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button}>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}
