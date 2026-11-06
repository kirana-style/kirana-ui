import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import { inEveryStyle } from "../../../../../core/axes"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Label } from "../../../ui/label"
import { SidebarInput } from "../../../ui/sidebar"

const styles = {
  searchFormDiv: css({
    position: "relative",
  }),
  searchFormLabel: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  sidebarInput: css({
    height: { "*": null, base: space[8] },
    // `pl-*` for the icon, over Input's own padding in every style.
    paddingInlineStart: inEveryStyle({ base: space[7] }),
  }),
  iconPlaceholder: css({
    pointerEvents: "none",
    position: "absolute",
    top: "50%",
    left: space[2],
    width: space[4],
    height: space[4],

    translate: "0 -50%",
    opacity: "50%",
    userSelect: "none",
  }),
}

@Component({
  selector: "kui-search-form",
  imports: [Label, SidebarInput, IconPlaceholder, SxDirective],
  host: { style: "display: contents" },
  template: `
    <form [sx]="sx()">
      <div [sx]="styles.searchFormDiv">
        <label kuiLabel for="search" [sx]="styles.searchFormLabel"
          >Search</label
        >
        <input
          kuiSidebarInput
          id="search"
          placeholder="Type to search..."
          [sx]="styles.sidebarInput"
        />
        <svg
          iconPlaceholder
          lucide="SearchIcon"
          tabler="IconSearch"
          hugeicons="SearchIcon"
          phosphor="MagnifyingGlassIcon"
          remixicon="RiSearchLine"
          [sx]="styles.iconPlaceholder"
        ></svg>
      </div>
    </form>
  `,
})
export class SearchForm {
  /** Styles for its root, as Vue's component gives its root the caller's. */
  readonly sx = input<SxInput>()
  protected readonly styles = styles
}
