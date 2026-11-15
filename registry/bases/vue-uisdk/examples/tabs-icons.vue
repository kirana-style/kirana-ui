<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Tabs default-value="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <IconPlaceholder
            lucide="AppWindowIcon"
            tabler="IconAppWindow"
            hugeicons="CursorInWindowIcon"
            phosphor="AppWindowIcon"
            remixicon="RiWindowLine"
          />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <IconPlaceholder
            lucide="CodeIcon"
            tabler="IconBrandJavascript"
            hugeicons="CodeIcon"
            phosphor="CodeIcon"
            remixicon="RiCodeLine"
          />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>
