import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const styles = {
  dropdownMenuContent: css({
    minWidth: { "*": null, base: space[56] },
  }),
}

@Component({
  selector: "dropdown-menu-radio-icons",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDropdownMenu>
        <button kuiButton kuiDropdownMenuTrigger variant="outline">
          Payment Method
        </button>
        <div kuiDropdownMenuContent [sx]="styles.dropdownMenuContent">
          <div kuiDropdownMenuGroup>
            <div kuiDropdownMenuLabel>Select Payment Method</div>
            <div kuiDropdownMenuRadioGroup [(value)]="paymentMethod">
              <div kuiDropdownMenuRadioItem value="card">
                <svg
                  iconPlaceholder
                  lucide="CreditCardIcon"
                  tabler="IconCreditCard"
                  hugeicons="CreditCardIcon"
                  phosphor="CreditCardIcon"
                  remixicon="RiBankCardLine"
                ></svg>
                Credit Card
              </div>
              <div kuiDropdownMenuRadioItem value="paypal">
                <svg
                  iconPlaceholder
                  lucide="WalletIcon"
                  tabler="IconWallet"
                  hugeicons="Wallet01Icon"
                  phosphor="WalletIcon"
                  remixicon="RiWalletLine"
                ></svg>
                PayPal
              </div>
              <div kuiDropdownMenuRadioItem value="bank">
                <svg
                  iconPlaceholder
                  lucide="Building2Icon"
                  tabler="IconBuildingBank"
                  hugeicons="BankIcon"
                  phosphor="BankIcon"
                  remixicon="RiBankLine"
                ></svg>
                Bank Transfer
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DropdownMenuRadioIcons {
  protected readonly paymentMethod = signal("card")
  protected readonly styles = styles
  protected readonly page = page
}
