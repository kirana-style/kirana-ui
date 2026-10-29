import { css } from "@kirana-style/core"
import { IconPlaceholder } from "../../../icons/icon-placeholder"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "../ui/combobox"
import { InputGroupAddon } from "../ui/input-group"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function ComboxboxInputGroup() {
  return (
    <div sx={page.example}>
      <Combobox allowsEmptyCollection aria-label="Timezone">
        <ComboboxInput placeholder="Select a timezone">
          <InputGroupAddon>
            <IconPlaceholder
              lucide="GlobeIcon"
              tabler="IconGlobe"
              hugeicons="Globe02Icon"
              phosphor="GlobeIcon"
              remixicon="RiGlobeLine"
            />
          </InputGroupAddon>
        </ComboboxInput>
        <ComboboxContent crossOffset={-28} sx={styles.w60}>
          <ComboboxList
            items={timezones}
            renderEmptyState={() => (
              <ComboboxEmpty>No timezones found.</ComboboxEmpty>
            )}
          >
            {(group) => (
              <ComboboxGroup id={group.value}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                {group.items.map((item) => (
                  <ComboboxItem key={item} id={item}>
                    {item}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
