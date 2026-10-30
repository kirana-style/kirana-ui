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
import { Textarea } from "../../../ui/textarea"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { space } from "../../../../../core/scales"

const styles = {
  div: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[3],
  }),
  selectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  selectTrigger2: css({
    width: { "*": null, base: "100%" },
  }),
  textarea: css({
    minHeight: { "*": null, base: space[24] },
    resize: { "*": null, base: "none" },
  }),
  field: css({
    justifyContent: {
      base: "flex-end",
      [axes.style.sera]: "center",
    },
  }),
  button: css({
    flex: { [axes.style.sera]: "1 1 0%" },
  }),
  button2: css({
    flex: { [axes.style.sera]: "1 1 0%" },
  }),
}

export function ReportBug() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Bug</CardTitle>
        <CardDescription>Help us fix issues faster.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="bug-title">Title</FieldLabel>
            <Input
              id="bug-title"
              placeholder="Brief description of the issue"
            />
          </Field>
          <div sx={styles.div}>
            <Field>
              <FieldLabel htmlFor="bug-severity">Severity</FieldLabel>
              <Select defaultValue="medium">
                <SelectTrigger id="bug-severity" sx={styles.selectTrigger}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem id="critical">Critical</SelectItem>
                    <SelectItem id="high">High</SelectItem>
                    <SelectItem id="medium">Medium</SelectItem>
                    <SelectItem id="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="bug-component">Component</FieldLabel>
              <Select defaultValue="dashboard">
                <SelectTrigger id="bug-component" sx={styles.selectTrigger2}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem id="dashboard">Dashboard</SelectItem>
                    <SelectItem id="auth">Auth</SelectItem>
                    <SelectItem id="api">API</SelectItem>
                    <SelectItem id="billing">Billing</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="bug-steps">Steps to reproduce</FieldLabel>
            <Textarea
              id="bug-steps"
              placeholder="1. Go to&#10;2. Click on&#10;3. Observe..."
              sx={styles.textarea}
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" sx={styles.field}>
          <Button variant="outline" sx={styles.button}>
            Attach File
          </Button>
          <Button sx={styles.button2}>Submit Bug</Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
