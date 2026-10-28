import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select"
import { fontFamily } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  fontMono: css({ fontFamily: fontFamily.mono }),
  textMutedForeground: css({ color: theme.mutedForeground }),
}

const CURRENCIES = [
  { label: "US Dollar", value: "$" },
  { label: "Euro", value: "€" },
  { label: "British Pound", value: "£" },
]

export default function ButtonGroupSelect() {
  const [currency, setCurrency] = React.useState("$")

  return (
    <div sx={page.example}>
      <ButtonGroup>
        <ButtonGroup>
          <Select
            items={CURRENCIES}
            value={currency}
            onValueChange={(value) => setCurrency(value as string)}
          >
            <SelectTrigger sx={styles.fontMono}>{currency}</SelectTrigger>
            <SelectContent alignItemWithTrigger={false} align="start">
              <SelectGroup>
                {CURRENCIES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.value}{" "}
                    <span sx={styles.textMutedForeground}>{item.label}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input placeholder="10.00" pattern="[0-9]*" />
        </ButtonGroup>
        <ButtonGroup>
          <Button aria-label="Send" size="icon" variant="outline">
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight01Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  )
}
