<script setup lang="ts">
import { ref } from "vue"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  dropdownMenuContent: css({
    width: { "*": null, base: space[40] },
  }),
}

const showStatusBar = ref(true)

const showActivityBar = ref(false)

const showPanel = ref(false)
</script>

<template>
  <div :sx="page.example">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline"> Open </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent :sx="styles.dropdownMenuContent">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem v-model:checked="showStatusBar"
            >Status Bar</DropdownMenuCheckboxItem
          >
          <DropdownMenuCheckboxItem v-model:checked="showActivityBar" disabled
            >Activity Bar</DropdownMenuCheckboxItem
          >
          <DropdownMenuCheckboxItem v-model:checked="showPanel"
            >Panel</DropdownMenuCheckboxItem
          >
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
