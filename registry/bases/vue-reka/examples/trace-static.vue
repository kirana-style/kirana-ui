<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { Trace, TraceIcon, TraceLine, TraceTitle } from "../ui/trace"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
}
</script>

<template>
  <div :sx="page.example">
    <Trace :sx="styles.narrow">
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder
            lucide="GitBranchIcon"
            tabler="IconGitBranch"
            hugeicons="GitBranchIcon"
            phosphor="GitBranchIcon"
            remixicon="RiGitBranchLine"
          />
        </TraceIcon>
        <TraceTitle> Created branch fix/frozen-lockfile </TraceTitle>
      </TraceLine>
    </Trace>
  </div>
</template>
