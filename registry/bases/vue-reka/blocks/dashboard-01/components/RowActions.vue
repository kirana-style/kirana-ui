<script setup lang="ts">
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"
import { Button } from "../../../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import { styles } from "./data-table"
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" :sx="styles.button" size="icon">
        <IconPlaceholder
          lucide="EllipsisVerticalIcon"
          tabler="IconDotsVertical"
          hugeicons="MoreVerticalCircle01Icon"
          phosphor="DotsThreeVerticalIcon"
          remixicon="RiMore2Line"
        />
        <span :sx="styles.span">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" :sx="styles.dropdownMenuContent">
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Make a copy</DropdownMenuItem>
      <DropdownMenuItem>Favorite</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
