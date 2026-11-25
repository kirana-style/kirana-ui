import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import { page } from "../../../styles/page.styles"
import { SegmentedControl, SegmentedControlItem } from "../ui/segmented-control"

const styles = {
  column: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[4],
  }),
}

@Component({
  selector: "segmented-control-icons",
  imports: [
    SegmentedControl,
    SegmentedControlItem,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.column">
        <div kuiSegmentedControl aria-label="Theme" defaultValue="system">
          <button kuiSegmentedControlItem value="light">
            <svg
              iconPlaceholder
              lucide="SunIcon"
              tabler="IconSun"
              hugeicons="Sun03Icon"
              phosphor="SunIcon"
              remixicon="RiSunLine"
            ></svg>
            Light
          </button>
          <button kuiSegmentedControlItem value="dark">
            <svg
              iconPlaceholder
              lucide="MoonIcon"
              tabler="IconMoon"
              hugeicons="MoonIcon"
              phosphor="MoonIcon"
              remixicon="RiMoonLine"
            ></svg>
            Dark
          </button>
          <button kuiSegmentedControlItem value="system">
            <svg
              iconPlaceholder
              lucide="MonitorIcon"
              tabler="IconDeviceDesktop"
              hugeicons="ComputerIcon"
              phosphor="MonitorIcon"
              remixicon="RiComputerLine"
            ></svg>
            System
          </button>
        </div>
        <div kuiSegmentedControl aria-label="Layout" defaultValue="grid">
          <button kuiSegmentedControlItem value="grid" aria-label="Grid">
            <svg
              iconPlaceholder
              lucide="LayoutGridIcon"
              tabler="IconLayoutGrid"
              hugeicons="GridIcon"
              phosphor="GridFourIcon"
              remixicon="RiGridLine"
            ></svg>
          </button>
          <button kuiSegmentedControlItem value="list" aria-label="List">
            <svg
              iconPlaceholder
              lucide="ListIcon"
              tabler="IconListDetails"
              hugeicons="Menu01Icon"
              phosphor="ListIcon"
              remixicon="RiListUnordered"
            ></svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class SegmentedControlIcons {
  protected readonly styles = styles
  protected readonly page = page
}
