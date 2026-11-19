import { Show, splitProps } from "solid-js"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import type { Sx } from "@kirana-style/core"

export function Dashboard01Icon(props: {
  icon: {
    lucide: string
    tabler: string
    hugeicons: string
    phosphor: string
    remixicon: string
  }

  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["icon", "sx", "class"])
  /**
   * An icon this block's data names, drawn by a placeholder written out for each, as React's data
   * holds placeholder elements: a project's installer resolves only a placeholder whose
   * icons are written on it.
   */

  return (
    <>
      {local.icon.lucide === "LayoutDashboardIcon" ? (
        <IconPlaceholder
          lucide="LayoutDashboardIcon"
          tabler="IconDashboard"
          hugeicons="DashboardSquare01Icon"
          phosphor="SquaresFourIcon"
          remixicon="RiDashboardLine"
        />
      ) : (
        <>
          {local.icon.lucide === "ListIcon" ? (
            <IconPlaceholder
              lucide="ListIcon"
              tabler="IconListDetails"
              hugeicons="Menu01Icon"
              phosphor="ListIcon"
              remixicon="RiListUnordered"
            />
          ) : (
            <>
              {local.icon.lucide === "ChartBarIcon" ? (
                <IconPlaceholder
                  lucide="ChartBarIcon"
                  tabler="IconChartBar"
                  hugeicons="ChartHistogramIcon"
                  phosphor="ChartBarIcon"
                  remixicon="RiBarChartLine"
                />
              ) : (
                <>
                  {local.icon.lucide === "FolderIcon" ? (
                    <IconPlaceholder
                      lucide="FolderIcon"
                      tabler="IconFolder"
                      hugeicons="Folder01Icon"
                      phosphor="FolderIcon"
                      remixicon="RiFolderLine"
                    />
                  ) : (
                    <>
                      {local.icon.lucide === "UsersIcon" ? (
                        <IconPlaceholder
                          lucide="UsersIcon"
                          tabler="IconUsers"
                          hugeicons="UserGroupIcon"
                          phosphor="UsersIcon"
                          remixicon="RiGroupLine"
                        />
                      ) : (
                        <>
                          {local.icon.lucide === "CameraIcon" ? (
                            <IconPlaceholder
                              lucide="CameraIcon"
                              tabler="IconCamera"
                              hugeicons="Camera01Icon"
                              phosphor="CameraIcon"
                              remixicon="RiCameraLine"
                            />
                          ) : (
                            <>
                              {local.icon.lucide === "FileTextIcon" ? (
                                <IconPlaceholder
                                  lucide="FileTextIcon"
                                  tabler="IconFileAi"
                                  hugeicons="File01Icon"
                                  phosphor="FileTextIcon"
                                  remixicon="RiFileTextLine"
                                />
                              ) : (
                                <>
                                  {local.icon.lucide === "Settings2Icon" ? (
                                    <IconPlaceholder
                                      lucide="Settings2Icon"
                                      tabler="IconSettings"
                                      hugeicons="Settings05Icon"
                                      phosphor="GearIcon"
                                      remixicon="RiSettingsLine"
                                    />
                                  ) : (
                                    <>
                                      {local.icon.lucide ===
                                      "CircleHelpIcon" ? (
                                        <IconPlaceholder
                                          lucide="CircleHelpIcon"
                                          tabler="IconHelp"
                                          hugeicons="HelpCircleIcon"
                                          phosphor="QuestionIcon"
                                          remixicon="RiQuestionLine"
                                        />
                                      ) : (
                                        <>
                                          {local.icon.lucide ===
                                          "SearchIcon" ? (
                                            <IconPlaceholder
                                              lucide="SearchIcon"
                                              tabler="IconSearch"
                                              hugeicons="SearchIcon"
                                              phosphor="MagnifyingGlassIcon"
                                              remixicon="RiSearchLine"
                                            />
                                          ) : (
                                            <>
                                              {local.icon.lucide ===
                                              "DatabaseIcon" ? (
                                                <IconPlaceholder
                                                  lucide="DatabaseIcon"
                                                  tabler="IconDatabase"
                                                  hugeicons="Database01Icon"
                                                  phosphor="DatabaseIcon"
                                                  remixicon="RiDatabase2Line"
                                                />
                                              ) : (
                                                <>
                                                  {local.icon.lucide ===
                                                  "FileChartColumnIcon" ? (
                                                    <IconPlaceholder
                                                      lucide="FileChartColumnIcon"
                                                      tabler="IconReport"
                                                      hugeicons="Analytics01Icon"
                                                      phosphor="ChartLineIcon"
                                                      remixicon="RiFileChartLine"
                                                    />
                                                  ) : (
                                                    <Show
                                                      when={
                                                        local.icon.lucide ===
                                                        "FileIcon"
                                                      }
                                                    >
                                                      <IconPlaceholder
                                                        lucide="FileIcon"
                                                        tabler="IconFileWord"
                                                        hugeicons="File01Icon"
                                                        phosphor="FileIcon"
                                                        remixicon="RiFileLine"
                                                      />
                                                    </Show>
                                                  )}
                                                </>
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
