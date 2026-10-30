"use client"

import { Button } from "../../../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "../../../ui/field"
import { Input } from "../../../ui/input"
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { breakpoint, space } from "../../../../../core/scales"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  radioGroup: css({
    display: { "*": null, base: "grid" },
    gridTemplateColumns: {
      base: "repeat(1, minmax(0, 1fr))",
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
      [axes.style.sera]: "repeat(1, minmax(0, 1fr))",
    },
    alignItems: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space[3] },
  }),
  field: css({
    paddingBottom: { "*": null, base: space["2.5"] },
  }),
  field2: css({
    paddingBottom: { "*": null, base: space["2.5"] },
  }),
  fieldDescription: css({
    WebkitLineClamp: { "*": null, base: "1" },
    WebkitBoxOrient: { "*": null, base: "vertical" },
    display: { "*": null, base: "-webkit-box" },
    overflow: { "*": null, base: "hidden" },
  }),
  button2: css({
    width: { "*": null, base: "100%" },
  }),
}

export function ReceivingMethod() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Payout Preferences</CardDescription>
        <CardTitle>Receiving Method</CardTitle>
        <CardAction>
          <Button variant="ghost" size="icon-sm" sx={styles.button}>
            <IconPlaceholder
              lucide="XIcon"
              tabler="IconX"
              hugeicons="Cancel01Icon"
              phosphor="XIcon"
              remixicon="RiCloseLine"
            />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="account-holder">
              Account Holder Name
            </FieldLabel>
            <Input
              id="account-holder"
              defaultValue="Synthetic Horizons Music LLC"
            />
          </Field>
          <FieldSet>
            <FieldLegend variant="label">Receiving Method</FieldLegend>
            <RadioGroup defaultValue="bank" sx={styles.radioGroup}>
              <FieldLabel htmlFor="method-bank">
                <Field orientation="horizontal" sx={styles.field}>
                  <RadioGroupItem value="bank" id="method-bank" />
                  <FieldContent>
                    <FieldTitle>Bank Transfer</FieldTitle>
                    <FieldDescription>SWIFT / IBAN</FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="method-paypal">
                <Field orientation="horizontal" sx={styles.field2}>
                  <RadioGroupItem value="paypal" id="method-paypal" />
                  <FieldContent>
                    <FieldTitle>PayPal</FieldTitle>
                    <FieldDescription sx={styles.fieldDescription}>
                      Instant Payout
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
            </RadioGroup>
          </FieldSet>
          <Field>
            <FieldLabel htmlFor="iban">IBAN / Account Number</FieldLabel>
            <Input id="iban" placeholder="DE89 3704 0044 ...." />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button2} disabled>
          Save Payout Settings
        </Button>
      </CardFooter>
    </Card>
  )
}
