<script setup lang="ts">
/**
 * An icon this block's data names, drawn by a placeholder written out for each, as React's data
 * holds placeholder elements: a project's installer resolves only a placeholder whose
 * icons are written on it.
 */
import IconPlaceholder from "../../../../../icons/IconPlaceholder.vue"

defineProps<{
  icon: {
    lucide: string
    tabler: string
    hugeicons: string
    phosphor: string
    remixicon: string
  }
}>()
</script>

<template>
  <IconPlaceholder
    v-if="icon.lucide === 'LayoutDashboardIcon'"
    lucide="LayoutDashboardIcon"
    tabler="IconDashboard"
    hugeicons="DashboardSquare01Icon"
    phosphor="SquaresFourIcon"
    remixicon="RiDashboardLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'ListIcon'"
    lucide="ListIcon"
    tabler="IconListDetails"
    hugeicons="Menu01Icon"
    phosphor="ListIcon"
    remixicon="RiListUnordered"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'ChartBarIcon'"
    lucide="ChartBarIcon"
    tabler="IconChartBar"
    hugeicons="ChartHistogramIcon"
    phosphor="ChartBarIcon"
    remixicon="RiBarChartLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'FolderIcon'"
    lucide="FolderIcon"
    tabler="IconFolder"
    hugeicons="Folder01Icon"
    phosphor="FolderIcon"
    remixicon="RiFolderLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'UsersIcon'"
    lucide="UsersIcon"
    tabler="IconUsers"
    hugeicons="UserGroupIcon"
    phosphor="UsersIcon"
    remixicon="RiGroupLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'CameraIcon'"
    lucide="CameraIcon"
    tabler="IconCamera"
    hugeicons="Camera01Icon"
    phosphor="CameraIcon"
    remixicon="RiCameraLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'FileTextIcon'"
    lucide="FileTextIcon"
    tabler="IconFileAi"
    hugeicons="File01Icon"
    phosphor="FileTextIcon"
    remixicon="RiFileTextLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'Settings2Icon'"
    lucide="Settings2Icon"
    tabler="IconSettings"
    hugeicons="Settings05Icon"
    phosphor="GearIcon"
    remixicon="RiSettingsLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'CircleHelpIcon'"
    lucide="CircleHelpIcon"
    tabler="IconHelp"
    hugeicons="HelpCircleIcon"
    phosphor="QuestionIcon"
    remixicon="RiQuestionLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'SearchIcon'"
    lucide="SearchIcon"
    tabler="IconSearch"
    hugeicons="SearchIcon"
    phosphor="MagnifyingGlassIcon"
    remixicon="RiSearchLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'DatabaseIcon'"
    lucide="DatabaseIcon"
    tabler="IconDatabase"
    hugeicons="Database01Icon"
    phosphor="DatabaseIcon"
    remixicon="RiDatabase2Line"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'FileChartColumnIcon'"
    lucide="FileChartColumnIcon"
    tabler="IconReport"
    hugeicons="Analytics01Icon"
    phosphor="ChartLineIcon"
    remixicon="RiFileChartLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'FileIcon'"
    lucide="FileIcon"
    tabler="IconFileWord"
    hugeicons="File01Icon"
    phosphor="FileIcon"
    remixicon="RiFileLine"
  />
</template>
