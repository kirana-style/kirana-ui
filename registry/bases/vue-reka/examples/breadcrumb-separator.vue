<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { page } from "../../../styles/page.styles"
</script>

<template>
  <div :sx="page.example">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink as-child>
            <a href="/"> Home </a>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <IconPlaceholder
            lucide="DotIcon"
            tabler="IconPoint"
            hugeicons="DotIcon"
            phosphor="DotIcon"
            remixicon="RiCheckboxBlankCircleFill"
          />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink as-child>
            <a href="/components"> Components </a>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <IconPlaceholder
            lucide="DotIcon"
            tabler="IconPoint"
            hugeicons="DotIcon"
            phosphor="DotIcon"
            remixicon="RiCheckboxBlankCircleFill"
          />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</template>
