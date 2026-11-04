import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "../ui/input-group"
import { Spinner } from "../ui/spinner"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

export default function SpinnerInputGroup() {
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

  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWMdFlexColGa}>
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." disabled />
          <InputGroupAddon align="inline-end">
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupTextarea placeholder="Send a message..." disabled />
          <InputGroupAddon align="block-end">
            <Spinner /> Validating...{" "}
            <InputGroupButton sx={styles.mlAuto} variant="default">
              <IconPlaceholder
                lucide="ArrowUpIcon"
                tabler="IconArrowUp"
                hugeicons="ArrowUp02Icon"
                phosphor="ArrowUpIcon"
                remixicon="RiArrowUpLine"
              />
              <span sx={visuallyHidden}>Send</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
