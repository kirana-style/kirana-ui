import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../ui/input-group"
import { ToggleGroup, ToggleGroupItem } from "../../../ui/toggle-group"

const styles = {
  div: css({
    display: "flex",
    alignItems: "center",
    gap: space[3],
  }),
  inputGroup: css({
    flex: "1 1 0%",
  }),
}

@Component({
  selector: "kui-catalog-toolbar",
  imports: [
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    ToggleGroup,
    ToggleGroupItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div [sx]="styles.div">
      <div kuiInputGroup [sx]="styles.inputGroup">
        <div kuiInputGroupAddon>
          <svg
            iconPlaceholder
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="Search01Icon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
          ></svg>
        </div>
        <input kuiInputGroupInput placeholder="Search releases or catalog..." />
      </div>
      <button kuiButton>
        <svg
          iconPlaceholder
          lucide="PlusIcon"
          tabler="IconPlus"
          hugeicons="Add01Icon"
          phosphor="PlusIcon"
          remixicon="RiAddLine"
        ></svg>
        Upload New Release
      </button>
      <div kuiToggleGroup [defaultValue]="['releases']" variant="outline">
        <button kuiToggleGroupItem value="all-tracks">All Tracks</button>
        <button kuiToggleGroupItem value="releases">Releases</button>
        <button kuiToggleGroupItem value="top-earners">Top Earners</button>
      </div>
    </div>
  `,
})
export class CatalogToolbar {
  protected readonly styles = styles
}
