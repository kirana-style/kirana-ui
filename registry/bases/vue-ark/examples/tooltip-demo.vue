<script setup lang="ts">
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
</script>

<template>
  <div :sx="page.example">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline"> Hover </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </div>
</template>
