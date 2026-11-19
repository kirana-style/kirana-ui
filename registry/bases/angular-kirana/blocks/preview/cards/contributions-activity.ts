import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { axes } from "../../../../../core/axes"
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

@Component({
  selector: "kui-contributions-activity",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Contributions & Activity</div>
        <div kuiCardDescription>
          Manage your contributions and activity visibility.
        </div>
      </div>
      <div kuiCardContent>
        <form id="contributions-activity">
          <div kuiFieldGroup>
            <fieldset kuiFieldSet>
              <legend kuiFieldLegend [sx]="styles.fieldLegend">
                Contributions & activity
              </legend>
              <div kuiFieldGroup>
                <div kuiField orientation="horizontal">
                  <span kuiCheckbox id="activity-private-profile"></span>
                  <div kuiFieldContent>
                    <label kuiFieldLabel for="activity-private-profile"
                      >Make profile private and hide activity</label
                    >
                    <p kuiFieldDescription>
                      Enabling this will hide your contributions and activity
                      from your GitHub profile and from social features like
                      followers, stars, feeds, leaderboards and releases.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
      <div kuiCardFooter>
        <button kuiButton form="contributions-activity" [sx]="styles.button">
          Save Changes
        </button>
      </div>
    </div>
  `,
})
export class ContributionsActivity {
  protected readonly styles = styles
}
