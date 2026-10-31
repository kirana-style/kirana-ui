import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/react-base/ui/card"
import { Checkbox } from "@workspace/registry/bases/react-base/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/registry/bases/react-base/ui/field"
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

export function NotificationSettings() {
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
          {NOTIFICATIONS.map((n) => (
            <Field key={n.id} orientation="horizontal">
              <Checkbox
                id={`notify-${n.id}`}
                defaultChecked={n.defaultChecked}
              />
              <FieldContent>
                <FieldLabel htmlFor={`notify-${n.id}`}>{n.label}</FieldLabel>
                <FieldDescription>{n.description}</FieldDescription>
              </FieldContent>
            </Field>
          ))}
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button}>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}
