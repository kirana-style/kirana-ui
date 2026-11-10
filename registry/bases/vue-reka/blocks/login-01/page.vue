<script setup lang="ts">
import { css } from "@kirana-style/core"
import { breakpoint, containerSize, space } from "../../../../core/scales"
import LoginForm from "./components/LoginForm.vue"

const styles = {
  page: css({
    display: "flex",
    minHeight: "100svh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  column: css({ width: "100%", maxWidth: containerSize.sm }),
}
</script>

<template>
  <div :sx="styles.page">
    <div :sx="styles.column">
      <LoginForm />
    </div>
  </div>
</template>
