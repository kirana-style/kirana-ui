import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
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
} from "../ui/combobox"
import { InputGroupAddon } from "../ui/input-group"

const styles = {
  w60: css({ width: { "*": null, base: space[60] } }),
}

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
  selector: "combobox-input-group",
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
    InputGroupAddon,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiCombobox [items]="timezones">
        <div kuiComboboxInput placeholder="Select a timezone">
          <div kuiInputGroupAddon>
            <svg
              iconPlaceholder
              lucide="GlobeIcon"
              tabler="IconGlobe"
              hugeicons="Globe02Icon"
              phosphor="GlobeIcon"
              remixicon="RiGlobeLine"
            ></svg>
          </div>
        </div>
        <div kuiComboboxContent [alignOffset]="-28" [sx]="styles.w60">
          <div kuiComboboxEmpty>No timezones found.</div>
          <div kuiComboboxList>
            <ng-template let-group>
              <div kuiComboboxGroup [items]="group.items">
                <div kuiComboboxLabel>{{ group.value }}</div>
                <ng-template kuiComboboxCollection let-item>
                  <div kuiComboboxItem [value]="item">{{ item }}</div>
                </ng-template>
              </div>
            </ng-template>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class ComboboxInputGroup {
  protected readonly styles = styles
  protected readonly timezones = timezones
  protected readonly page = page
}
