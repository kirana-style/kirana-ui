import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { containerSize } from "../../../../../core/scales"
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

@Component({
  selector: "kui-github-profile",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Input,
    NativeSelect,
    NativeSelectOption,
    Textarea,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard [sx]="styles.card">
      <div kuiCardHeader>
        <div kuiCardTitle>Profile</div>
        <div kuiCardDescription>Manage your profile information.</div>
      </div>
      <div kuiCardContent>
        <form id="profile">
          <div kuiFieldGroup>
            <div kuiField>
              <label kuiFieldLabel for="name">Name</label>
              <input kuiInput id="name" placeholder="shadcn" />
              <p kuiFieldDescription>
                Your name may appear around GitHub where you contribute or are
                mentioned. You can remove it at any time.
              </p>
            </div>
            <div kuiField>
              <label kuiFieldLabel for="email">Public Email</label>
              <div kuiNativeSelect id="email">
                <option kuiNativeSelectOption value="m@shadcn.com">
                  m{{ "@" }}shadcn.com
                </option>
                <option kuiNativeSelectOption value="m@gmail.com">
                  m{{ "@" }}gmail.com
                </option>
              </div>
              <p kuiFieldDescription>
                You can manage verified email addresses in your{{ " " }}
                <a href="#email-settings">email settings</a>
                .
              </p>
            </div>
            <div kuiField>
              <label kuiFieldLabel for="bio">Bio</label>
              <textarea
                kuiTextarea
                id="bio"
                placeholder="Tell us a little bit about yourself"
              ></textarea>
              <p kuiFieldDescription>
                You can
                <span>{{ "@" }}mention</span>
                other users and organizations to link to them.
              </p>
            </div>
          </div>
        </form>
      </div>
      <div kuiCardFooter>
        <button kuiButton form="profile" [sx]="styles.button">
          Save Profile
        </button>
      </div>
    </div>
  `,
})
export class GithubProfile {
  protected readonly styles = styles
}
