import { For } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
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

export default function SelectExample() {
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

  return (
    <ExampleWrapper>
      <Example title="Basic">
        <Select items={selectBasicItems}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <For each={selectBasicItems}>
                {(item) => (
                  <SelectItem value={item.value}>{item.label}</SelectItem>
                )}
              </For>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Example>
      <Example title="Sides" containerSx={styles.span}>
        <div sx={[styles.sides, example.row]}>
          <For
            each={
              [
                "inline-start",
                "left",
                "top",
                "bottom",
                "right",
                "inline-end",
              ] as const
            }
          >
            {(side) => (
              <Select items={selectSidesItems}>
                <SelectTrigger sx={styles.w28Capitalize}>
                  <SelectValue placeholder={side.replace("-", " ")} />
                </SelectTrigger>
                <SelectContent side={side} alignItemWithTrigger={false}>
                  <SelectGroup>
                    <For each={selectSidesItems}>
                      {(item) => (
                        <SelectItem value={item.value}>{item.label}</SelectItem>
                      )}
                    </For>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </For>
        </div>
      </Example>
      <Example title="With Icons">
        <div sx={[styles.stack, example.row]}>
          <Select items={selectWithIconsItems}>
            <SelectTrigger size="sm">
              <SelectValue>
                {({ items }) => (
                  <>
                    <IconPlaceholder
                      {...(
                        (items[0] as
                          | (typeof selectWithIconsItems)[number]
                          | undefined) ?? selectWithIconsItems[0]
                      ).icon}
                    />{" "}
                    {
                      (
                        (items[0] as
                          | (typeof selectWithIconsItems)[number]
                          | undefined) ?? selectWithIconsItems[0]
                      ).label
                    }
                  </>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <For each={selectWithIconsItems}>
                  {(item) => (
                    <SelectItem value={item.value}>
                      <IconPlaceholder {...item.icon} /> {item.label}
                    </SelectItem>
                  )}
                </For>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select items={selectWithIconsItems}>
            <SelectTrigger size="default">
              <SelectValue>
                {({ items }) => (
                  <>
                    <IconPlaceholder
                      {...(
                        (items[0] as
                          | (typeof selectWithIconsItems)[number]
                          | undefined) ?? selectWithIconsItems[0]
                      ).icon}
                    />{" "}
                    {
                      (
                        (items[0] as
                          | (typeof selectWithIconsItems)[number]
                          | undefined) ?? selectWithIconsItems[0]
                      ).label
                    }
                  </>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <For each={selectWithIconsItems}>
                  {(item) => (
                    <SelectItem value={item.value}>
                      <IconPlaceholder {...item.icon} /> {item.label}
                    </SelectItem>
                  )}
                </For>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Example>
      <Example title="With Groups & Labels">
        <Select items={selectWithGroupsAllItems}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <For each={selectWithGroupsFruits}>
                {(item) => (
                  <SelectItem value={item.value}>{item.label}</SelectItem>
                )}
              </For>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Vegetables</SelectLabel>
              <For each={selectWithGroupsVegetables}>
                {(item) => (
                  <SelectItem value={item.value}>{item.label}</SelectItem>
                )}
              </For>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Example>
      <Example title="Large List">
        <Select items={selectLargeListItems}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <For each={selectLargeListItems}>
                {(item) => (
                  <SelectItem value={item.value}>{item.label}</SelectItem>
                )}
              </For>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Example>
      <Example title="Multiple Selection">
        <Select items={selectMultipleItems} multiple defaultValue={[]}>
          <SelectTrigger sx={styles.w72}>
            <SelectValue>
              {({ value }) => (
                <>
                  {value.length === 0 ? (
                    <>Select fruits</>
                  ) : (
                    <>
                      {value.length === 1 ? (
                        selectMultipleItems.find(
                          (item) => item.value === value[0]
                        )?.label
                      ) : (
                        <>{value.length} fruits selected</>
                      )}
                    </>
                  )}
                </>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <For each={selectMultipleItems}>
                {(item) => (
                  <SelectItem value={item.value}>{item.label}</SelectItem>
                )}
              </For>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Example>
      <Example title="Sizes">
        <div sx={[styles.stack, example.row]}>
          <Select items={selectSizesItems}>
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <For each={selectSizesItems}>
                  {(item) => (
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  )}
                </For>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select items={selectSizesItems}>
            <SelectTrigger size="default">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <For each={selectSizesItems}>
                  {(item) => (
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  )}
                </For>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Example>
      <Example title="With Button">
        <div sx={[styles.stack, example.row]}>
          <div sx={styles.row}>
            <Select items={selectWithButtonItems}>
              <SelectTrigger size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <For each={selectWithButtonItems}>
                    {(item) => (
                      <SelectItem value={item.value}>{item.label}</SelectItem>
                    )}
                  </For>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Submit
            </Button>
          </div>
          <div sx={styles.row}>
            <Select items={selectWithButtonItems}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <For each={selectWithButtonItems}>
                    {(item) => (
                      <SelectItem value={item.value}>{item.label}</SelectItem>
                    )}
                  </For>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="outline">Submit</Button>
          </div>
        </div>
      </Example>
      <Example title="Item Aligned">
        <Select items={selectItemAlignedItems}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={true}>
            <SelectGroup>
              <For each={selectItemAlignedItems}>
                {(item) => (
                  <SelectItem value={item.value} disabled={item.disabled}>
                    {item.label}
                  </SelectItem>
                )}
              </For>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Example>
      <Example title="With Field">
        <Field>
          <FieldLabel for="select-fruit">Favorite Fruit</FieldLabel>
          <Select items={selectWithFieldItems}>
            <SelectTrigger id="select-fruit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <For each={selectWithFieldItems}>
                  {(item) => (
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  )}
                </For>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldDescription>
            Choose your favorite fruit from the list.
          </FieldDescription>
        </Field>
      </Example>
      <Example title="Invalid">
        <div sx={[styles.stack, example.row]}>
          <Select items={selectInvalidItems}>
            <SelectTrigger aria-invalid="true">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <For each={selectInvalidItems}>
                  {(item) => (
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  )}
                </For>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Field data-invalid="true">
            <FieldLabel for="select-fruit-invalid">Favorite Fruit</FieldLabel>
            <Select items={selectInvalidItems}>
              <SelectTrigger id="select-fruit-invalid" aria-invalid="true">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <For each={selectInvalidItems}>
                    {(item) => (
                      <SelectItem value={item.value}>{item.label}</SelectItem>
                    )}
                  </For>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError
              errors={[{ message: "Please select a valid fruit." }]}
            />
          </Field>
        </div>
      </Example>
      <Example title="Disabled">
        <Select items={selectDisabledItems} disabled>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <For each={selectDisabledItems}>
                {(item) => (
                  <SelectItem value={item.value} disabled={item.disabled}>
                    {item.label}
                  </SelectItem>
                )}
              </For>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Example>
      <Example title="In Dialog">
        <Dialog>
          <DialogTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline">
                Open Dialog
              </Button>
            )}
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Example</DialogTitle>
              <DialogDescription>
                Use the select below to choose a fruit.
              </DialogDescription>
            </DialogHeader>
            <Select items={selectInDialogItems}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <For each={selectInDialogItems}>
                    {(item) => (
                      <SelectItem value={item.value}>{item.label}</SelectItem>
                    )}
                  </For>
                </SelectGroup>
              </SelectContent>
            </Select>
          </DialogContent>
        </Dialog>
      </Example>
    </ExampleWrapper>
  )
}
