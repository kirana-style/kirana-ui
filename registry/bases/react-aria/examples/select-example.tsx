/**
 * Upstream's `select-example`, without the sections whose components the slice does not have yet:
 * Inline with Input & NativeSelect: NativeSelect.
 * Subscription Plan: Item.
 * With Autocomplete (React Aria's): InputGroup.
 */
import { css } from "@kirana-style/core"

import { space, spacing } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { example } from "../../../styles/example.styles"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Dialog,
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
  w28Capitalize: css({ width: spacing(28), textTransform: "capitalize" }),
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
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ]
  return (
    <Example title="Basic">
      <Select aria-label="Fruits" placeholder="Select a fruit">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} id={item.value}>
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
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
  ]
  return (
    <Example title="Sides" containerSx={styles.span}>
      <div sx={[styles.sides, example.row]}>
        {(["start", "left", "top", "bottom", "right", "end"] as const).map(
          (placement) => (
            <Select key={placement} aria-label="Fruits" placeholder="Select">
              <SelectTrigger sx={styles.w28Capitalize}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent placement={placement}>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem key={item.value} id={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )
        )}
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
        <Select aria-label="Chart Type">
          <SelectTrigger size="sm">
            <SelectValue>
              {({ isPlaceholder, defaultChildren }) =>
                isPlaceholder ? (
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
                ) : (
                  defaultChildren
                )
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} id={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select aria-label="Chart Type">
          <SelectTrigger size="default">
            <SelectValue>
              {({ isPlaceholder, defaultChildren }) =>
                isPlaceholder ? (
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
                ) : (
                  defaultChildren
                )
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} id={item.value}>
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
  return (
    <Example title="With Groups & Labels">
      <Select aria-label="Fruits and Vegetables">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {fruits.map((item) => (
              <SelectItem key={item.value} id={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            {vegetables.map((item) => (
              <SelectItem key={item.value} id={item.value}>
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
  const items = Array.from({ length: 100 }).map((_, i) => ({
    label: `Item ${i}`,
    value: `item-${i}`,
  }))
  return (
    <Example title="Large List">
      <Select aria-label="Items">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} id={item.value}>
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
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
  ]
  return (
    <Example title="Sizes">
      <div sx={[styles.stack, example.row]}>
        <Select aria-label="Fruits" placeholder="Select a fruit">
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} id={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select aria-label="Fruits">
          <SelectTrigger size="default">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} id={item.value}>
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
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
  ]
  return (
    <Example title="With Button">
      <div sx={[styles.stack, example.row]}>
        <div sx={styles.row}>
          <Select aria-label="Fruits" placeholder="Select a fruit">
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} id={item.value}>
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
          <Select aria-label="Fruits">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} id={item.value}>
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
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes", disabled: true },
    { label: "Pineapple", value: "pineapple" },
  ]
  return (
    <Example title="Item Aligned">
      <Select aria-label="Fruits" placeholder="Select a fruit">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                id={item.value}
                isDisabled={item.disabled}
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
        <Select aria-label="Fruits" placeholder="Select a fruit">
          <SelectTrigger id="select-fruit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} id={item.value}>
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
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ]
  return (
    <Example title="Invalid">
      <div sx={[styles.stack, example.row]}>
        <Select aria-label="Fruits" placeholder="Select a fruit" isInvalid>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} id={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Field data-invalid>
          <FieldLabel htmlFor="select-fruit-invalid">Favorite Fruit</FieldLabel>
          <Select aria-label="Fruits" isInvalid>
            <SelectTrigger id="select-fruit-invalid">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} id={item.value}>
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
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes", disabled: true },
    { label: "Pineapple", value: "pineapple" },
  ]
  return (
    <Example title="Disabled">
      <Select aria-label="Fruits" placeholder="Select a fruit" isDisabled>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                id={item.value}
                isDisabled={item.disabled}
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
      <Select selectionMode="multiple" aria-label="Fruits">
        <SelectTrigger sx={styles.w72}>
          <SelectValue<(typeof items)[0]>>
            {({ selectedItems }) =>
              selectedItems.length === 0
                ? "Select fruits"
                : selectedItems.length === 1
                  ? (selectedItems[0]?.label ?? "")
                  : `${selectedItems.length} fruits selected`
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup items={items}>
            {(item) => <SelectItem id={item.value}>{item.label}</SelectItem>}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Example>
  )
}

function SelectInDialog() {
  const items = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Blueberry", value: "blueberry" },
    { label: "Grapes", value: "grapes" },
    { label: "Pineapple", value: "pineapple" },
  ]
  return (
    <Example title="In Dialog">
      <DialogTrigger>
        <Button variant="outline">Open Dialog</Button>
        <Dialog>
          <DialogHeader>
            <DialogTitle>Select Example</DialogTitle>
            <DialogDescription>
              Use the select below to choose a fruit.
            </DialogDescription>
          </DialogHeader>
          <Select aria-label="Fruits" placeholder="Select a fruit">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} id={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Dialog>
      </DialogTrigger>
    </Example>
  )
}
