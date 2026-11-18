<script setup lang="ts">
import { ref } from "vue"
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

const date = ref<Date | undefined>(new Date())
</script>

<template>
  <div :sx="page.example">
    <Calendar
      mode="single"
      v-model:selected="date"
      :sx="styles.bordered"
      caption-layout="dropdown"
    />
  </div>
</template>
