import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "../ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}

@Component({
  selector: "field-choice-card",
  imports: [
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
    RadioGroup,
    RadioGroupItem,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.narrow">
        <fieldset kuiFieldSet>
          <legend kuiFieldLegend variant="label">Compute Environment</legend>
          <p kuiFieldDescription>
            Select the compute environment for your cluster.
          </p>
          <div kuiRadioGroup defaultValue="kubernetes">
            <label kuiFieldLabel for="kubernetes-r2h">
              <div kuiField orientation="horizontal">
                <div kuiFieldContent>
                  <div kuiFieldTitle>Kubernetes</div>
                  <p kuiFieldDescription>Run GPU workloads on a K8s cluster.</p>
                </div>
                <span
                  kuiRadioGroupItem
                  value="kubernetes"
                  id="kubernetes-r2h"
                ></span>
              </div>
            </label>
            <label kuiFieldLabel for="vm-z4k">
              <div kuiField orientation="horizontal">
                <div kuiFieldContent>
                  <div kuiFieldTitle>Virtual Machine</div>
                  <p kuiFieldDescription>
                    Access a cluster to run GPU workloads.
                  </p>
                </div>
                <span kuiRadioGroupItem value="vm" id="vm-z4k"></span>
              </div>
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  `,
})
export default class FieldChoiceCard {
  protected readonly styles = styles
  protected readonly page = page
}
