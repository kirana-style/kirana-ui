<script setup lang="ts">
import { ColorPicker } from "../ui/color-picker"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <ColorPicker default-value="#2563eb" />
  </div>
</template>
