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
            lucide="SearchIcon"
            tabler="IconSearch"
            hugeicons="SearchIcon"
            phosphor="MagnifyingGlassIcon"
            remixicon="RiSearchLine"
          />
        </TraceIcon>
        <TraceTitle> Searched for minimumReleaseAge </TraceTitle>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder
            lucide="FileTextIcon"
            tabler="IconFileText"
            hugeicons="FileIcon"
            phosphor="FileTextIcon"
            remixicon="RiFileTextLine"
          />
        </TraceIcon>
        <TraceTitle> Read pnpm-workspace.yaml </TraceTitle>
      </TraceLine>
      <TraceLine>
        <TraceIcon>
          <IconPlaceholder
            lucide="CommandIcon"
            tabler="IconCommand"
            hugeicons="CommandIcon"
            phosphor="CommandIcon"
            remixicon="RiCommandLine"
          />
        </TraceIcon>
        <TraceTitle> Ran pnpm install </TraceTitle>
      </TraceLine>
    </Trace>
  </div>
</template>
