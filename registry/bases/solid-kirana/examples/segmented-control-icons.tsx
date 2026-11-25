import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../ui/icon-placeholder"
import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  column: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[4],
  }),
}

export default function SegmentedControlIcons() {
  return (
    <div sx={page.example}>
      <div sx={styles.column}>
        <SegmentedControl aria-label="Theme" defaultValue="system">
          <SegmentedControlItem value="light">
            <IconPlaceholder
              lucide="SunIcon"
              tabler="IconSun"
              hugeicons="Sun03Icon"
              phosphor="SunIcon"
              remixicon="RiSunLine"
            />
            Light
          </SegmentedControlItem>
          <SegmentedControlItem value="dark">
            <IconPlaceholder
              lucide="MoonIcon"
              tabler="IconMoon"
              hugeicons="MoonIcon"
              phosphor="MoonIcon"
              remixicon="RiMoonLine"
            />
            Dark
          </SegmentedControlItem>
          <SegmentedControlItem value="system">
            <IconPlaceholder
              lucide="MonitorIcon"
              tabler="IconDeviceDesktop"
              hugeicons="ComputerIcon"
              phosphor="MonitorIcon"
              remixicon="RiComputerLine"
            />
            System
          </SegmentedControlItem>
        </SegmentedControl>
        <SegmentedControl aria-label="Layout" defaultValue="grid">
          <SegmentedControlItem value="grid" aria-label="Grid">
            <IconPlaceholder
              lucide="LayoutGridIcon"
              tabler="IconLayoutGrid"
              hugeicons="GridIcon"
              phosphor="GridFourIcon"
              remixicon="RiGridLine"
            />
          </SegmentedControlItem>
          <SegmentedControlItem value="list" aria-label="List">
            <IconPlaceholder
              lucide="ListIcon"
              tabler="IconListDetails"
              hugeicons="Menu01Icon"
              phosphor="ListIcon"
              remixicon="RiListUnordered"
            />
          </SegmentedControlItem>
        </SegmentedControl>
      </div>
    </div>
  )
}
