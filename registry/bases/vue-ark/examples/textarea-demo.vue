<script setup lang="ts">
import { page } from "../../../styles/page.styles"
import { Textarea } from "../ui/textarea"
</script>

<template>
  <div :sx="page.example">
    <Textarea :sx="page.narrow" placeholder="Type your message here." />
  </div>
</template>
