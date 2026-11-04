import { IconPlaceholder } from "../ui/icon-placeholder"
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Kbd, KbdGroup } from "../ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { space, spacing } from "../../../core/scales"

export default function KbdExample() {
  const styles = {
    pair: css({ display: "flex", alignItems: "center", gap: space[2] }),
    pr15: css({ paddingRight: { "*": null, base: spacing(1.5) } }),
  }

  return (
    <ExampleWrapper>
      <Example title="Basic">
        <div sx={styles.pair}>
          <Kbd>Ctrl</Kbd>
          <Kbd>⌘K</Kbd>
          <Kbd>Ctrl + B</Kbd>
        </div>
      </Example>
      <Example title="Modifier Keys">
        <div sx={styles.pair}>
          <Kbd>⌘</Kbd>
          <Kbd>C</Kbd>
        </div>
      </Example>
      <Example title="KbdGroup">
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>P</Kbd>
        </KbdGroup>
      </Example>
      <Example title="Arrow Keys">
        <div sx={styles.pair}>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <Kbd>←</Kbd>
          <Kbd>→</Kbd>
        </div>
      </Example>
      <Example title="With Icons">
        <KbdGroup>
          <Kbd>
            <IconPlaceholder
              lucide="CircleDashedIcon"
              tabler="IconCircleDashed"
              hugeicons="DashedLineCircleIcon"
              phosphor="CircleDashedIcon"
              remixicon="RiLoaderLine"
            />
          </Kbd>
          <Kbd>
            <IconPlaceholder
              lucide="ArrowLeftIcon"
              tabler="IconArrowLeft"
              hugeicons="ArrowLeft01Icon"
              phosphor="ArrowLeftIcon"
              remixicon="RiArrowLeftLine"
            />
          </Kbd>
          <Kbd>
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight01Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            />
          </Kbd>
        </KbdGroup>
      </Example>
      <Example title="With Icons and Text">
        <KbdGroup>
          <Kbd>
            <IconPlaceholder
              lucide="ArrowLeftIcon"
              tabler="IconArrowLeft"
              hugeicons="ArrowLeft01Icon"
              phosphor="ArrowLeftIcon"
              remixicon="RiArrowLeftLine"
            />{" "}
            Left
          </Kbd>
          <Kbd>
            <IconPlaceholder
              lucide="CircleDashedIcon"
              tabler="IconCircleDashed"
              hugeicons="DashedLineCircleIcon"
              phosphor="CircleDashedIcon"
              remixicon="RiLoaderLine"
            />{" "}
            Voice Enabled
          </Kbd>
        </KbdGroup>
      </Example>
      <Example title="InputGroup">
        <InputGroup>
          <InputGroupInput />
          <InputGroupAddon>
            <Kbd>Space</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </Example>
      <Example title="Tooltip">
        <Tooltip>
          <TooltipTrigger
            asChild={(props) => (
              <Button {...props()} size="icon-sm" variant="outline">
                <IconPlaceholder
                  lucide="SaveIcon"
                  tabler="IconDeviceFloppy"
                  hugeicons="FloppyDiskIcon"
                  phosphor="FloppyDiskIcon"
                  remixicon="RiSaveLine"
                />
              </Button>
            )}
          />
          <TooltipContent sx={styles.pr15}>
            <div sx={styles.pair}>
              Save Changes <Kbd>S</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
      </Example>
      <Example title="With samp">
        <Kbd>
          <samp>File</samp>
        </Kbd>
      </Example>
    </ExampleWrapper>
  )
}
