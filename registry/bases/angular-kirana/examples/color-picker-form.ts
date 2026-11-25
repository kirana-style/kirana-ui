import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  ColorPicker,
  ColorPickerContent,
  ColorPickerTrigger,
} from "../ui/color-picker"
import { Field, FieldDescription, FieldLabel } from "../ui/field"

const styles = {
  form: css({
    display: "grid",
    width: "100%",
    maxWidth: containerSize.xs,
    gap: space[4],
  }),
  submit: css({ justifySelf: "start" }),
}

@Component({
  selector: "color-picker-form",
  imports: [
    Button,
    ColorPicker,
    ColorPickerContent,
    ColorPickerTrigger,
    Field,
    FieldDescription,
    FieldLabel,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <form [sx]="styles.form" (submit)="save($event)">
        <div kuiField>
          <label kuiFieldLabel for="brand-colour">Brand colour</label>
          <div kuiColorPicker [name]="'brand'" [defaultValue]="'#e11d48'">
            <button kuiColorPickerTrigger id="brand-colour"></button>
            <div kuiColorPickerContent aria-label="Brand colour"></div>
          </div>
          <p kuiFieldDescription>
            {{
              saved() ? "Saved " + saved() + "." : "Used for buttons and links."
            }}
          </p>
        </div>
        <button kuiButton type="submit" [sx]="styles.submit">Save</button>
      </form>
    </div>
  `,
})
export default class ColorPickerForm {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly saved = signal<string | null>(null)

  protected save(event: SubmitEvent) {
    event.preventDefault()
    const data = new FormData(event.currentTarget as HTMLFormElement)
    this.saved.set(String(data.get("brand")))
  }
}
