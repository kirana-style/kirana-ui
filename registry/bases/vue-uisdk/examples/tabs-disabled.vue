<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Tabs default-value="home">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="settings" disabled>Disabled</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>
