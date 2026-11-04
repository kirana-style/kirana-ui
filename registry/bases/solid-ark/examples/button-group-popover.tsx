import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { Textarea } from "../ui/textarea"
import { fontSize, lineHeight } from "../../../core/scales"
import { radius } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

export default function ButtonGroupPopover() {
  const styles = {
    roundedXlTextSm: css({
      borderRadius: radius.xl,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
    }),
    resizeNone: css({ resize: "none" }),
  }

  return (
    <div sx={page.example}>
      <ButtonGroup>
        <Button variant="outline">
          <IconPlaceholder
            lucide="BotIcon"
            tabler="IconRobot"
            hugeicons="RoboticIcon"
            phosphor="RobotIcon"
            remixicon="RiRobotLine"
          />{" "}
          Copilot
        </Button>
        <Popover>
          <PopoverTrigger
            asChild={(props) => (
              <Button
                {...props()}
                variant="outline"
                size="icon"
                aria-label="Open Popover"
              >
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                />
              </Button>
            )}
          />
          <PopoverContent align="end" sx={styles.roundedXlTextSm}>
            <PopoverHeader>
              <PopoverTitle>Start a new task with Copilot</PopoverTitle>
              <PopoverDescription>
                Describe your task in natural language.
              </PopoverDescription>
            </PopoverHeader>
            <Field>
              <FieldLabel for="task" sx={visuallyHidden}>
                Task Description
              </FieldLabel>
              <Textarea
                id="task"
                placeholder="I need to..."
                sx={styles.resizeNone}
              />
              <FieldDescription>
                Copilot will open a pull request for review.
              </FieldDescription>
            </Field>
          </PopoverContent>
        </Popover>
      </ButtonGroup>
    </div>
  )
}
