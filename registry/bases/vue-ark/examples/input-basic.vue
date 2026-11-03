<script setup lang="ts">
import { Input } from "../ui/input"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Input placeholder="Enter text" />
  </div>
</template>
