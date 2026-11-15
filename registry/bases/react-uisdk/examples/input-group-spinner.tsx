import { css, props as styleProps } from "@kirana-style/core"

import { spinner } from "../../../styles/spinner.styles"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group"
import { Spinner } from "../ui/spinner"
import { containerSize, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

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

export default function InputGroupSpinner() {
  return (
    <div sx={page.example}>
      <div sx={styles.gridWFullMaxWSmGap4}>
        <InputGroup>
          <InputGroupInput placeholder="Searching..." />
          <InputGroupAddon align="inline-end">
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Processing..." />
          <InputGroupAddon>
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Saving changes..." />
          <InputGroupAddon align="inline-end">
            <InputGroupText>Saving...</InputGroupText>
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupInput placeholder="Refreshing data..." />
          <InputGroupAddon>
            <IconPlaceholder
              lucide="LoaderIcon"
              tabler="IconLoader"
              hugeicons="Loading03Icon"
              phosphor="SpinnerIcon"
              remixicon="RiLoader4Line"
              {...styleProps(styles.animateSpin)}
            />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupText sx={styles.textMutedForeground}>
              Please wait...
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}
