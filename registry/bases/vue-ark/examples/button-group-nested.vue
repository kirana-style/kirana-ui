<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <ButtonGroup>
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
          <InputGroupInput placeholder="Send a message..." />
          <Tooltip>
            <TooltipTrigger as-child>
              <InputGroupAddon align="inline-end">
                <IconPlaceholder
                  lucide="AudioLinesIcon"
                  tabler="IconWaveSine"
                  hugeicons="AudioWave01Icon"
                  phosphor="WaveformIcon"
                  remixicon="RiPulseLine"
                />
              </InputGroupAddon>
            </TooltipTrigger>
            <TooltipContent> Voice Mode </TooltipContent>
          </Tooltip>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  </div>
</template>
