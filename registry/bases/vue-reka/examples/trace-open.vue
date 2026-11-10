<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import { CodeBlock, CodeBlockContent } from "../ui/code-block"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../ui/trace"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexWFullMaxWSmFlexColIt: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: { "*": null, base: space[4] },
  }),
  maxH64: css({ maxHeight: space[64] }),
}

const open = ref(false)
</script>

<template>
  <div :sx="page.example">
    <div :sx="styles.flexWFullMaxWSmFlexColIt">
      <TraceCollapsible default-open>
        <TraceCollapsibleTrigger>
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
            <TraceTitle> Ran node --version </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap :sx="styles.maxH64">{{
              "$ node --version\nv24.18.0"
            }}</CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceCollapsible v-model:open="open">
        <TraceCollapsibleTrigger>
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
            <TraceTitle> Ran pnpm --version </TraceTitle>
          </TraceLine>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <CodeBlock size="sm">
            <CodeBlockContent wrap :sx="styles.maxH64">{{
              "$ pnpm --version\n10.33.4"
            }}</CodeBlockContent>
          </CodeBlock>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <Button variant="outline" size="sm" @click="() => (open = !open)">
        {{ open ? "Hide" : "Show" }} the pnpm output
      </Button>
    </div>
  </div>
</template>
