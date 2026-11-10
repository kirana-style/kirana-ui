<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Toggle } from "../ui/toggle"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Toggle aria-label="Toggle italic">
      <IconPlaceholder
        lucide="ItalicIcon"
        tabler="IconItalic"
        hugeicons="TextItalicIcon"
        phosphor="TextItalicIcon"
        remixicon="RiItalic"
      />
      Italic
    </Toggle>
  </div>
</template>
