import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox"
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item"

const styles = {
  p0: css({ padding: { "*": null, base: "0" } }),
  nowrap: css({ whiteSpace: "nowrap" }),
}

const countries = [
  { code: "", value: "", continent: "", label: "Select country" },
  {
    code: "ar",
    value: "argentina",
    label: "Argentina",
    continent: "South America",
  },
  { code: "au", value: "australia", label: "Australia", continent: "Oceania" },
  { code: "br", value: "brazil", label: "Brazil", continent: "South America" },
  { code: "ca", value: "canada", label: "Canada", continent: "North America" },
  { code: "cn", value: "china", label: "China", continent: "Asia" },
  {
    code: "co",
    value: "colombia",
    label: "Colombia",
    continent: "South America",
  },
  { code: "eg", value: "egypt", label: "Egypt", continent: "Africa" },
  { code: "fr", value: "france", label: "France", continent: "Europe" },
  { code: "de", value: "germany", label: "Germany", continent: "Europe" },
  { code: "it", value: "italy", label: "Italy", continent: "Europe" },
  { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
  { code: "ke", value: "kenya", label: "Kenya", continent: "Africa" },
  { code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
  {
    code: "nz",
    value: "new-zealand",
    label: "New Zealand",
    continent: "Oceania",
  },
  { code: "ng", value: "nigeria", label: "Nigeria", continent: "Africa" },
  {
    code: "za",
    value: "south-africa",
    label: "South Africa",
    continent: "Africa",
  },
  { code: "kr", value: "south-korea", label: "South Korea", continent: "Asia" },
  {
    code: "gb",
    value: "united-kingdom",
    label: "United Kingdom",
    continent: "Europe",
  },
  {
    code: "us",
    value: "united-states",
    label: "United States",
    continent: "North America",
  },
]

@Component({
  selector: "combobox-custom",
  imports: [
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container
        kuiCombobox
        [items]="countries.filter((country) => country.code !== '')"
        [itemToStringValue]="(country) => country.label"
      >
        <div kuiComboboxInput placeholder="Search countries..."></div>
        <div kuiComboboxContent>
          <div kuiComboboxEmpty>No countries found.</div>
          <div kuiComboboxList>
            <ng-template let-country>
              <div kuiComboboxItem [value]="country">
                <div kuiItem size="xs" [sx]="styles.p0">
                  <div kuiItemContent>
                    <div kuiItemTitle [sx]="styles.nowrap">
                      {{ country.label }}
                    </div>
                    <p kuiItemDescription>
                      {{ country.continent }}
                      ({{ country.code }})
                    </p>
                  </div>
                </div>
              </div>
            </ng-template>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class ComboboxCustom {
  protected readonly styles = styles
  protected readonly countries = countries
  protected readonly page = page
}
