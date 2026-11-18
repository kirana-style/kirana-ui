/**
 * Upstream's `select-example`, without the sections whose components the slice does not have yet:
 * Inline with Input & NativeSelect: NativeSelect.
 * Subscription Plan: Item.
 */
import { css } from "@kirana-style/core"

import { space, spacing } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
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

export default function SelectExample() {
  return (
    <ExampleWrapper>
      <SelectBasic />
      <SelectSides />
      <SelectWithIcons />
      <SelectWithGroups />
      <SelectLargeList />
      <SelectMultiple />
      <SelectSizes />
      <SelectWithButton />
      <SelectItemAligned />
      <SelectWithField />
      <SelectInvalid />
      <SelectDisabled />
      <SelectInDialog />
    </ExampleWrapper>
  )
}

function SelectBasic() {
  const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ]
  return (
    <Example title="Basic">
      <Select items={items}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
  )
}

function SelectSides() {
  const items = [
    { label: "Select", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
  ]
  return (
    <Example title="Sides" containerSx={styles.span}>
      <div sx={[styles.sides, example.row]}>
        {(
          [
            "inline-start",
            "left",
            "top",
            "bottom",
            "right",
            "inline-end",
          ] as const
        ).map((side) => (
          <Select key={side} items={items}>
            <SelectTrigger sx={styles.w28Capitalize}>
              <SelectValue placeholder={side.replace("-", " ")} />
            </SelectTrigger>
            <SelectContent side={side} alignItemWithTrigger={false}>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
      </div>
    </Example>
  )
}

function SelectWithIcons() {
  const items = [
    {
      label: (
        <>
          <IconPlaceholder
            lucide="ChartLineIcon"
            tabler="IconChartLine"
            hugeicons="Chart03Icon"
            phosphor="ChartLineIcon"
            remixicon="RiLineChartLine"
          />
          Chart Type
        </>
      ),
      value: null,
    },
    {
      label: (
        <>
          <IconPlaceholder
            lucide="ChartLineIcon"
            tabler="IconChartLine"
            hugeicons="Chart03Icon"
            phosphor="ChartLineIcon"
            remixicon="RiLineChartLine"
          />
          Line
        </>
      ),
      value: "line",
    },
    {
      label: (
        <>
          <IconPlaceholder
            lucide="ChartBarIcon"
            tabler="IconChartBar"
            hugeicons="Chart03Icon"
            phosphor="ChartBarIcon"
            remixicon="RiBarChartLine"
          />
          Bar
        </>
      ),
      value: "bar",
    },
    {
      label: (
        <>
          <IconPlaceholder
            lucide="ChartPieIcon"
            tabler="IconChartPie"
            hugeicons="Chart03Icon"
            phosphor="ChartPieIcon"
            remixicon="RiPieChartLine"
          />
          Pie
        </>
      ),
      value: "pie",
    },
  ]
  return (
    <Example title="With Icons">
      <div sx={[styles.stack, example.row]}>
        <Select items={items}>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select items={items}>
          <SelectTrigger size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Example>
  )
}

function SelectWithGroups() {
  const fruits = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
  ]
  const vegetables = [
    { label: "Carrot", value: "carrot" },
    { label: "Broccoli", value: "broccoli" },
    { label: "Spinach", value: "spinach" },
  ]
  const allItems = [
    { label: "Select a fruit", value: null },
    ...fruits,
    ...vegetables,
  ]
  return (
    <Example title="With Groups & Labels">
      <Select items={allItems}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {fruits.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            {vegetables.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
  )
}

function SelectLargeList() {
  const items = [
    { label: "Select an item", value: null },
    ...Array.from({ length: 100 }).map((_, i) => ({
      label: `Item ${i}`,
      value: `item-${i}`,
    })),
  ]
  return (
    <Example title="Large List">
      <Select items={items}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
  )
}

function SelectSizes() {
  const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
  ]
  return (
    <Example title="Sizes">
      <div sx={[styles.stack, example.row]}>
        <Select items={items}>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select items={items}>
          <SelectTrigger size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </Example>
  )
}

function SelectWithButton() {
  const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
  ]
  return (
    <Example title="With Button">
      <div sx={[styles.stack, example.row]}>
        <div sx={styles.row}>
          <Select items={items}>
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            Submit
          </Button>
        </div>
        <div sx={styles.row}>
          <Select items={items}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline">Submit</Button>
        </div>
      </div>
    </Example>
  )
}

function SelectItemAligned() {
  const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes", disabled: true },
    { label: "Pineapple", value: "pineapple" },
  ]
  return (
    <Example title="Item Aligned">
      <Select items={items}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={true}>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                disabled={item.disabled}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
  )
}

function SelectWithField() {
  const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ]
  return (
    <Example title="With Field">
      <Field>
        <FieldLabel htmlFor="select-fruit">Favorite Fruit</FieldLabel>
        <Select items={items}>
          <SelectTrigger id="select-fruit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldDescription>
          Choose your favorite fruit from the list.
        </FieldDescription>
      </Field>
    </Example>
  )
}

function SelectInvalid() {
  const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ]
  return (
    <Example title="Invalid">
      <div sx={[styles.stack, example.row]}>
        <Select items={items}>
          <SelectTrigger aria-invalid="true">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Field data-invalid>
          <FieldLabel htmlFor="select-fruit-invalid">Favorite Fruit</FieldLabel>
          <Select items={items}>
            <SelectTrigger id="select-fruit-invalid" aria-invalid>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError errors={[{ message: "Please select a valid fruit." }]} />
        </Field>
      </div>
    </Example>
  )
}

function SelectDisabled() {
  const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes", disabled: true },
    { label: "Pineapple", value: "pineapple" },
  ]
  return (
    <Example title="Disabled">
      <Select items={items} disabled>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                disabled={item.disabled}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
  )
}

function SelectMultiple() {
  const items = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Watermelon", value: "watermelon" },
  ]
  return (
    <Example title="Multiple Selection">
      <Select items={items} multiple defaultValue={[]}>
        <SelectTrigger sx={styles.w72}>
          <SelectValue>
            {(value: string[]) => {
              if (value.length === 0) {
                return "Select fruits"
              }
              if (value.length === 1) {
                return items.find((item) => item.value === value[0])?.label
              }
              return `${value.length} fruits selected`
            }}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
  )
}

function SelectInDialog() {
  const items = [
    { label: "Select a fruit", value: null },
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ]
  return (
    <Example title="In Dialog">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open Dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Example</DialogTitle>
            <DialogDescription>
              Use the select below to choose a fruit.
            </DialogDescription>
          </DialogHeader>
          <Select items={items}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>
    </Example>
  )
}
