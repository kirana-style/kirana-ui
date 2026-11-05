import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { example } from "../../../../styles/example.styles"
import { space } from "../../../../core/scales"
import { Example } from "../../components/example"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "../../ui/combobox"
import { Field, FieldDescription, FieldError, FieldLabel } from "../../ui/field"

const styles = {
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

@Component({
  selector: "kui-combobox-multiple-invalid",
  imports: [
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    Example,
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="Combobox Multiple Invalid">
      <div [sx]="[styles.flexCol4, example.row]">
        <ng-container
          kuiCombobox
          multiple
          autoHighlight
          [items]="frameworks"
          [defaultValue]="[frameworks[0], frameworks[1]]"
        >
          <div kuiComboboxChips>
            <kui-combobox-value>
              <ng-template let-values>
                @for (value of values; track value) {
                  <div kuiComboboxChip [value]="value">{{ value }}</div>
                }
                <input kuiComboboxChipsInput aria-invalid="true" />
              </ng-template>
            </kui-combobox-value>
          </div>
          <div kuiComboboxContent>
            <div kuiComboboxEmpty>No items found.</div>
            <div kuiComboboxList>
              <ng-template let-item>
                <div kuiComboboxItem [value]="item">{{ item }}</div>
              </ng-template>
            </div>
          </div>
        </ng-container>
        <div kuiField data-invalid="true">
          <label kuiFieldLabel for="combobox-multiple-invalid"
            >Frameworks</label
          >
          <ng-container
            kuiCombobox
            multiple
            autoHighlight
            [items]="frameworks"
            [defaultValue]="[frameworks[0], frameworks[1], frameworks[2]]"
          >
            <div kuiComboboxChips>
              <kui-combobox-value>
                <ng-template let-values>
                  @for (value of values; track value) {
                    <div kuiComboboxChip [value]="value">{{ value }}</div>
                  }
                  <input
                    kuiComboboxChipsInput
                    id="combobox-multiple-invalid"
                    aria-invalid="true"
                  />
                </ng-template>
              </kui-combobox-value>
            </div>
            <div kuiComboboxContent>
              <div kuiComboboxEmpty>No items found.</div>
              <div kuiComboboxList>
                <ng-template let-item>
                  <div kuiComboboxItem [value]="item">{{ item }}</div>
                </ng-template>
              </div>
            </div>
          </ng-container>
          <p kuiFieldDescription>Please select at least one framework.</p>
          <div
            kuiFieldError
            [errors]="[{ message: 'This field is required.' }]"
          ></div>
        </div>
      </div>
    </div>
  `,
})
export class ComboboxMultipleInvalid {
  protected readonly styles = styles
  protected readonly frameworks = frameworks
  protected readonly example = example
}
