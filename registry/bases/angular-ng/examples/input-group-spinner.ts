import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { spinner } from "../../../styles/spinner.styles"
import { containerSize, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group"
import { Spinner } from "../ui/spinner"

const styles = {
  gridWFullMaxWSmGap4: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    gap: { "*": null, base: space[4] },
  }),
  animateSpin: spinner,
  textMutedForeground: css({ color: theme.mutedForeground }),
}

@Component({
  selector: "input-group-spinner",
  imports: [
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    Spinner,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.gridWFullMaxWSmGap4">
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Searching..." />
          <div kuiInputGroupAddon align="inline-end">
            <svg kuiSpinner></svg>
          </div>
        </div>
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Processing..." />
          <div kuiInputGroupAddon>
            <svg kuiSpinner></svg>
          </div>
        </div>
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Saving changes..." />
          <div kuiInputGroupAddon align="inline-end">
            <span kuiInputGroupText>Saving...</span>
            <svg kuiSpinner></svg>
          </div>
        </div>
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Refreshing data..." />
          <div kuiInputGroupAddon>
            <svg
              iconPlaceholder
              lucide="LoaderIcon"
              tabler="IconLoader"
              hugeicons="Loading03Icon"
              phosphor="SpinnerIcon"
              remixicon="RiLoader4Line"
              [sx]="styles.animateSpin"
            ></svg>
          </div>
          <div kuiInputGroupAddon align="inline-end">
            <span kuiInputGroupText [sx]="styles.textMutedForeground"
              >Please wait...</span
            >
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class InputGroupSpinner {
  protected readonly styles = styles
  protected readonly page = page
}
