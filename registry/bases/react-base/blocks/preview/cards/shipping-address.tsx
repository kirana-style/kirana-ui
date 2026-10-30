"use client"

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
import { Field, FieldGroup, FieldLabel } from "../../../ui/field"
import { Input } from "../../../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { css } from "@kirana-style/core"
import { fontWeight } from "../../../../../core/scales"

const styles = {
  fieldGroup: css({
    display: { "*": null, base: "grid" },
    gridTemplateColumns: { "*": null, base: "repeat(2, minmax(0, 1fr))" },
  }),
  selectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  fieldGroup2: css({
    display: { "*": null, base: "grid" },
    gridTemplateColumns: { "*": null, base: "repeat(2, minmax(0, 1fr))" },
  }),
  selectTrigger2: css({
    width: { "*": null, base: "100%" },
  }),
  fieldLabel: css({
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  button: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

export function ShippingAddress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
        <CardDescription>Where should we deliver?</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="shipping-street">Street address</FieldLabel>
            <Input id="shipping-street" placeholder="123 Main Street" />
          </Field>
          <Field>
            <FieldLabel htmlFor="shipping-apt">Apt / Suite</FieldLabel>
            <Input id="shipping-apt" placeholder="Apt 4B" />
          </Field>
          <FieldGroup sx={styles.fieldGroup}>
            <Field>
              <FieldLabel htmlFor="shipping-city">City</FieldLabel>
              <Input id="shipping-city" placeholder="San Francisco" />
            </Field>
            <Field>
              <FieldLabel htmlFor="shipping-state">State</FieldLabel>
              <Select
                items={[
                  { label: "California", value: "CA" },
                  { label: "New York", value: "NY" },
                  { label: "Texas", value: "TX" },
                ]}
                defaultValue="CA"
              >
                <SelectTrigger id="shipping-state" sx={styles.selectTrigger}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <FieldGroup sx={styles.fieldGroup2}>
            <Field>
              <FieldLabel htmlFor="shipping-zip">ZIP Code</FieldLabel>
              <Input id="shipping-zip" placeholder="94102" />
            </Field>
            <Field>
              <FieldLabel htmlFor="shipping-country">Country</FieldLabel>
              <Select
                items={[
                  { label: "United States", value: "US" },
                  { label: "Canada", value: "CA" },
                  { label: "United Kingdom", value: "UK" },
                ]}
                defaultValue="US"
              >
                <SelectTrigger id="shipping-country" sx={styles.selectTrigger2}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <Field orientation="horizontal">
            <Checkbox id="shipping-save" defaultChecked />
            <FieldLabel htmlFor="shipping-save" sx={styles.fieldLabel}>
              Save as default address
            </FieldLabel>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm" sx={styles.button}>
          Save Address
        </Button>
      </CardFooter>
    </Card>
  )
}
