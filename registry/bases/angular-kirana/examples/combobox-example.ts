import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { example } from "../../../styles/example.styles"
import { fontWeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
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
  ComboboxTrigger,
  ComboboxValue,
} from "../ui/combobox"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { ComboboxInDialog } from "../components/combobox-example/combobox-in-dialog"
import { ComboboxMultiple } from "../components/combobox-example/combobox-multiple"
import { ComboboxMultipleDisabled } from "../components/combobox-example/combobox-multiple-disabled"
import { ComboboxMultipleInvalid } from "../components/combobox-example/combobox-multiple-invalid"
import { ComboboxMultipleNoRemove } from "../components/combobox-example/combobox-multiple-no-remove"
import { ComboboxWithForm } from "../components/combobox-example/combobox-with-form"

const styles = {
  span2: css({ gridColumn: "span 2 / span 2" }),
  flexWrapCenter2: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: { "*": null, base: space[2] },
  }),
  w32Capitalize: css({
    width: { "*": null, base: space[32] },
    [select.descendant('[data-slot="input-group-control"]')]: {
      textTransform: "capitalize",
    },
  }),
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  w60: css({ width: { "*": null, base: space[60] } }),
  triggerWide: css({
    width: { "*": null, base: space[64] },
    justifyContent: { "*": null, base: "space-between" },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
  nowrap: css({ whiteSpace: "nowrap" }),
  w52: css({ width: { "*": null, base: space[52] } }),
  triggerMuted: css({
    width: { "*": null, base: space[52] },
    justifyContent: { "*": null, base: "space-between" },
    fontWeight: { "*": null, base: fontWeight.normal },
    color: { "*": null, base: theme.mutedForeground },
  }),
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

const countries = [
  { code: "", value: "", continent: "", label: "Select country" },
  { code: "af", value: "afghanistan", label: "Afghanistan", continent: "Asia" },
  { code: "al", value: "albania", label: "Albania", continent: "Europe" },
  { code: "dz", value: "algeria", label: "Algeria", continent: "Africa" },
  { code: "ad", value: "andorra", label: "Andorra", continent: "Europe" },
  { code: "ao", value: "angola", label: "Angola", continent: "Africa" },
  {
    code: "ar",
    value: "argentina",
    label: "Argentina",
    continent: "South America",
  },
  { code: "am", value: "armenia", label: "Armenia", continent: "Asia" },
  { code: "au", value: "australia", label: "Australia", continent: "Oceania" },
  { code: "at", value: "austria", label: "Austria", continent: "Europe" },
  { code: "az", value: "azerbaijan", label: "Azerbaijan", continent: "Asia" },
  {
    code: "bs",
    value: "bahamas",
    label: "Bahamas",
    continent: "North America",
  },
  { code: "bh", value: "bahrain", label: "Bahrain", continent: "Asia" },
  { code: "bd", value: "bangladesh", label: "Bangladesh", continent: "Asia" },
  {
    code: "bb",
    value: "barbados",
    label: "Barbados",
    continent: "North America",
  },
  { code: "by", value: "belarus", label: "Belarus", continent: "Europe" },
  { code: "be", value: "belgium", label: "Belgium", continent: "Europe" },
  { code: "bz", value: "belize", label: "Belize", continent: "North America" },
  { code: "bj", value: "benin", label: "Benin", continent: "Africa" },
  { code: "bt", value: "bhutan", label: "Bhutan", continent: "Asia" },
  {
    code: "bo",
    value: "bolivia",
    label: "Bolivia",
    continent: "South America",
  },
  {
    code: "ba",
    value: "bosnia-and-herzegovina",
    label: "Bosnia and Herzegovina",
    continent: "Europe",
  },
  { code: "bw", value: "botswana", label: "Botswana", continent: "Africa" },
  { code: "br", value: "brazil", label: "Brazil", continent: "South America" },
  { code: "bn", value: "brunei", label: "Brunei", continent: "Asia" },
  { code: "bg", value: "bulgaria", label: "Bulgaria", continent: "Europe" },
  {
    code: "bf",
    value: "burkina-faso",
    label: "Burkina Faso",
    continent: "Africa",
  },
  { code: "bi", value: "burundi", label: "Burundi", continent: "Africa" },
  { code: "kh", value: "cambodia", label: "Cambodia", continent: "Asia" },
  { code: "cm", value: "cameroon", label: "Cameroon", continent: "Africa" },
  { code: "ca", value: "canada", label: "Canada", continent: "North America" },
  { code: "cv", value: "cape-verde", label: "Cape Verde", continent: "Africa" },
  {
    code: "cf",
    value: "central-african-republic",
    label: "Central African Republic",
    continent: "Africa",
  },
  { code: "td", value: "chad", label: "Chad", continent: "Africa" },
  { code: "cl", value: "chile", label: "Chile", continent: "South America" },
  { code: "cn", value: "china", label: "China", continent: "Asia" },
  {
    code: "co",
    value: "colombia",
    label: "Colombia",
    continent: "South America",
  },
  { code: "km", value: "comoros", label: "Comoros", continent: "Africa" },
  { code: "cg", value: "congo", label: "Congo", continent: "Africa" },
  {
    code: "cr",
    value: "costa-rica",
    label: "Costa Rica",
    continent: "North America",
  },
  { code: "hr", value: "croatia", label: "Croatia", continent: "Europe" },
  { code: "cu", value: "cuba", label: "Cuba", continent: "North America" },
  { code: "cy", value: "cyprus", label: "Cyprus", continent: "Asia" },
  {
    code: "cz",
    value: "czech-republic",
    label: "Czech Republic",
    continent: "Europe",
  },
  { code: "dk", value: "denmark", label: "Denmark", continent: "Europe" },
  { code: "dj", value: "djibouti", label: "Djibouti", continent: "Africa" },
  {
    code: "dm",
    value: "dominica",
    label: "Dominica",
    continent: "North America",
  },
  {
    code: "do",
    value: "dominican-republic",
    label: "Dominican Republic",
    continent: "North America",
  },
  {
    code: "ec",
    value: "ecuador",
    label: "Ecuador",
    continent: "South America",
  },
  { code: "eg", value: "egypt", label: "Egypt", continent: "Africa" },
  {
    code: "sv",
    value: "el-salvador",
    label: "El Salvador",
    continent: "North America",
  },
  {
    code: "gq",
    value: "equatorial-guinea",
    label: "Equatorial Guinea",
    continent: "Africa",
  },
  { code: "er", value: "eritrea", label: "Eritrea", continent: "Africa" },
  { code: "ee", value: "estonia", label: "Estonia", continent: "Europe" },
  { code: "et", value: "ethiopia", label: "Ethiopia", continent: "Africa" },
  { code: "fj", value: "fiji", label: "Fiji", continent: "Oceania" },
  { code: "fi", value: "finland", label: "Finland", continent: "Europe" },
  { code: "fr", value: "france", label: "France", continent: "Europe" },
  { code: "ga", value: "gabon", label: "Gabon", continent: "Africa" },
  { code: "gm", value: "gambia", label: "Gambia", continent: "Africa" },
  { code: "ge", value: "georgia", label: "Georgia", continent: "Asia" },
  { code: "de", value: "germany", label: "Germany", continent: "Europe" },
  { code: "gh", value: "ghana", label: "Ghana", continent: "Africa" },
  { code: "gr", value: "greece", label: "Greece", continent: "Europe" },
  {
    code: "gd",
    value: "grenada",
    label: "Grenada",
    continent: "North America",
  },
  {
    code: "gt",
    value: "guatemala",
    label: "Guatemala",
    continent: "North America",
  },
  { code: "gn", value: "guinea", label: "Guinea", continent: "Africa" },
  {
    code: "gw",
    value: "guinea-bissau",
    label: "Guinea-Bissau",
    continent: "Africa",
  },
  { code: "gy", value: "guyana", label: "Guyana", continent: "South America" },
  { code: "ht", value: "haiti", label: "Haiti", continent: "North America" },
  {
    code: "hn",
    value: "honduras",
    label: "Honduras",
    continent: "North America",
  },
  { code: "hu", value: "hungary", label: "Hungary", continent: "Europe" },
  { code: "is", value: "iceland", label: "Iceland", continent: "Europe" },
  { code: "in", value: "india", label: "India", continent: "Asia" },
  { code: "id", value: "indonesia", label: "Indonesia", continent: "Asia" },
  { code: "ir", value: "iran", label: "Iran", continent: "Asia" },
  { code: "iq", value: "iraq", label: "Iraq", continent: "Asia" },
  { code: "ie", value: "ireland", label: "Ireland", continent: "Europe" },
  { code: "il", value: "israel", label: "Israel", continent: "Asia" },
  { code: "it", value: "italy", label: "Italy", continent: "Europe" },
  {
    code: "jm",
    value: "jamaica",
    label: "Jamaica",
    continent: "North America",
  },
  { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
  { code: "jo", value: "jordan", label: "Jordan", continent: "Asia" },
  { code: "kz", value: "kazakhstan", label: "Kazakhstan", continent: "Asia" },
  { code: "ke", value: "kenya", label: "Kenya", continent: "Africa" },
  { code: "kw", value: "kuwait", label: "Kuwait", continent: "Asia" },
  { code: "kg", value: "kyrgyzstan", label: "Kyrgyzstan", continent: "Asia" },
  { code: "la", value: "laos", label: "Laos", continent: "Asia" },
  { code: "lv", value: "latvia", label: "Latvia", continent: "Europe" },
  { code: "lb", value: "lebanon", label: "Lebanon", continent: "Asia" },
  { code: "ls", value: "lesotho", label: "Lesotho", continent: "Africa" },
  { code: "lr", value: "liberia", label: "Liberia", continent: "Africa" },
  { code: "ly", value: "libya", label: "Libya", continent: "Africa" },
  {
    code: "li",
    value: "liechtenstein",
    label: "Liechtenstein",
    continent: "Europe",
  },
  { code: "lt", value: "lithuania", label: "Lithuania", continent: "Europe" },
  { code: "lu", value: "luxembourg", label: "Luxembourg", continent: "Europe" },
  { code: "mg", value: "madagascar", label: "Madagascar", continent: "Africa" },
  { code: "mw", value: "malawi", label: "Malawi", continent: "Africa" },
  { code: "my", value: "malaysia", label: "Malaysia", continent: "Asia" },
  { code: "mv", value: "maldives", label: "Maldives", continent: "Asia" },
  { code: "ml", value: "mali", label: "Mali", continent: "Africa" },
  { code: "mt", value: "malta", label: "Malta", continent: "Europe" },
  {
    code: "mh",
    value: "marshall-islands",
    label: "Marshall Islands",
    continent: "Oceania",
  },
  { code: "mr", value: "mauritania", label: "Mauritania", continent: "Africa" },
  { code: "mu", value: "mauritius", label: "Mauritius", continent: "Africa" },
  { code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
  {
    code: "fm",
    value: "micronesia",
    label: "Micronesia",
    continent: "Oceania",
  },
  { code: "md", value: "moldova", label: "Moldova", continent: "Europe" },
  { code: "mc", value: "monaco", label: "Monaco", continent: "Europe" },
  { code: "mn", value: "mongolia", label: "Mongolia", continent: "Asia" },
  { code: "me", value: "montenegro", label: "Montenegro", continent: "Europe" },
  { code: "ma", value: "morocco", label: "Morocco", continent: "Africa" },
  { code: "mz", value: "mozambique", label: "Mozambique", continent: "Africa" },
  { code: "mm", value: "myanmar", label: "Myanmar", continent: "Asia" },
  { code: "na", value: "namibia", label: "Namibia", continent: "Africa" },
  { code: "nr", value: "nauru", label: "Nauru", continent: "Oceania" },
  { code: "np", value: "nepal", label: "Nepal", continent: "Asia" },
  {
    code: "nl",
    value: "netherlands",
    label: "Netherlands",
    continent: "Europe",
  },
  {
    code: "nz",
    value: "new-zealand",
    label: "New Zealand",
    continent: "Oceania",
  },
  {
    code: "ni",
    value: "nicaragua",
    label: "Nicaragua",
    continent: "North America",
  },
  { code: "ne", value: "niger", label: "Niger", continent: "Africa" },
  { code: "ng", value: "nigeria", label: "Nigeria", continent: "Africa" },
  { code: "kp", value: "north-korea", label: "North Korea", continent: "Asia" },
  {
    code: "mk",
    value: "north-macedonia",
    label: "North Macedonia",
    continent: "Europe",
  },
  { code: "no", value: "norway", label: "Norway", continent: "Europe" },
  { code: "om", value: "oman", label: "Oman", continent: "Asia" },
  { code: "pk", value: "pakistan", label: "Pakistan", continent: "Asia" },
  { code: "pw", value: "palau", label: "Palau", continent: "Oceania" },
  { code: "ps", value: "palestine", label: "Palestine", continent: "Asia" },
  { code: "pa", value: "panama", label: "Panama", continent: "North America" },
  {
    code: "pg",
    value: "papua-new-guinea",
    label: "Papua New Guinea",
    continent: "Oceania",
  },
  {
    code: "py",
    value: "paraguay",
    label: "Paraguay",
    continent: "South America",
  },
  { code: "pe", value: "peru", label: "Peru", continent: "South America" },
  { code: "ph", value: "philippines", label: "Philippines", continent: "Asia" },
  { code: "pl", value: "poland", label: "Poland", continent: "Europe" },
  { code: "pt", value: "portugal", label: "Portugal", continent: "Europe" },
  { code: "qa", value: "qatar", label: "Qatar", continent: "Asia" },
  { code: "ro", value: "romania", label: "Romania", continent: "Europe" },
  { code: "ru", value: "russia", label: "Russia", continent: "Europe" },
  { code: "rw", value: "rwanda", label: "Rwanda", continent: "Africa" },
  { code: "ws", value: "samoa", label: "Samoa", continent: "Oceania" },
  { code: "sm", value: "san-marino", label: "San Marino", continent: "Europe" },
  {
    code: "sa",
    value: "saudi-arabia",
    label: "Saudi Arabia",
    continent: "Asia",
  },
  { code: "sn", value: "senegal", label: "Senegal", continent: "Africa" },
  { code: "rs", value: "serbia", label: "Serbia", continent: "Europe" },
  { code: "sc", value: "seychelles", label: "Seychelles", continent: "Africa" },
  {
    code: "sl",
    value: "sierra-leone",
    label: "Sierra Leone",
    continent: "Africa",
  },
  { code: "sg", value: "singapore", label: "Singapore", continent: "Asia" },
  { code: "sk", value: "slovakia", label: "Slovakia", continent: "Europe" },
  { code: "si", value: "slovenia", label: "Slovenia", continent: "Europe" },
  {
    code: "sb",
    value: "solomon-islands",
    label: "Solomon Islands",
    continent: "Oceania",
  },
  { code: "so", value: "somalia", label: "Somalia", continent: "Africa" },
  {
    code: "za",
    value: "south-africa",
    label: "South Africa",
    continent: "Africa",
  },
  { code: "kr", value: "south-korea", label: "South Korea", continent: "Asia" },
  {
    code: "ss",
    value: "south-sudan",
    label: "South Sudan",
    continent: "Africa",
  },
  { code: "es", value: "spain", label: "Spain", continent: "Europe" },
  { code: "lk", value: "sri-lanka", label: "Sri Lanka", continent: "Asia" },
  { code: "sd", value: "sudan", label: "Sudan", continent: "Africa" },
  {
    code: "sr",
    value: "suriname",
    label: "Suriname",
    continent: "South America",
  },
  { code: "se", value: "sweden", label: "Sweden", continent: "Europe" },
  {
    code: "ch",
    value: "switzerland",
    label: "Switzerland",
    continent: "Europe",
  },
  { code: "sy", value: "syria", label: "Syria", continent: "Asia" },
  { code: "tw", value: "taiwan", label: "Taiwan", continent: "Asia" },
  { code: "tj", value: "tajikistan", label: "Tajikistan", continent: "Asia" },
  { code: "tz", value: "tanzania", label: "Tanzania", continent: "Africa" },
  { code: "th", value: "thailand", label: "Thailand", continent: "Asia" },
  { code: "tl", value: "timor-leste", label: "Timor-Leste", continent: "Asia" },
  { code: "tg", value: "togo", label: "Togo", continent: "Africa" },
  { code: "to", value: "tonga", label: "Tonga", continent: "Oceania" },
  {
    code: "tt",
    value: "trinidad-and-tobago",
    label: "Trinidad and Tobago",
    continent: "North America",
  },
  { code: "tn", value: "tunisia", label: "Tunisia", continent: "Africa" },
  { code: "tr", value: "turkey", label: "Turkey", continent: "Asia" },
  {
    code: "tm",
    value: "turkmenistan",
    label: "Turkmenistan",
    continent: "Asia",
  },
  { code: "tv", value: "tuvalu", label: "Tuvalu", continent: "Oceania" },
  { code: "ug", value: "uganda", label: "Uganda", continent: "Africa" },
  { code: "ua", value: "ukraine", label: "Ukraine", continent: "Europe" },
  {
    code: "ae",
    value: "united-arab-emirates",
    label: "United Arab Emirates",
    continent: "Asia",
  },
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
  {
    code: "uy",
    value: "uruguay",
    label: "Uruguay",
    continent: "South America",
  },
  { code: "uz", value: "uzbekistan", label: "Uzbekistan", continent: "Asia" },
  { code: "vu", value: "vanuatu", label: "Vanuatu", continent: "Oceania" },
  {
    code: "va",
    value: "vatican-city",
    label: "Vatican City",
    continent: "Europe",
  },
  {
    code: "ve",
    value: "venezuela",
    label: "Venezuela",
    continent: "South America",
  },
  { code: "vn", value: "vietnam", label: "Vietnam", continent: "Asia" },
  { code: "ye", value: "yemen", label: "Yemen", continent: "Asia" },
  { code: "zm", value: "zambia", label: "Zambia", continent: "Africa" },
  { code: "zw", value: "zimbabwe", label: "Zimbabwe", continent: "Africa" },
]

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

const disabledFrameworks = ["Nuxt.js", "Remix"]

const largeListItems = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)

const items = [
  {
    label: "Select a framework",
    value: null,
  },
  {
    label: "React",
    value: "react",
  },
  {
    label: "Vue",
    value: "vue",
  },
  {
    label: "Angular",
    value: "angular",
  },
  {
    label: "Svelte",
    value: "svelte",
  },
  {
    label: "Solid",
    value: "solid",
  },
  {
    label: "Preact",
    value: "preact",
  },
  {
    label: "Next.js",
    value: "next.js",
  },
]

@Component({
  selector: "combobox-example",
  imports: [
    Button,
    Combobox,
    ComboboxCollection,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInDialog,
    ComboboxInput,
    ComboboxItem,
    ComboboxLabel,
    ComboboxList,
    ComboboxMultiple,
    ComboboxMultipleDisabled,
    ComboboxMultipleInvalid,
    ComboboxMultipleNoRemove,
    ComboboxSeparator,
    ComboboxTrigger,
    ComboboxValue,
    ComboboxWithForm,
    Example,
    ExampleWrapper,
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- ComboboxBasic -->
      <div kuiExample title="Basic">
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
      <!-- ComboboxDisabled -->
      <div kuiExample title="Disabled">
        <ng-container kuiCombobox [items]="frameworks">
          <div kuiComboboxInput placeholder="Select a framework" disabled></div>
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
      <!-- ComboboxSides -->
      <div kuiExample title="Sides" [containerSx]="styles.span2">
        <div [sx]="styles.flexWrapCenter2">
          @for (
            side of [
              "inline-start",
              "left",
              "top",
              "bottom",
              "right",
              "inline-end",
            ];
            track side
          ) {
            <ng-container kuiCombobox [items]="frameworks">
              <div
                kuiComboboxInput
                [placeholder]="side.replace('-', ' ')"
                [sx]="styles.w32Capitalize"
              ></div>
              <div kuiComboboxContent [side]="$any(side)">
                <div kuiComboboxEmpty>No items found.</div>
                <div kuiComboboxList>
                  <ng-template let-item>
                    <div kuiComboboxItem [value]="item">{{ item }}</div>
                  </ng-template>
                </div>
              </div>
            </ng-container>
          }
        </div>
      </div>
      <!-- ComboboxInvalid -->
      <div kuiExample title="Invalid">
        <div [sx]="[styles.flexCol4, example.row]">
          <ng-container kuiCombobox [items]="frameworks">
            <div
              kuiComboboxInput
              placeholder="Select a framework"
              aria-invalid="true"
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
          <div kuiField data-invalid="true">
            <label kuiFieldLabel for="combobox-framework-invalid"
              >Framework</label
            >
            <ng-container kuiCombobox [items]="frameworks">
              <div
                kuiComboboxInput
                id="combobox-framework-invalid"
                placeholder="Select a framework"
                aria-invalid="true"
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
            <p kuiFieldDescription>Please select a valid framework.</p>
            <div
              kuiFieldError
              [errors]="[{ message: 'This field is required.' }]"
            ></div>
          </div>
        </div>
      </div>
      <!-- ComboboxWithClear -->
      <div kuiExample title="With Clear Button">
        <ng-container
          kuiCombobox
          [items]="frameworks"
          [defaultValue]="frameworks[0]"
        >
          <div
            kuiComboboxInput
            placeholder="Select a framework"
            showClear
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
      <!-- ComboboxAutoHighlight -->
      <div kuiExample title="With Auto Highlight">
        <ng-container kuiCombobox [items]="frameworks" autoHighlight>
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
      <!-- ComboboxWithGroups -->
      <div kuiExample title="With Groups">
        <ng-container kuiCombobox [items]="timezones">
          <div kuiComboboxInput placeholder="Select a timezone"></div>
          <div kuiComboboxContent>
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
      <!-- ComboboxWithGroupsAndSeparator -->
      <div kuiExample title="With Groups and Separator">
        <ng-container kuiCombobox [items]="timezones">
          <div kuiComboboxInput placeholder="Select a timezone"></div>
          <div kuiComboboxContent>
            <div kuiComboboxEmpty>No timezones found.</div>
            <div kuiComboboxList>
              <ng-template let-group>
                <div kuiComboboxGroup [items]="group.items">
                  <div kuiComboboxLabel>{{ group.value }}</div>
                  <ng-template kuiComboboxCollection let-item>
                    <div kuiComboboxItem [value]="item">{{ item }}</div>
                  </ng-template>
                  <div kuiComboboxSeparator></div>
                </div>
              </ng-template>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- ComboboxLargeList -->
      <div kuiExample title="Large List (100 items)">
        <ng-container kuiCombobox [items]="largeListItems">
          <div kuiComboboxInput placeholder="Search from 100 items"></div>
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
      <!-- ComboxboxInputAddon -->
      <div kuiExample title="With Icon Addon">
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
      <!-- ComboboxInPopup -->
      <div kuiExample title="Combobox in Popup">
        <ng-container
          kuiCombobox
          [items]="countries"
          [defaultValue]="countries[0]"
        >
          <button
            kuiButton
            kuiComboboxTrigger
            variant="outline"
            [sx]="styles.triggerWide"
          >
            <kui-combobox-value></kui-combobox-value>
          </button>
          <div kuiComboboxContent>
            <div
              kuiComboboxInput
              [showTrigger]="false"
              placeholder="Search"
            ></div>
            <div kuiComboboxEmpty>No items found.</div>
            <div kuiComboboxList>
              <ng-template let-item>
                <div kuiComboboxItem [value]="item">{{ item.label }}</div>
              </ng-template>
            </div>
          </div>
        </ng-container>
      </div>
      <kui-combobox-with-form />
      <kui-combobox-multiple />
      <kui-combobox-multiple-disabled />
      <kui-combobox-multiple-invalid />
      <kui-combobox-multiple-no-remove />
      <!-- ComboboxWithCustomItems -->
      <div kuiExample title="With Custom Item Rendering">
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
      <kui-combobox-in-dialog />
      <!-- ComboboxWithOtherInputs -->
      <div kuiExample title="With Other Inputs">
        <ng-container kuiCombobox [items]="frameworks">
          <div
            kuiComboboxInput
            placeholder="Select a framework"
            [sx]="styles.w52"
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
        <ng-container kuiSelect [items]="items">
          <button kuiSelectTrigger [sx]="styles.w52">
            <span kuiSelectValue></span>
          </button>
          <div kuiSelectContent>
            <div kuiSelectGroup>
              @for (item of items; track item.label) {
                <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
              }
            </div>
          </div>
        </ng-container>
        <button kuiButton variant="outline" [sx]="styles.triggerMuted">
          Select a framework
          <svg
            iconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconSelector"
            hugeicons="UnfoldMoreIcon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
          ></svg>
        </button>
        <input kuiInput placeholder="Select a framework" [sx]="styles.w52" />
        <div kuiInputGroup [sx]="styles.w52">
          <input kuiInputGroupInput placeholder="Select a framework" />
          <div kuiInputGroupAddon align="inline-end">
            <svg
              iconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
            ></svg>
          </div>
        </div>
      </div>
      <!-- ComboboxDisabledItems -->
      <div kuiExample title="Disabled Items">
        <ng-container kuiCombobox [items]="frameworks">
          <div kuiComboboxInput placeholder="Select a framework"></div>
          <div kuiComboboxContent>
            <div kuiComboboxEmpty>No items found.</div>
            <div kuiComboboxList>
              <ng-template let-item>
                <div
                  kuiComboboxItem
                  [value]="item"
                  [disabled]="disabledFrameworks.includes(item)"
                >
                  {{ item }}
                </div>
              </ng-template>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class ComboboxExample {
  protected readonly styles = styles
  protected readonly frameworks = frameworks
  protected readonly countries = countries
  protected readonly timezones = timezones
  protected readonly disabledFrameworks = disabledFrameworks
  protected readonly largeListItems = largeListItems
  protected readonly items = items
  protected readonly example = example
}
