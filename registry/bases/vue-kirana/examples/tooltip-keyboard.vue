<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline" size="icon-sm">
          <IconPlaceholder
            lucide="SaveIcon"
            tabler="IconDeviceFloppy"
            hugeicons="FloppyDiskIcon"
            phosphor="FloppyDiskIcon"
            remixicon="RiSaveLine"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Save Changes
        <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  </div>
</template>
