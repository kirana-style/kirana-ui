import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  dropdownMenu: css({
    minWidth: { "*": null, base: space[56] },
  }),
}

export default function DropdownMenuRadioIcons() {
  const [paymentMethod, setPaymentMethod] = React.useState("card")

  return (
    <div sx={page.example}>
      <DropdownMenuTrigger>
        <Button variant="outline">Payment Method</Button>
        <DropdownMenu sx={styles.dropdownMenu}>
          <DropdownMenuGroup
            selectionMode="single"
            selectedKeys={[paymentMethod]}
            onSelectionChange={(keys) =>
              setPaymentMethod([...(keys as Set<string>)][0] as string)
            }
          >
            <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
            <DropdownMenuItem id="card">
              <IconPlaceholder
                lucide="CreditCardIcon"
                tabler="IconCreditCard"
                hugeicons="CreditCardIcon"
                phosphor="CreditCardIcon"
                remixicon="RiBankCardLine"
              />
              Credit Card
            </DropdownMenuItem>
            <DropdownMenuItem id="paypal">
              <IconPlaceholder
                lucide="WalletIcon"
                tabler="IconWallet"
                hugeicons="Wallet01Icon"
                phosphor="WalletIcon"
                remixicon="RiWalletLine"
              />
              PayPal
            </DropdownMenuItem>
            <DropdownMenuItem id="bank">
              <IconPlaceholder
                lucide="Building2Icon"
                tabler="IconBuildingBank"
                hugeicons="BankIcon"
                phosphor="BankIcon"
                remixicon="RiBankLine"
              />
              Bank Transfer
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenu>
      </DropdownMenuTrigger>
    </div>
  )
}
