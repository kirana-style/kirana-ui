<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { spinner } from "../../../styles/spinner.styles"

const styles = {
  row: css({ display: "flex", alignItems: "center", gap: space[4] }),
}
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.row">
      <!-- Spinner -->
      <IconPlaceholder
        lucide="LoaderIcon"
        tabler="IconLoader"
        hugeicons="Loading03Icon"
        phosphor="SpinnerIcon"
        remixicon="RiLoader4Line"
        role="status"
        aria-label="Loading"
        :sx="spinner"
      />
    </div>
  </div>
</template>
