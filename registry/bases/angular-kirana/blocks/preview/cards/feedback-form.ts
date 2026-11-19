import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { Button } from "../../../ui/button"
import { Card, CardContent, CardFooter } from "../../../ui/card"
import { Field, FieldGroup, FieldLabel } from "../../../ui/field"
import { NativeSelect, NativeSelectOption } from "../../../ui/native-select"
import { Textarea } from "../../../ui/textarea"

const styles = {
  button: css({
    width: { [axes.style.sera]: "100%" },
  }),
}

@Component({
  selector: "kui-feedback-form",
  imports: [
    Button,
    Card,
    CardContent,
    CardFooter,
    Field,
    FieldGroup,
    FieldLabel,
    NativeSelect,
    NativeSelectOption,
    Textarea,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent>
        <form id="feedback-form">
          <div kuiFieldGroup>
            <div kuiField>
              <label kuiFieldLabel for="topic">Topic</label>
              <div kuiNativeSelect id="topic">
                <option kuiNativeSelectOption value="">Select a topic</option>
                <option kuiNativeSelectOption value="ai">AI</option>
                <option
                  kuiNativeSelectOption
                  value="accounts-and-access-controls"
                >
                  Accounts and Access Controls
                </option>
                <option kuiNativeSelectOption value="billing">Billing</option>
                <option kuiNativeSelectOption value="cdn">
                  CDN (Firewall, Caching)
                </option>
                <option kuiNativeSelectOption value="ci-cd">
                  CI/CD (Builds, Deployments, Environment Variables)
                </option>
                <option kuiNativeSelectOption value="dashboard-interface">
                  Dashboard Interface (Navigation, UI Issues)
                </option>
                <option kuiNativeSelectOption value="domains">Domains</option>
                <option kuiNativeSelectOption value="frameworks">
                  Frameworks
                </option>
                <option
                  kuiNativeSelectOption
                  value="marketplace-and-integrations"
                >
                  Marketplace and Integrations
                </option>
                <option kuiNativeSelectOption value="observability">
                  Observability (Observability, Logs, Monitoring)
                </option>
                <option kuiNativeSelectOption value="storage">Storage</option>
              </div>
            </div>
            <div kuiField>
              <label kuiFieldLabel for="feedback">Feedback</label>
              <textarea
                kuiTextarea
                id="feedback"
                placeholder="Your feedback helps us improve..."
              ></textarea>
            </div>
          </div>
        </form>
      </div>
      <div kuiCardFooter>
        <button
          kuiButton
          type="submit"
          form="feedback-form"
          [sx]="styles.button"
        >
          Submit
        </button>
      </div>
    </div>
  `,
})
export class FeedbackForm {
  protected readonly styles = styles
}
