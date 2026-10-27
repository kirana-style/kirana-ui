/** Upstream's home card: a form in a card, Field and Input. */
import { css } from "@kirana-style/core"

import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@workspace/registry/bases/react-base/ui/field"
import { Input } from "@workspace/registry/bases/react-base/ui/input"
import { shared } from "./shared"
import { space } from "@workspace/registry/core/scales"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/react-base/ui/card"

const styles = {
  footerColumn: css({ flexDirection: "column", gap: space[2] }),
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
          <div sx={shared.pair}>
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
      <CardFooter sx={styles.footerColumn}>
        <Button sx={shared.full}>Create Goal</Button>
        <Button variant="outline" sx={shared.full}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}
