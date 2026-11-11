<script lang="ts">
  /**
   * An icon this block's data names, drawn by a placeholder written out for each, as React's data
   * holds placeholder elements: a project's installer resolves only a placeholder whose
   * icons are written on it.
   */
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"

  let { icon }: {
    icon: {
      lucide: string
      tabler: string
      hugeicons: string
      phosphor: string
      remixicon: string
    }
  } = $props()
</script>

{#if icon.lucide === 'GalleryVerticalEndIcon'}
  <IconPlaceholder lucide="GalleryVerticalEndIcon" tabler="IconLayoutRows" hugeicons="LayoutBottomIcon" phosphor="RowsIcon" remixicon="RiGalleryLine" />
{:else if icon.lucide === 'AudioLinesIcon'}
  <IconPlaceholder lucide="AudioLinesIcon" tabler="IconWaveSine" hugeicons="AudioWave01Icon" phosphor="WaveformIcon" remixicon="RiPulseLine" />
{:else if icon.lucide === 'CommandIcon'}
  <IconPlaceholder lucide="CommandIcon" tabler="IconCommand" hugeicons="CommandIcon" phosphor="CommandIcon" remixicon="RiCommandLine" />
{:else if icon.lucide === 'TerminalSquareIcon'}
  <IconPlaceholder lucide="TerminalSquareIcon" tabler="IconTerminal2" hugeicons="ComputerTerminalIcon" phosphor="TerminalIcon" remixicon="RiTerminalBoxLine" />
{:else if icon.lucide === 'BotIcon'}
  <IconPlaceholder lucide="BotIcon" tabler="IconRobot" hugeicons="RoboticIcon" phosphor="RobotIcon" remixicon="RiRobotLine" />
{:else if icon.lucide === 'BookOpenIcon'}
  <IconPlaceholder lucide="BookOpenIcon" tabler="IconBook" hugeicons="BookOpen02Icon" phosphor="BookOpenIcon" remixicon="RiBookOpenLine" />
{:else if icon.lucide === 'Settings2Icon'}
  <IconPlaceholder lucide="Settings2Icon" tabler="IconSettings" hugeicons="Settings05Icon" phosphor="GearIcon" remixicon="RiSettingsLine" />
{:else if icon.lucide === 'FrameIcon'}
  <IconPlaceholder lucide="FrameIcon" tabler="IconFrame" hugeicons="CropIcon" phosphor="CropIcon" remixicon="RiCropLine" />
{:else if icon.lucide === 'PieChartIcon'}
  <IconPlaceholder lucide="PieChartIcon" tabler="IconChartPie" hugeicons="PieChartIcon" phosphor="ChartPieIcon" remixicon="RiPieChartLine" />
{:else if icon.lucide === 'MapIcon'}
  <IconPlaceholder lucide="MapIcon" tabler="IconMap" hugeicons="MapsIcon" phosphor="MapTrifoldIcon" remixicon="RiMapLine" />
{/if}
