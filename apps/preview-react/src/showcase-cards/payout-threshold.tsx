import { IconPlaceholder } from "@workspace/registry/icons/icon-placeholder"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/react-base/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/registry/bases/react-base/ui/field"
import { Progress } from "@workspace/registry/bases/react-base/ui/progress"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/registry/bases/react-base/ui/select"
import { Textarea } from "@workspace/registry/bases/react-base/ui/textarea"
import { css } from "@kirana-style/core"
import { theme } from "@workspace/registry/core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/registry/core/scales"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  selectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  div: css({
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  }),
  span: css({
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  textarea: css({
    minHeight: { "*": null, base: "100px" },
  }),
  button2: css({
    width: { "*": null, base: "100%" },
  }),
}

const CURRENCIES = [
  { label: "USD — United States Dollar", value: "usd" },
  { label: "EUR — Euro", value: "eur" },
  { label: "GBP — British Pound", value: "gbp" },
  { label: "JPY — Japanese Yen", value: "jpy" },
]

export function PayoutThreshold() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Threshold</CardTitle>
        <CardDescription>
          Set the minimum balance required before a payout is triggered.
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            sx={styles.button}
            aria-label="Dismiss payout threshold"
          >
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
            <FieldLabel htmlFor="preferred-currency">
              Preferred Currency
            </FieldLabel>
            <Select items={CURRENCIES} defaultValue="usd">
              <SelectTrigger id="preferred-currency" sx={styles.selectTrigger}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CURRENCIES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <div sx={styles.div}>
              <FieldLabel id="min-payout-label">
                Minimum Payout Amount
              </FieldLabel>
              <span sx={styles.span}>$2500.00</span>
            </div>
            <Progress
              value={25}
              aria-labelledby="min-payout-label"
              aria-valuetext="$2,500 of $10,000"
            />
            <div sx={styles.div2}>
              <FieldDescription>$50 (MIN)</FieldDescription>
              <FieldDescription>$10,000 (MAX)</FieldDescription>
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="payout-notes">Notes</FieldLabel>
            <Textarea
              id="payout-notes"
              placeholder="Add any notes for this payout configuration..."
              sx={styles.textarea}
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button2}>Save Threshold</Button>
      </CardFooter>
    </Card>
  )
}
