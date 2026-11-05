import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

const styles = {
  gridWFullMaxWSmGap6: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    gap: { "*": null, base: space[6] },
  }),
}

@Component({
  selector: "input-group-icon",
  imports: [
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.gridWFullMaxWSmGap6">
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Search..." />
          <div kuiInputGroupAddon>
            <svg
              iconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            ></svg>
          </div>
        </div>
        <div kuiInputGroup>
          <input
            kuiInputGroupInput
            type="email"
            placeholder="Enter your email"
          />
          <div kuiInputGroupAddon>
            <svg
              iconPlaceholder
              lucide="MailIcon"
              tabler="IconMail"
              hugeicons="Mail01Icon"
              phosphor="EnvelopeIcon"
              remixicon="RiMailLine"
            ></svg>
          </div>
        </div>
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Card number" />
          <div kuiInputGroupAddon>
            <svg
              iconPlaceholder
              lucide="CreditCardIcon"
              tabler="IconCreditCard"
              hugeicons="CreditCardIcon"
              phosphor="CreditCardIcon"
              remixicon="RiBankCardLine"
            ></svg>
          </div>
          <div kuiInputGroupAddon align="inline-end">
            <svg
              iconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            ></svg>
          </div>
        </div>
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Card number" />
          <div kuiInputGroupAddon align="inline-end">
            <svg
              iconPlaceholder
              lucide="StarIcon"
              tabler="IconStar"
              hugeicons="StarIcon"
              phosphor="StarIcon"
              remixicon="RiStarLine"
            ></svg>
            <svg
              iconPlaceholder
              lucide="InfoIcon"
              tabler="IconInfoCircle"
              hugeicons="AlertCircleIcon"
              phosphor="InfoIcon"
              remixicon="RiInformationLine"
            ></svg>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class InputGroupIcon {
  protected readonly styles = styles
  protected readonly page = page
}
