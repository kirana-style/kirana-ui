import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field"
import { Input } from "../ui/input"

const styles = {
  wFullMaxWLg: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.lg,
  }),
}

@Component({
  selector: "field-responsive",
  imports: [
    Button,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    Input,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.wFullMaxWLg">
        <form>
          <fieldset kuiFieldSet>
            <legend kuiFieldLegend>Profile</legend>
            <p kuiFieldDescription>Fill in your profile information.</p>
            <div kuiFieldGroup>
              <div kuiField orientation="responsive">
                <div kuiFieldContent>
                  <label kuiFieldLabel for="name">Name</label>
                  <p kuiFieldDescription>
                    Provide your full name for identification
                  </p>
                </div>
                <input kuiInput id="name" placeholder="Evil Rabbit" required />
              </div>
              <div kuiField orientation="responsive">
                <button kuiButton type="submit">Submit</button>
                <button kuiButton type="button" variant="outline">
                  Cancel
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  `,
})
export default class FieldResponsive {
  protected readonly styles = styles
  protected readonly page = page
}
