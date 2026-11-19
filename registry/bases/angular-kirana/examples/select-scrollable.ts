import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const styles = {
  wFullMaxW64: css({ width: { "*": null, base: "100%" }, maxWidth: space[64] }),
}

const northAmerica = [
  { label: "Eastern Standard Time", value: "est" },
  { label: "Central Standard Time", value: "cst" },
  { label: "Mountain Standard Time", value: "mst" },
  { label: "Pacific Standard Time", value: "pst" },
  { label: "Alaska Standard Time", value: "akst" },
  { label: "Hawaii Standard Time", value: "hst" },
]

const europeAfrica = [
  { label: "Greenwich Mean Time", value: "gmt" },
  { label: "Central European Time", value: "cet" },
  { label: "Eastern European Time", value: "eet" },
  { label: "Western European Summer Time", value: "west" },
  { label: "Central Africa Time", value: "cat" },
  { label: "East Africa Time", value: "eat" },
]

const asia = [
  { label: "Moscow Time", value: "msk" },
  { label: "India Standard Time", value: "ist" },
  { label: "China Standard Time", value: "cst_china" },
  { label: "Japan Standard Time", value: "jst" },
  { label: "Korea Standard Time", value: "kst" },
  { label: "Indonesia Central Standard Time", value: "ist_indonesia" },
]

const australiaPacific = [
  { label: "Australian Western Standard Time", value: "awst" },
  { label: "Australian Central Standard Time", value: "acst" },
  { label: "Australian Eastern Standard Time", value: "aest" },
  { label: "New Zealand Standard Time", value: "nzst" },
  { label: "Fiji Time", value: "fjt" },
]

const southAmerica = [
  { label: "Argentina Time", value: "art" },
  { label: "Bolivia Time", value: "bot" },
  { label: "Brasilia Time", value: "brt" },
  { label: "Chile Standard Time", value: "clt" },
]

const items = [
  { label: "Select a timezone", value: null },
  ...northAmerica,
  ...europeAfrica,
  ...asia,
  ...australiaPacific,
  ...southAmerica,
]

@Component({
  selector: "select-scrollable",
  imports: [
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiSelect [items]="items">
        <button kuiSelectTrigger [sx]="styles.wFullMaxW64">
          <span kuiSelectValue></span>
        </button>
        <div kuiSelectContent>
          <div kuiSelectGroup>
            <div kuiSelectLabel>North America</div>
            @for (item of northAmerica; track item.value) {
              <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
            }
          </div>
          <div kuiSelectGroup>
            <div kuiSelectLabel>Europe & Africa</div>
            @for (item of europeAfrica; track item.value) {
              <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
            }
          </div>
          <div kuiSelectGroup>
            <div kuiSelectLabel>Asia</div>
            @for (item of asia; track item.value) {
              <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
            }
          </div>
          <div kuiSelectGroup>
            <div kuiSelectLabel>Australia & Pacific</div>
            @for (item of australiaPacific; track item.value) {
              <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
            }
          </div>
          <div kuiSelectGroup>
            <div kuiSelectLabel>South America</div>
            @for (item of southAmerica; track item.value) {
              <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
            }
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class SelectScrollable {
  protected readonly styles = styles
  protected readonly northAmerica = northAmerica
  protected readonly europeAfrica = europeAfrica
  protected readonly asia = asia
  protected readonly australiaPacific = australiaPacific
  protected readonly southAmerica = southAmerica
  protected readonly items = items
  protected readonly page = page
}
