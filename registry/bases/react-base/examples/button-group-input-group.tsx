import { css } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { radiusBase } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { color } from "../../../core/scales"

const styles = {
  radius9999Rem: css({ [radiusBase.value]: "9999rem" }),
  dataActiveTrueBgOrange10: css({
    backgroundColor: {
      '[data-active="true"]': `light-dark(${color.orange[100]}, ${color.orange[800]})`,
    },
    color: {
      '[data-active="true"]': `light-dark(${color.orange[700]}, ${color.orange[100]})`,
    },
  }),
}

export default function ButtonGroupInputGroup() {
  const [voiceEnabled, setVoiceEnabled] = React.useState(false)

  return (
    <div sx={page.example}>
      <ButtonGroup sx={styles.radius9999Rem}>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <InputGroup>
            <InputGroupInput
              placeholder={
                voiceEnabled ? "Record and send audio..." : "Send a message..."
              }
              disabled={voiceEnabled}
            />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <InputGroupButton
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                      size="icon-xs"
                      data-active={voiceEnabled}
                      sx={styles.dataActiveTrueBgOrange10}
                      aria-pressed={voiceEnabled}
                    />
                  }
                >
                  <IconPlaceholder
                    lucide="AudioLinesIcon"
                    tabler="IconWaveSine"
                    hugeicons="AudioWave01Icon"
                    phosphor="WaveformIcon"
                    remixicon="RiPulseLine"
                  />
                </TooltipTrigger>
                <TooltipContent>Voice Mode</TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  )
}
