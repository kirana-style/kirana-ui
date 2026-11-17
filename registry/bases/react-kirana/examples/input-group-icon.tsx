import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  gridWFullMaxWSmGap6: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    gap: { "*": null, base: space[6] },
  }),
}

export default function InputGroupIcon() {
  return (
    <div sx={page.example}>
      <div sx={styles.gridWFullMaxWSmGap6}>
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput type="email" placeholder="Enter your email" />
          <InputGroupAddon>
            <IconPlaceholder
              lucide="MailIcon"
              tabler="IconMail"
              hugeicons="Mail01Icon"
              phosphor="EnvelopeIcon"
              remixicon="RiMailLine"
            />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Card number" />
          <InputGroupAddon>
            <IconPlaceholder
              lucide="CreditCardIcon"
              tabler="IconCreditCard"
              hugeicons="CreditCardIcon"
              phosphor="CreditCardIcon"
              remixicon="RiBankCardLine"
            />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <IconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Card number" />
          <InputGroupAddon align="inline-end">
            <IconPlaceholder
              lucide="StarIcon"
              tabler="IconStar"
              hugeicons="StarIcon"
              phosphor="StarIcon"
              remixicon="RiStarLine"
            />
            <IconPlaceholder
              lucide="InfoIcon"
              tabler="IconInfoCircle"
              hugeicons="AlertCircleIcon"
              phosphor="InfoIcon"
              remixicon="RiInformationLine"
            />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
