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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../../ui/field"
import { Input } from "../../../ui/input"
import { NativeSelect, NativeSelectOption } from "../../../ui/native-select"
import { Textarea } from "../../../ui/textarea"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { containerSize } from "../../../../../core/scales"

const styles = {
  card: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.md },
  }),
  button: css({
    width: { [axes.style.sera]: "100%" },
  }),
}

export function GithubProfile() {
  return (
    <Card sx={styles.card}>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Manage your profile information.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="profile">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" placeholder="shadcn" />
              <FieldDescription>
                Your name may appear around GitHub where you contribute or are
                mentioned. You can remove it at any time.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Public Email</FieldLabel>
              <NativeSelect id="email">
                <NativeSelectOption value="m@shadcn.com">
                  m@shadcn.com
                </NativeSelectOption>
                <NativeSelectOption value="m@gmail.com">
                  m@gmail.com
                </NativeSelectOption>
              </NativeSelect>
              <FieldDescription>
                You can manage verified email addresses in your{" "}
                <a href="#email-settings">email settings</a>.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                placeholder="Tell us a little bit about yourself"
              />
              <FieldDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="profile" sx={styles.button}>
          Save Profile
        </Button>
      </CardFooter>
    </Card>
  )
}
