import { Component, input } from "@angular/core"
import { IconPlaceholder } from "../../../../../icons/angular"

/**
 * An icon this block's data names, drawn by a placeholder written out for each, as React's data
 * holds placeholder elements: a project's installer resolves only a placeholder whose
 * icons are written on it.
 */

@Component({
  selector: "kui-dashboard01-icon",
  imports: [IconPlaceholder],
  host: { style: "display: contents" },
  template: `
    @if (icon().lucide === "LayoutDashboardIcon") {
      <svg
        iconPlaceholder
        lucide="LayoutDashboardIcon"
        tabler="IconDashboard"
        hugeicons="DashboardSquare01Icon"
        phosphor="SquaresFourIcon"
        remixicon="RiDashboardLine"
      ></svg>
    } @else if (icon().lucide === "ListIcon") {
      <svg
        iconPlaceholder
        lucide="ListIcon"
        tabler="IconListDetails"
        hugeicons="Menu01Icon"
        phosphor="ListIcon"
        remixicon="RiListUnordered"
      ></svg>
    } @else if (icon().lucide === "ChartBarIcon") {
      <svg
        iconPlaceholder
        lucide="ChartBarIcon"
        tabler="IconChartBar"
        hugeicons="ChartHistogramIcon"
        phosphor="ChartBarIcon"
        remixicon="RiBarChartLine"
      ></svg>
    } @else if (icon().lucide === "FolderIcon") {
      <svg
        iconPlaceholder
        lucide="FolderIcon"
        tabler="IconFolder"
        hugeicons="Folder01Icon"
        phosphor="FolderIcon"
        remixicon="RiFolderLine"
      ></svg>
    } @else if (icon().lucide === "UsersIcon") {
      <svg
        iconPlaceholder
        lucide="UsersIcon"
        tabler="IconUsers"
        hugeicons="UserGroupIcon"
        phosphor="UsersIcon"
        remixicon="RiGroupLine"
      ></svg>
    } @else if (icon().lucide === "CameraIcon") {
      <svg
        iconPlaceholder
        lucide="CameraIcon"
        tabler="IconCamera"
        hugeicons="Camera01Icon"
        phosphor="CameraIcon"
        remixicon="RiCameraLine"
      ></svg>
    } @else if (icon().lucide === "FileTextIcon") {
      <svg
        iconPlaceholder
        lucide="FileTextIcon"
        tabler="IconFileAi"
        hugeicons="File01Icon"
        phosphor="FileTextIcon"
        remixicon="RiFileTextLine"
      ></svg>
    } @else if (icon().lucide === "Settings2Icon") {
      <svg
        iconPlaceholder
        lucide="Settings2Icon"
        tabler="IconSettings"
        hugeicons="Settings05Icon"
        phosphor="GearIcon"
        remixicon="RiSettingsLine"
      ></svg>
    } @else if (icon().lucide === "CircleHelpIcon") {
      <svg
        iconPlaceholder
        lucide="CircleHelpIcon"
        tabler="IconHelp"
        hugeicons="HelpCircleIcon"
        phosphor="QuestionIcon"
        remixicon="RiQuestionLine"
      ></svg>
    } @else if (icon().lucide === "SearchIcon") {
      <svg
        iconPlaceholder
        lucide="SearchIcon"
        tabler="IconSearch"
        hugeicons="SearchIcon"
        phosphor="MagnifyingGlassIcon"
        remixicon="RiSearchLine"
      ></svg>
    } @else if (icon().lucide === "DatabaseIcon") {
      <svg
        iconPlaceholder
        lucide="DatabaseIcon"
        tabler="IconDatabase"
        hugeicons="Database01Icon"
        phosphor="DatabaseIcon"
        remixicon="RiDatabase2Line"
      ></svg>
    } @else if (icon().lucide === "FileChartColumnIcon") {
      <svg
        iconPlaceholder
        lucide="FileChartColumnIcon"
        tabler="IconReport"
        hugeicons="Analytics01Icon"
        phosphor="ChartLineIcon"
        remixicon="RiFileChartLine"
      ></svg>
    } @else if (icon().lucide === "FileIcon") {
      <svg
        iconPlaceholder
        lucide="FileIcon"
        tabler="IconFileWord"
        hugeicons="File01Icon"
        phosphor="FileIcon"
        remixicon="RiFileLine"
      ></svg>
    }
  `,
})
export class Dashboard01Icon {
  readonly icon = input.required<{
    lucide: string
    tabler: string
    hugeicons: string
    phosphor: string
    remixicon: string
  }>()
}
