<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { space, spacing } from "../../../core/scales"
import { example } from "../../../styles/example.styles"
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
</script>

<template>
  <ExampleWrapper>
    <!-- SelectBasic -->
    <Example title="Basic">
      <Select :items="selectBasicItems">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="item in selectBasicItems"
              :key="item.label"
              :value="item.value"
              >{{ item.label }}</SelectItem
            >
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
    <!-- SelectSides -->
    <Example title="Sides" :container-sx="styles.span">
      <div :sx="[styles.sides, example.row]">
        <Select
          v-for="side in [
            'inline-start',
            'left',
            'top',
            'bottom',
            'right',
            'inline-end',
          ] as const"
          :key="side"
          :items="selectSidesItems"
        >
          <SelectTrigger :sx="styles.w28Capitalize">
            <SelectValue :placeholder="side.replace('-', ' ')" />
          </SelectTrigger>
          <SelectContent :side="side" :align-item-with-trigger="false">
            <SelectGroup>
              <SelectItem
                v-for="item in selectSidesItems"
                :key="item.label"
                :value="item.value"
                >{{ item.label }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Example>
    <!-- SelectWithIcons -->
    <Example title="With Icons">
      <div :sx="[styles.stack, example.row]">
        <Select :items="selectWithIconsItems">
          <SelectTrigger size="sm">
            <SelectValue v-slot="{ items }">
              <IconPlaceholder
                v-bind="(items[0] ?? selectWithIconsItems[0]).icon"
              />
              {{ (items[0] ?? selectWithIconsItems[0]).label }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="item in selectWithIconsItems"
                :key="item.label"
                :value="item.value"
              >
                <IconPlaceholder v-bind="item.icon" />
                {{ item.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select :items="selectWithIconsItems">
          <SelectTrigger size="default">
            <SelectValue v-slot="{ items }">
              <IconPlaceholder
                v-bind="(items[0] ?? selectWithIconsItems[0]).icon"
              />
              {{ (items[0] ?? selectWithIconsItems[0]).label }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="item in selectWithIconsItems"
                :key="item.label"
                :value="item.value"
              >
                <IconPlaceholder v-bind="item.icon" />
                {{ item.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Example>
    <!-- SelectWithGroups -->
    <Example title="With Groups & Labels">
      <Select :items="selectWithGroupsAllItems">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem
              v-for="item in selectWithGroupsFruits"
              :key="item.label"
              :value="item.value"
              >{{ item.label }}</SelectItem
            >
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem
              v-for="item in selectWithGroupsVegetables"
              :key="item.label"
              :value="item.value"
              >{{ item.label }}</SelectItem
            >
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
    <!-- SelectLargeList -->
    <Example title="Large List">
      <Select :items="selectLargeListItems">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="item in selectLargeListItems"
              :key="item.label"
              :value="item.value"
              >{{ item.label }}</SelectItem
            >
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
    <!-- SelectMultiple -->
    <Example title="Multiple Selection">
      <Select :items="selectMultipleItems" multiple :default-value="[]">
        <SelectTrigger :sx="styles.w72">
          <SelectValue v-slot="{ value }">
            <template v-if="value.length === 0">Select fruits</template>
            <template v-else-if="value.length === 1">{{
              selectMultipleItems.find((item) => item.value === value[0])?.label
            }}</template>
            <template v-else>{{ value.length }} fruits selected</template>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="item in selectMultipleItems"
              :key="item.label"
              :value="item.value"
              >{{ item.label }}</SelectItem
            >
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
    <!-- SelectSizes -->
    <Example title="Sizes">
      <div :sx="[styles.stack, example.row]">
        <Select :items="selectSizesItems">
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="item in selectSizesItems"
                :key="item.label"
                :value="item.value"
                >{{ item.label }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select :items="selectSizesItems">
          <SelectTrigger size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="item in selectSizesItems"
                :key="item.label"
                :value="item.value"
                >{{ item.label }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Example>
    <!-- SelectWithButton -->
    <Example title="With Button">
      <div :sx="[styles.stack, example.row]">
        <div :sx="styles.row">
          <Select :items="selectWithButtonItems">
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="item in selectWithButtonItems"
                  :key="item.label"
                  :value="item.value"
                  >{{ item.label }}</SelectItem
                >
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">Submit</Button>
        </div>
        <div :sx="styles.row">
          <Select :items="selectWithButtonItems">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="item in selectWithButtonItems"
                  :key="item.label"
                  :value="item.value"
                  >{{ item.label }}</SelectItem
                >
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline">Submit</Button>
        </div>
      </div>
    </Example>
    <!-- SelectItemAligned -->
    <Example title="Item Aligned">
      <Select :items="selectItemAlignedItems">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent :align-item-with-trigger="true">
          <SelectGroup>
            <SelectItem
              v-for="item in selectItemAlignedItems"
              :key="item.label"
              :value="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</SelectItem
            >
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
    <!-- SelectWithField -->
    <Example title="With Field">
      <Field>
        <FieldLabel for="select-fruit">Favorite Fruit</FieldLabel>
        <Select :items="selectWithFieldItems">
          <SelectTrigger id="select-fruit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="item in selectWithFieldItems"
                :key="item.label"
                :value="item.value"
                >{{ item.label }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldDescription>
          Choose your favorite fruit from the list.
        </FieldDescription>
      </Field>
    </Example>
    <!-- SelectInvalid -->
    <Example title="Invalid">
      <div :sx="[styles.stack, example.row]">
        <Select :items="selectInvalidItems">
          <SelectTrigger aria-invalid="true">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="item in selectInvalidItems"
                :key="item.label"
                :value="item.value"
                >{{ item.label }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
        <Field data-invalid="true">
          <FieldLabel for="select-fruit-invalid">Favorite Fruit</FieldLabel>
          <Select :items="selectInvalidItems">
            <SelectTrigger id="select-fruit-invalid" aria-invalid="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="item in selectInvalidItems"
                  :key="item.label"
                  :value="item.value"
                  >{{ item.label }}</SelectItem
                >
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError :errors="[{ message: 'Please select a valid fruit.' }]" />
        </Field>
      </div>
    </Example>
    <!-- SelectDisabled -->
    <Example title="Disabled">
      <Select :items="selectDisabledItems" disabled>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="item in selectDisabledItems"
              :key="item.label"
              :value="item.value"
              :disabled="item.disabled"
              >{{ item.label }}</SelectItem
            >
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
    <!-- SelectInDialog -->
    <Example title="In Dialog">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline"> Open Dialog </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Example</DialogTitle>
            <DialogDescription
              >Use the select below to choose a fruit.</DialogDescription
            >
          </DialogHeader>
          <Select :items="selectInDialogItems">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="item in selectInDialogItems"
                  :key="item.label"
                  :value="item.value"
                  >{{ item.label }}</SelectItem
                >
              </SelectGroup>
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>
    </Example>
  </ExampleWrapper>
</template>
