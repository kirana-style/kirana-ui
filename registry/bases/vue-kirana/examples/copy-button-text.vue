<script setup lang="ts">
import { CopyButton } from "../ui/copy-button"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <CopyButton
      value="https://ui.kirana.style/docs/components/copy-button"
      variant="outline"
      size="sm"
      copied-label="Link copied"
    >
      Copy link
    </CopyButton>
  </div>
</template>
