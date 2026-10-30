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
  FieldSeparator,
} from "../../../ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { Switch } from "../../../ui/switch"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  selectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  fieldSeparator: css({
    marginBlock: { "*": null, base: `calc(${space[4]} * -1)` },
    display: { [axes.style.sera]: "none" },
  }),
  fieldSeparator2: css({
    marginBlock: { "*": null, base: `calc(${space[4]} * -1)` },
    display: { [axes.style.sera]: "none" },
  }),
  button2: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

const CURRENCIES = [
  { label: "USD — United States Dollar", value: "usd" },
  { label: "EUR — Euro", value: "eur" },
  { label: "GBP — British Pound", value: "gbp" },
  { label: "JPY — Japanese Yen", value: "jpy" },
]

export function Preferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Manage your account settings and notifications.
        </CardDescription>
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
            <FieldLabel htmlFor="default-currency">Default Currency</FieldLabel>
            <Select items={CURRENCIES} defaultValue="usd">
              <SelectTrigger id="default-currency" sx={styles.selectTrigger}>
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
          <FieldSeparator sx={styles.fieldSeparator} />
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="public-statistics">
                Public Statistics
              </FieldLabel>
              <FieldDescription>
                Allow others to see your total stream count and listening
                activity
              </FieldDescription>
            </FieldContent>
            <Switch id="public-statistics" defaultChecked />
          </Field>
          <FieldSeparator sx={styles.fieldSeparator2} />
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="email-notifications">
                Email Notifications
              </FieldLabel>
              <FieldDescription>
                Monthly royalty reports and distribution updates
              </FieldDescription>
            </FieldContent>
            <Switch id="email-notifications" defaultChecked />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Reset</Button>
        <Button sx={styles.button2}>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}
