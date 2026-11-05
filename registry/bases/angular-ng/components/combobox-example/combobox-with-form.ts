import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "ngx-sonner"
import { containerSize } from "../../../../core/scales"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import { Card, CardContent, CardFooter } from "../../ui/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../ui/combobox"
import { Field, FieldGroup, FieldLabel } from "../../ui/field"

const styles = {
  wFullMaxWSm: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
  }),
  wFull: css({ width: { "*": null, base: "100%" } }),
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

const handleSubmit = (event: Event) => {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)
  const framework = formData.get("framework") as string
  toast(`You selected ${framework} as your framework.`)
}

@Component({
  selector: "kui-combobox-with-form",
  imports: [
    Button,
    Card,
    CardContent,
    CardFooter,
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    Example,
    Field,
    FieldGroup,
    FieldLabel,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="Form with Combobox">
      <div kuiCard [sx]="styles.wFullMaxWSm" size="sm">
        <div kuiCardContent>
          <form
            id="form-with-combobox"
            [sx]="styles.wFull"
            (submit)="handleSubmit($event)"
          >
            <div kuiFieldGroup>
              <div kuiField>
                <label kuiFieldLabel for="framework">Framework</label>
                <ng-container kuiCombobox [items]="frameworks">
                  <div
                    kuiComboboxInput
                    id="framework"
                    name="framework"
                    placeholder="Select a framework"
                    required
                  ></div>
                  <div kuiComboboxContent>
                    <div kuiComboboxEmpty>No items found.</div>
                    <div kuiComboboxList>
                      <ng-template let-item>
                        <div kuiComboboxItem [value]="item">{{ item }}</div>
                      </ng-template>
                    </div>
                  </div>
                </ng-container>
              </div>
            </div>
          </form>
        </div>
        <div kuiCardFooter>
          <button kuiButton type="submit" form="form-with-combobox">
            Submit
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ComboboxWithForm {
  protected readonly styles = styles
  protected readonly frameworks = frameworks
  protected readonly handleSubmit = handleSubmit
}
