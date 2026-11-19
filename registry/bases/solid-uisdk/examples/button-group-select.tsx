import { For, createSignal } from "solid-js"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
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

export default function ButtonGroupSelect() {
  const styles = {
    fontMono: css({ fontFamily: fontFamily.mono }),
    textMutedForeground: css({ color: theme.mutedForeground }),
  }

  const CURRENCIES = [
    { label: "US Dollar", value: "$" },
    { label: "Euro", value: "€" },
    { label: "British Pound", value: "£" },
  ]

  const [currency, setCurrency] = createSignal("$")

  return (
    <div sx={page.example}>
      <ButtonGroup>
        <ButtonGroup>
          <Select
            items={CURRENCIES}
            value={currency()}
            onValueChange={(details: { value: ReturnType<typeof currency> }) =>
              setCurrency(details.value)
            }
          >
            <SelectTrigger sx={styles.fontMono}>{currency()}</SelectTrigger>
            <SelectContent alignItemWithTrigger={false} align="start">
              <SelectGroup>
                <For each={CURRENCIES}>
                  {(item) => (
                    <SelectItem value={item.value}>
                      {item.value}{" "}
                      <span sx={styles.textMutedForeground}>{item.label}</span>
                    </SelectItem>
                  )}
                </For>
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
