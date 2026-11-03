<script setup lang="ts">
import { Button } from "../ui/button"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Button variant="ghost">Ghost</Button>
  </div>
</template>
