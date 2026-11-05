import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
} from "../ui/combobox"

const timezones = [
  {
    value: "Americas",
    items: [
      "(GMT-5) New York",
      "(GMT-8) Los Angeles",
      "(GMT-6) Chicago",
      "(GMT-5) Toronto",
      "(GMT-8) Vancouver",
      "(GMT-3) São Paulo",
    ],
  },
  {
    value: "Europe",
    items: [
      "(GMT+0) London",
      "(GMT+1) Paris",
      "(GMT+1) Berlin",
      "(GMT+1) Rome",
      "(GMT+1) Madrid",
      "(GMT+1) Amsterdam",
    ],
  },
  {
    value: "Asia/Pacific",
    items: [
      "(GMT+9) Tokyo",
      "(GMT+8) Shanghai",
      "(GMT+8) Singapore",
      "(GMT+4) Dubai",
      "(GMT+11) Sydney",
      "(GMT+9) Seoul",
    ],
  },
] as const

@Component({
  selector: "combobox-groups",
  imports: [
    Combobox,
    ComboboxCollection,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxLabel,
    ComboboxList,
    ComboboxSeparator,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiCombobox [items]="timezones">
        <div kuiComboboxInput placeholder="Select a timezone"></div>
        <div kuiComboboxContent>
          <div kuiComboboxEmpty>No timezones found.</div>
          <div kuiComboboxList>
            <ng-template let-group let-index="index">
              <div kuiComboboxGroup [items]="group.items">
                <div kuiComboboxLabel>{{ group.value }}</div>
                <ng-template kuiComboboxCollection let-item>
                  <div kuiComboboxItem [value]="item">{{ item }}</div>
                </ng-template>
                @if (index < timezones.length - 1) {
                  <div kuiComboboxSeparator></div>
                }
              </div>
            </ng-template>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class ComboboxGroups {
  protected readonly timezones = timezones
  protected readonly page = page
}
