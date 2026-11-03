<script setup lang="ts">
import { Button } from "../ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <ButtonGroup>
      <Button variant="secondary" size="sm"> Copy </Button>
      <ButtonGroupSeparator />
      <Button variant="secondary" size="sm"> Paste </Button>
    </ButtonGroup>
  </div>
</template>
