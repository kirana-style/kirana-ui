<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { page } from "../../../styles/page.styles"

const styles = {
  fit: css({ width: "fit-content" }),
}
</script>

<template>
  <div :sx="page.example">
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline" :sx="styles.fit"> Open Popover </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription
            >Set the dimensions for the layer.</PopoverDescription
          >
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  </div>
</template>
