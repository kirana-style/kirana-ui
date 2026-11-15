<script setup lang="ts">
import { ref } from "vue"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  demoDropdownMenuContent: css({
    width: { "*": null, base: space[32] },
  }),
}

const position = ref("bottom")
</script>

<template>
  <div :sx="page.example">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline"> Open </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent :sx="styles.demoDropdownMenuContent">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuRadioGroup v-model="position">
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
