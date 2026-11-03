<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Tabs default-value="account" orientation="vertical">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>
