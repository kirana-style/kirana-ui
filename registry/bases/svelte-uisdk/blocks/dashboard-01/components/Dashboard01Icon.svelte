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

{#if icon.lucide === 'LayoutDashboardIcon'}
  <IconPlaceholder lucide="LayoutDashboardIcon" tabler="IconDashboard" hugeicons="DashboardSquare01Icon" phosphor="SquaresFourIcon" remixicon="RiDashboardLine" />
{:else if icon.lucide === 'ListIcon'}
  <IconPlaceholder lucide="ListIcon" tabler="IconListDetails" hugeicons="Menu01Icon" phosphor="ListIcon" remixicon="RiListUnordered" />
{:else if icon.lucide === 'ChartBarIcon'}
  <IconPlaceholder lucide="ChartBarIcon" tabler="IconChartBar" hugeicons="ChartHistogramIcon" phosphor="ChartBarIcon" remixicon="RiBarChartLine" />
{:else if icon.lucide === 'FolderIcon'}
  <IconPlaceholder lucide="FolderIcon" tabler="IconFolder" hugeicons="Folder01Icon" phosphor="FolderIcon" remixicon="RiFolderLine" />
{:else if icon.lucide === 'UsersIcon'}
  <IconPlaceholder lucide="UsersIcon" tabler="IconUsers" hugeicons="UserGroupIcon" phosphor="UsersIcon" remixicon="RiGroupLine" />
{:else if icon.lucide === 'CameraIcon'}
  <IconPlaceholder lucide="CameraIcon" tabler="IconCamera" hugeicons="Camera01Icon" phosphor="CameraIcon" remixicon="RiCameraLine" />
{:else if icon.lucide === 'FileTextIcon'}
  <IconPlaceholder lucide="FileTextIcon" tabler="IconFileAi" hugeicons="File01Icon" phosphor="FileTextIcon" remixicon="RiFileTextLine" />
{:else if icon.lucide === 'Settings2Icon'}
  <IconPlaceholder lucide="Settings2Icon" tabler="IconSettings" hugeicons="Settings05Icon" phosphor="GearIcon" remixicon="RiSettingsLine" />
{:else if icon.lucide === 'CircleHelpIcon'}
  <IconPlaceholder lucide="CircleHelpIcon" tabler="IconHelp" hugeicons="HelpCircleIcon" phosphor="QuestionIcon" remixicon="RiQuestionLine" />
{:else if icon.lucide === 'SearchIcon'}
  <IconPlaceholder lucide="SearchIcon" tabler="IconSearch" hugeicons="SearchIcon" phosphor="MagnifyingGlassIcon" remixicon="RiSearchLine" />
{:else if icon.lucide === 'DatabaseIcon'}
  <IconPlaceholder lucide="DatabaseIcon" tabler="IconDatabase" hugeicons="Database01Icon" phosphor="DatabaseIcon" remixicon="RiDatabase2Line" />
{:else if icon.lucide === 'FileChartColumnIcon'}
  <IconPlaceholder lucide="FileChartColumnIcon" tabler="IconReport" hugeicons="Analytics01Icon" phosphor="ChartLineIcon" remixicon="RiFileChartLine" />
{:else if icon.lucide === 'FileIcon'}
  <IconPlaceholder lucide="FileIcon" tabler="IconFileWord" hugeicons="File01Icon" phosphor="FileIcon" remixicon="RiFileLine" />
{/if}
