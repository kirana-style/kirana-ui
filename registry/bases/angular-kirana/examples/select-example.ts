import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space, spacing } from "../../../core/scales"
import { example } from "../../../styles/example.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const styles = {
  stack: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  row: css({ display: "flex", alignItems: "center", gap: space[2] }),
  sides: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space[2],
  }),
  // `capitalize` over the component's own text transform in every style (Sera's capitals).
  w28Capitalize: css({
    width: spacing(28),
    textTransform: { "*": null, base: "capitalize" },
  }),
  w72: css({ width: spacing(72) }),
  span: css({ gridColumn: "span 2 / span 2" }),
}

const selectBasicItems = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

const selectSidesItems = [
  { label: "Select", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

const selectWithIconsItems = [
  {
    label: "Chart Type",
    icon: {
      lucide: "ChartLineIcon",
      tabler: "IconChartLine",
      hugeicons: "Chart03Icon",
      phosphor: "ChartLineIcon",
      remixicon: "RiLineChartLine",
    },
    value: null,
  },
  {
    label: "Line",
    icon: {
      lucide: "ChartLineIcon",
      tabler: "IconChartLine",
      hugeicons: "Chart03Icon",
      phosphor: "ChartLineIcon",
      remixicon: "RiLineChartLine",
    },
    value: "line",
  },
  {
    label: "Bar",
    icon: {
      lucide: "ChartBarIcon",
      tabler: "IconChartBar",
      hugeicons: "Chart03Icon",
      phosphor: "ChartBarIcon",
      remixicon: "RiBarChartLine",
    },
    value: "bar",
  },
  {
    label: "Pie",
    icon: {
      lucide: "ChartPieIcon",
      tabler: "IconChartPie",
      hugeicons: "Chart03Icon",
      phosphor: "ChartPieIcon",
      remixicon: "RiPieChartLine",
    },
    value: "pie",
  },
]

const selectWithGroupsFruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

const selectWithGroupsVegetables = [
  { label: "Carrot", value: "carrot" },
  { label: "Broccoli", value: "broccoli" },
  { label: "Spinach", value: "spinach" },
]

const selectWithGroupsAllItems = [
  { label: "Select a fruit", value: null },
  ...selectWithGroupsFruits,
  ...selectWithGroupsVegetables,
]

const selectLargeListItems = [
  { label: "Select an item", value: null },
  ...Array.from({ length: 100 }).map((_, i) => ({
    label: `Item ${i}`,
    value: `item-${i}`,
  })),
]

const selectSizesItems = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

const selectWithButtonItems = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

const selectItemAlignedItems = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes", disabled: true },
  { label: "Pineapple", value: "pineapple" },
]

const selectWithFieldItems = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

const selectInvalidItems = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

const selectDisabledItems = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes", disabled: true },
  { label: "Pineapple", value: "pineapple" },
]

const selectMultipleItems = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Watermelon", value: "watermelon" },
]

const selectInDialogItems = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

@Component({
  selector: "select-example",
  imports: [
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Example,
    ExampleWrapper,
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- SelectBasic -->
      <div kuiExample title="Basic">
        <ng-container kuiSelect [items]="selectBasicItems">
          <button kuiSelectTrigger>
            <span kuiSelectValue></span>
          </button>
          <div kuiSelectContent>
            <div kuiSelectGroup>
              @for (item of selectBasicItems; track item.label) {
                <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
              }
            </div>
          </div>
        </ng-container>
      </div>
      <!-- SelectSides -->
      <div kuiExample title="Sides" [containerSx]="styles.span">
        <div [sx]="[styles.sides, example.row]">
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
            <ng-container kuiSelect [items]="selectSidesItems">
              <button kuiSelectTrigger [sx]="styles.w28Capitalize">
                <span
                  kuiSelectValue
                  [placeholder]="side.replace('-', ' ')"
                ></span>
              </button>
              <div
                kuiSelectContent
                [side]="$any(side)"
                [alignItemWithTrigger]="false"
              >
                <div kuiSelectGroup>
                  @for (item of selectSidesItems; track item.label) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
          }
        </div>
      </div>
      <!-- SelectWithIcons -->
      <div kuiExample title="With Icons">
        <div [sx]="[styles.stack, example.row]">
          <ng-container kuiSelect [items]="selectWithIconsItems">
            <button kuiSelectTrigger size="sm">
              <span kuiSelectValue #value="kuiSelectValue">
                <svg
                  iconPlaceholder
                  [lucide]="
                    ($any(value.selected()) ?? selectWithIconsItems[0]).icon
                      .lucide
                  "
                  [tabler]="
                    ($any(value.selected()) ?? selectWithIconsItems[0]).icon
                      .tabler
                  "
                  [hugeicons]="
                    ($any(value.selected()) ?? selectWithIconsItems[0]).icon
                      .hugeicons
                  "
                  [phosphor]="
                    ($any(value.selected()) ?? selectWithIconsItems[0]).icon
                      .phosphor
                  "
                  [remixicon]="
                    ($any(value.selected()) ?? selectWithIconsItems[0]).icon
                      .remixicon
                  "
                ></svg>
                {{ ($any(value.selected()) ?? selectWithIconsItems[0]).label }}
              </span>
            </button>
            <div kuiSelectContent>
              <div kuiSelectGroup>
                @for (item of selectWithIconsItems; track item.label) {
                  <div kuiSelectItem [value]="item.value">
                    <svg
                      iconPlaceholder
                      [lucide]="item.icon.lucide"
                      [tabler]="item.icon.tabler"
                      [hugeicons]="item.icon.hugeicons"
                      [phosphor]="item.icon.phosphor"
                      [remixicon]="item.icon.remixicon"
                    ></svg>
                    {{ item.label }}
                  </div>
                }
              </div>
            </div>
          </ng-container>
          <ng-container kuiSelect [items]="selectWithIconsItems">
            <button kuiSelectTrigger size="default">
              <span kuiSelectValue #value="kuiSelectValue">
                <svg
                  iconPlaceholder
                  [lucide]="
                    ($any(value.selected()) ?? selectWithIconsItems[0]).icon
                      .lucide
                  "
                  [tabler]="
                    ($any(value.selected()) ?? selectWithIconsItems[0]).icon
                      .tabler
                  "
                  [hugeicons]="
                    ($any(value.selected()) ?? selectWithIconsItems[0]).icon
                      .hugeicons
                  "
                  [phosphor]="
                    ($any(value.selected()) ?? selectWithIconsItems[0]).icon
                      .phosphor
                  "
                  [remixicon]="
                    ($any(value.selected()) ?? selectWithIconsItems[0]).icon
                      .remixicon
                  "
                ></svg>
                {{ ($any(value.selected()) ?? selectWithIconsItems[0]).label }}
              </span>
            </button>
            <div kuiSelectContent>
              <div kuiSelectGroup>
                @for (item of selectWithIconsItems; track item.label) {
                  <div kuiSelectItem [value]="item.value">
                    <svg
                      iconPlaceholder
                      [lucide]="item.icon.lucide"
                      [tabler]="item.icon.tabler"
                      [hugeicons]="item.icon.hugeicons"
                      [phosphor]="item.icon.phosphor"
                      [remixicon]="item.icon.remixicon"
                    ></svg>
                    {{ item.label }}
                  </div>
                }
              </div>
            </div>
          </ng-container>
        </div>
      </div>
      <!-- SelectWithGroups -->
      <div kuiExample title="With Groups & Labels">
        <ng-container kuiSelect [items]="selectWithGroupsAllItems">
          <button kuiSelectTrigger>
            <span kuiSelectValue></span>
          </button>
          <div kuiSelectContent>
            <div kuiSelectGroup>
              <div kuiSelectLabel>Fruits</div>
              @for (item of selectWithGroupsFruits; track item.label) {
                <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
              }
            </div>
            <div kuiSelectSeparator></div>
            <div kuiSelectGroup>
              <div kuiSelectLabel>Vegetables</div>
              @for (item of selectWithGroupsVegetables; track item.label) {
                <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
              }
            </div>
          </div>
        </ng-container>
      </div>
      <!-- SelectLargeList -->
      <div kuiExample title="Large List">
        <ng-container kuiSelect [items]="selectLargeListItems">
          <button kuiSelectTrigger>
            <span kuiSelectValue></span>
          </button>
          <div kuiSelectContent>
            <div kuiSelectGroup>
              @for (item of selectLargeListItems; track item.label) {
                <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
              }
            </div>
          </div>
        </ng-container>
      </div>
      <!-- SelectMultiple -->
      <div kuiExample title="Multiple Selection">
        <ng-container
          kuiSelect
          [items]="selectMultipleItems"
          multiple
          [defaultValue]="[]"
        >
          <button kuiSelectTrigger [sx]="styles.w72">
            <span kuiSelectValue #value="kuiSelectValue">
              @if (value.values().length === 0) {
                Select fruits
              } @else if (value.values().length === 1) {
                {{
                  selectMultipleItems.find(
                    (item) => item.value === value.values()[0]
                  )?.label
                }}
              } @else {
                {{ value.values().length }}
                fruits selected
              }
            </span>
          </button>
          <div kuiSelectContent>
            <div kuiSelectGroup>
              @for (item of selectMultipleItems; track item.label) {
                <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
              }
            </div>
          </div>
        </ng-container>
      </div>
      <!-- SelectSizes -->
      <div kuiExample title="Sizes">
        <div [sx]="[styles.stack, example.row]">
          <ng-container kuiSelect [items]="selectSizesItems">
            <button kuiSelectTrigger size="sm">
              <span kuiSelectValue></span>
            </button>
            <div kuiSelectContent>
              <div kuiSelectGroup>
                @for (item of selectSizesItems; track item.label) {
                  <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
                }
              </div>
            </div>
          </ng-container>
          <ng-container kuiSelect [items]="selectSizesItems">
            <button kuiSelectTrigger size="default">
              <span kuiSelectValue></span>
            </button>
            <div kuiSelectContent>
              <div kuiSelectGroup>
                @for (item of selectSizesItems; track item.label) {
                  <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
                }
              </div>
            </div>
          </ng-container>
        </div>
      </div>
      <!-- SelectWithButton -->
      <div kuiExample title="With Button">
        <div [sx]="[styles.stack, example.row]">
          <div [sx]="styles.row">
            <ng-container kuiSelect [items]="selectWithButtonItems">
              <button kuiSelectTrigger size="sm">
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of selectWithButtonItems; track item.label) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
            <button kuiButton variant="outline" size="sm">Submit</button>
          </div>
          <div [sx]="styles.row">
            <ng-container kuiSelect [items]="selectWithButtonItems">
              <button kuiSelectTrigger>
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of selectWithButtonItems; track item.label) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
            <button kuiButton variant="outline">Submit</button>
          </div>
        </div>
      </div>
      <!-- SelectItemAligned -->
      <div kuiExample title="Item Aligned">
        <ng-container kuiSelect [items]="selectItemAlignedItems">
          <button kuiSelectTrigger>
            <span kuiSelectValue></span>
          </button>
          <div kuiSelectContent [alignItemWithTrigger]="true">
            <div kuiSelectGroup>
              @for (item of selectItemAlignedItems; track item.label) {
                <div
                  kuiSelectItem
                  [value]="item.value"
                  [disabled]="item.disabled"
                >
                  {{ item.label }}
                </div>
              }
            </div>
          </div>
        </ng-container>
      </div>
      <!-- SelectWithField -->
      <div kuiExample title="With Field">
        <div kuiField>
          <label kuiFieldLabel for="select-fruit">Favorite Fruit</label>
          <ng-container kuiSelect [items]="selectWithFieldItems">
            <button kuiSelectTrigger id="select-fruit">
              <span kuiSelectValue></span>
            </button>
            <div kuiSelectContent>
              <div kuiSelectGroup>
                @for (item of selectWithFieldItems; track item.label) {
                  <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
                }
              </div>
            </div>
          </ng-container>
          <p kuiFieldDescription>Choose your favorite fruit from the list.</p>
        </div>
      </div>
      <!-- SelectInvalid -->
      <div kuiExample title="Invalid">
        <div [sx]="[styles.stack, example.row]">
          <ng-container kuiSelect [items]="selectInvalidItems">
            <button kuiSelectTrigger aria-invalid="true">
              <span kuiSelectValue></span>
            </button>
            <div kuiSelectContent>
              <div kuiSelectGroup>
                @for (item of selectInvalidItems; track item.label) {
                  <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
                }
              </div>
            </div>
          </ng-container>
          <div kuiField data-invalid="true">
            <label kuiFieldLabel for="select-fruit-invalid"
              >Favorite Fruit</label
            >
            <ng-container kuiSelect [items]="selectInvalidItems">
              <button
                kuiSelectTrigger
                id="select-fruit-invalid"
                aria-invalid="true"
              >
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of selectInvalidItems; track item.label) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
            <div
              kuiFieldError
              [errors]="[{ message: 'Please select a valid fruit.' }]"
            ></div>
          </div>
        </div>
      </div>
      <!-- SelectDisabled -->
      <div kuiExample title="Disabled">
        <ng-container kuiSelect [items]="selectDisabledItems" disabled>
          <button kuiSelectTrigger>
            <span kuiSelectValue></span>
          </button>
          <div kuiSelectContent>
            <div kuiSelectGroup>
              @for (item of selectDisabledItems; track item.label) {
                <div
                  kuiSelectItem
                  [value]="item.value"
                  [disabled]="item.disabled"
                >
                  {{ item.label }}
                </div>
              }
            </div>
          </div>
        </ng-container>
      </div>
      <!-- SelectInDialog -->
      <div kuiExample title="In Dialog">
        <ng-container kuiDialog>
          <button kuiButton kuiDialogTrigger variant="outline">
            Open Dialog
          </button>
          <div kuiDialogContent>
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Select Example</h2>
              <p kuiDialogDescription>
                Use the select below to choose a fruit.
              </p>
            </div>
            <ng-container kuiSelect [items]="selectInDialogItems">
              <button kuiSelectTrigger>
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of selectInDialogItems; track item.label) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class SelectExample {
  protected readonly styles = styles
  protected readonly selectBasicItems = selectBasicItems
  protected readonly selectSidesItems = selectSidesItems
  protected readonly selectWithIconsItems = selectWithIconsItems
  protected readonly selectWithGroupsFruits = selectWithGroupsFruits
  protected readonly selectWithGroupsVegetables = selectWithGroupsVegetables
  protected readonly selectWithGroupsAllItems = selectWithGroupsAllItems
  protected readonly selectLargeListItems = selectLargeListItems
  protected readonly selectSizesItems = selectSizesItems
  protected readonly selectWithButtonItems = selectWithButtonItems
  protected readonly selectItemAlignedItems = selectItemAlignedItems
  protected readonly selectWithFieldItems = selectWithFieldItems
  protected readonly selectInvalidItems = selectInvalidItems
  protected readonly selectDisabledItems = selectDisabledItems
  protected readonly selectMultipleItems = selectMultipleItems
  protected readonly selectInDialogItems = selectInDialogItems
  protected readonly example = example
}
