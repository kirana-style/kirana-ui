<script setup lang="ts">
import { css } from "@kirana-style/core"
import { Calendar } from "../ui/calendar"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  bordered: css({
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
}
</script>

<template>
  <div :sx="page.example">
    <Calendar mode="single" :sx="styles.bordered" />
  </div>
</template>
