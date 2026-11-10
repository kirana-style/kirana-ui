<script setup lang="ts">
import SettingsDialog from "./components/SettingsDialog.vue"
import { css } from "@kirana-style/core"

const styles = {
  pageDiv: css({
    display: "flex",
    height: "100svh",
    alignItems: "center",
    justifyContent: "center",
  }),
}
</script>

<template>
  <div :sx="styles.pageDiv">
    <SettingsDialog />
  </div>
</template>
