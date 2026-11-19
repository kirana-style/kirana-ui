import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { example } from "../../../../styles/example.styles"
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

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

@Component({
  selector: "kui-combobox-multiple-no-remove",
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
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="Combobox Multiple (No Remove)">
      <ng-container
        kuiCombobox
        multiple
        autoHighlight
        [items]="frameworks"
        [defaultValue]="[frameworks[0], frameworks[1]]"
      >
        <div kuiComboboxChips [sx]="example.row">
          <kui-combobox-value>
            <ng-template let-values>
              @for (value of values; track value) {
                <div kuiComboboxChip [value]="value" [showRemove]="false">
                  {{ value }}
                </div>
              }
              <input kuiComboboxChipsInput />
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
    </div>
  `,
})
export class ComboboxMultipleNoRemove {
  protected readonly frameworks = frameworks
  protected readonly example = example
}
