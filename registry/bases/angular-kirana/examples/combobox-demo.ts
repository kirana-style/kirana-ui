import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

@Component({
  selector: "combobox-demo",
  imports: [
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiCombobox [items]="frameworks">
        <div kuiComboboxInput placeholder="Select a framework"></div>
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
export default class ComboboxDemo {
  protected readonly frameworks = frameworks
  protected readonly page = page
}
