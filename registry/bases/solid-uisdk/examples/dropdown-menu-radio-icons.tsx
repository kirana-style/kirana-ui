import { createSignal } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
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
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function DropdownMenuRadioIcons() {
  const styles = {
    dropdownMenuContent: css({
      minWidth: { "*": null, base: space[56] },
    }),
  }

  const [paymentMethod, setPaymentMethod] = createSignal("card")

  return (
    <div sx={page.example}>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Payment Method
            </Button>
          )}
        />
        <DropdownMenuContent sx={styles.dropdownMenuContent}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={paymentMethod()}
              onValueChange={(details: {
                value: ReturnType<typeof paymentMethod>
              }) => setPaymentMethod(details.value)}
            >
              <DropdownMenuRadioItem value="card">
                <IconPlaceholder
                  lucide="CreditCardIcon"
                  tabler="IconCreditCard"
                  hugeicons="CreditCardIcon"
                  phosphor="CreditCardIcon"
                  remixicon="RiBankCardLine"
                />{" "}
                Credit Card
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="paypal">
                <IconPlaceholder
                  lucide="WalletIcon"
                  tabler="IconWallet"
                  hugeicons="Wallet01Icon"
                  phosphor="WalletIcon"
                  remixicon="RiWalletLine"
                />{" "}
                PayPal
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bank">
                <IconPlaceholder
                  lucide="Building2Icon"
                  tabler="IconBuildingBank"
                  hugeicons="BankIcon"
                  phosphor="BankIcon"
                  remixicon="RiBankLine"
                />{" "}
                Bank Transfer
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
