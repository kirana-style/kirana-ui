<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Button } from "../ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <ButtonGroup>
      <Button variant="secondary"> Button </Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="secondary">
        <IconPlaceholder
          lucide="PlusIcon"
          tabler="IconPlus"
          hugeicons="PlusSignIcon"
          phosphor="PlusIcon"
          remixicon="RiAddLine"
        />
      </Button>
    </ButtonGroup>
  </div>
</template>
