import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
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
} from "../ui/combobox"

const styles = {
  wFullMaxWXs: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.xs,
  }),
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

@Component({
  selector: "combobox-multiple",
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
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container
        kuiCombobox
        multiple
        autoHighlight
        [items]="frameworks"
        [defaultValue]="[frameworks[0]]"
      >
        <div kuiComboboxChips [sx]="styles.wFullMaxWXs">
          <kui-combobox-value>
            <ng-template let-values>
              @for (value of values; track value) {
                <div kuiComboboxChip [value]="value">{{ value }}</div>
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
export default class ComboboxMultiple {
  protected readonly styles = styles
  protected readonly frameworks = frameworks
  protected readonly page = page
}
