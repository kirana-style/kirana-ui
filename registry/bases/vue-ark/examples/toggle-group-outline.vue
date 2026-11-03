<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <ToggleGroup variant="outline" :default-value="['all']">
      <ToggleGroupItem value="all" aria-label="Toggle all">
        All
      </ToggleGroupItem>
      <ToggleGroupItem value="missed" aria-label="Toggle missed">
        Missed
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
