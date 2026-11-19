import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "../ui/input-group"
import { Spinner } from "../ui/spinner"

const styles = {
  flexWFullMaxWMdFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  mlAuto: css({ marginLeft: "auto" }),
}

@Component({
  selector: "spinner-input-group",
  imports: [
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupTextarea,
    Spinner,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWMdFlexColGa">
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Send a message..." disabled />
          <div kuiInputGroupAddon align="inline-end">
            <svg kuiSpinner></svg>
          </div>
        </div>
        <div kuiInputGroup>
          <textarea
            kuiInputGroupTextarea
            placeholder="Send a message..."
            disabled
          ></textarea>
          <div kuiInputGroupAddon align="block-end">
            <svg kuiSpinner></svg>
            Validating...
            <button kuiInputGroupButton [sx]="styles.mlAuto" variant="default">
              <svg
                iconPlaceholder
                lucide="ArrowUpIcon"
                tabler="IconArrowUp"
                hugeicons="ArrowUp02Icon"
                phosphor="ArrowUpIcon"
                remixicon="RiArrowUpLine"
              ></svg>
              <span [sx]="visuallyHidden">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class SpinnerInputGroup {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly visuallyHidden = visuallyHidden
}
