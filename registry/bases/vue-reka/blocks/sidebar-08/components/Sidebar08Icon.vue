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
    v-if="icon.lucide === 'TerminalSquareIcon'"
    lucide="TerminalSquareIcon"
    tabler="IconTerminal2"
    hugeicons="ComputerTerminalIcon"
    phosphor="TerminalIcon"
    remixicon="RiTerminalBoxLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'BotIcon'"
    lucide="BotIcon"
    tabler="IconRobot"
    hugeicons="RoboticIcon"
    phosphor="RobotIcon"
    remixicon="RiRobotLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'BookOpenIcon'"
    lucide="BookOpenIcon"
    tabler="IconBook"
    hugeicons="BookOpen02Icon"
    phosphor="BookOpenIcon"
    remixicon="RiBookOpenLine"
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
    v-else-if="icon.lucide === 'LifeBuoyIcon'"
    lucide="LifeBuoyIcon"
    tabler="IconLifebuoy"
    hugeicons="ChartRingIcon"
    phosphor="LifebuoyIcon"
    remixicon="RiLifebuoyLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'SendIcon'"
    lucide="SendIcon"
    tabler="IconSend"
    hugeicons="SentIcon"
    phosphor="PaperPlaneTiltIcon"
    remixicon="RiSendPlaneLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'FrameIcon'"
    lucide="FrameIcon"
    tabler="IconFrame"
    hugeicons="CropIcon"
    phosphor="CropIcon"
    remixicon="RiCropLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'PieChartIcon'"
    lucide="PieChartIcon"
    tabler="IconChartPie"
    hugeicons="PieChartIcon"
    phosphor="ChartPieIcon"
    remixicon="RiPieChartLine"
  />
  <IconPlaceholder
    v-else-if="icon.lucide === 'MapIcon'"
    lucide="MapIcon"
    tabler="IconMap"
    hugeicons="MapsIcon"
    phosphor="MapTrifoldIcon"
    remixicon="RiMapLine"
  />
</template>
