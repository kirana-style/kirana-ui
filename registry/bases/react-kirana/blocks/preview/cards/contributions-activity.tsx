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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../../../ui/field"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { axes } from "../../../../../core/axes"

const styles = {
  fieldLegend: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  button: css({
    width: { [axes.style.sera]: "100%" },
  }),
}

export function ContributionsActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contributions & Activity</CardTitle>
        <CardDescription>
          Manage your contributions and activity visibility.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="contributions-activity">
          <FieldGroup>
            <FieldSet>
              <FieldLegend sx={styles.fieldLegend}>
                Contributions & activity
              </FieldLegend>
              <FieldGroup>
                <Field orientation="horizontal">
                  <Checkbox id="activity-private-profile" />
                  <FieldContent>
                    <FieldLabel htmlFor="activity-private-profile">
                      Make profile private and hide activity
                    </FieldLabel>
                    <FieldDescription>
                      Enabling this will hide your contributions and activity
                      from your GitHub profile and from social features like
                      followers, stars, feeds, leaderboards and releases.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="contributions-activity" sx={styles.button}>
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}
