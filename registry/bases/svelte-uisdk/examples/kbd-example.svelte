<script lang="ts">
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { css } from "@kirana-style/core"
  import { Example, ExampleWrapper } from "../components/example"
  import { Button } from "../ui/button"
  import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
  import { Kbd, KbdGroup } from "../ui/kbd"
  import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
  import { space, spacing } from "../../../core/scales"

  const styles = {
    pair: css({ display: "flex", alignItems: "center", gap: space[2] }),
    pr15: css({ paddingRight: { "*": null, base: spacing(1.5) } }),
  }
</script>

<ExampleWrapper>
  <!-- KbdBasic -->
  <Example title="Basic">
    <div sx={styles.pair}>
      <Kbd>
        Ctrl
      </Kbd>
      <Kbd>
        ⌘K
      </Kbd>
      <Kbd>
        Ctrl + B
      </Kbd>
    </div>
  </Example>
  <!-- KbdModifierKeys -->
  <Example title="Modifier Keys">
    <div sx={styles.pair}>
      <Kbd>
        ⌘
      </Kbd>
      <Kbd>
        C
      </Kbd>
    </div>
  </Example>
  <!-- KbdGroupExample -->
  <Example title="KbdGroup">
    <KbdGroup>
      <Kbd>
        Ctrl
      </Kbd>
      <Kbd>
        Shift
      </Kbd>
      <Kbd>
        P
      </Kbd>
    </KbdGroup>
  </Example>
  <!-- KbdArrowKeys -->
  <Example title="Arrow Keys">
    <div sx={styles.pair}>
      <Kbd>
        ↑
      </Kbd>
      <Kbd>
        ↓
      </Kbd>
      <Kbd>
        ←
      </Kbd>
      <Kbd>
        →
      </Kbd>
    </div>
  </Example>
  <!-- KbdWithIcons -->
  <Example title="With Icons">
    <KbdGroup>
      <Kbd>
        <IconPlaceholder lucide="CircleDashedIcon" tabler="IconCircleDashed" hugeicons="DashedLineCircleIcon" phosphor="CircleDashedIcon" remixicon="RiLoaderLine" />
      </Kbd>
      <Kbd>
        <IconPlaceholder lucide="ArrowLeftIcon" tabler="IconArrowLeft" hugeicons="ArrowLeft01Icon" phosphor="ArrowLeftIcon" remixicon="RiArrowLeftLine" />
      </Kbd>
      <Kbd>
        <IconPlaceholder lucide="ArrowRightIcon" tabler="IconArrowRight" hugeicons="ArrowRight01Icon" phosphor="ArrowRightIcon" remixicon="RiArrowRightLine" />
      </Kbd>
    </KbdGroup>
  </Example>
  <!-- KbdWithIconsAndText -->
  <Example title="With Icons and Text">
    <KbdGroup>
      <Kbd>
        <IconPlaceholder lucide="ArrowLeftIcon" tabler="IconArrowLeft" hugeicons="ArrowLeft01Icon" phosphor="ArrowLeftIcon" remixicon="RiArrowLeftLine" />
        Left
      </Kbd>
      <Kbd>
        <IconPlaceholder lucide="CircleDashedIcon" tabler="IconCircleDashed" hugeicons="DashedLineCircleIcon" phosphor="CircleDashedIcon" remixicon="RiLoaderLine" />
        Voice Enabled
      </Kbd>
    </KbdGroup>
  </Example>
  <!-- KbdInInputGroup -->
  <Example title="InputGroup">
    <InputGroup>
      <InputGroupInput />
      <InputGroupAddon>
        <Kbd>
          Space
        </Kbd>
      </InputGroupAddon>
    </InputGroup>
  </Example>
  <!-- KbdInTooltip -->
  <Example title="Tooltip">
    <Tooltip>
      <TooltipTrigger>
        {#snippet asChild(props)}
          <Button {...props()} size="icon-sm" variant="outline">
            <IconPlaceholder lucide="SaveIcon" tabler="IconDeviceFloppy" hugeicons="FloppyDiskIcon" phosphor="FloppyDiskIcon" remixicon="RiSaveLine" />
          </Button>
        {/snippet}
      </TooltipTrigger>
      <TooltipContent sx={styles.pr15}>
        <div sx={styles.pair}>
          Save Changes
          <Kbd>
            S
          </Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  </Example>
  <!-- KbdWithSamp -->
  <Example title="With samp">
    <Kbd>
      <samp>
        File
      </samp>
    </Kbd>
  </Example>
</ExampleWrapper>
