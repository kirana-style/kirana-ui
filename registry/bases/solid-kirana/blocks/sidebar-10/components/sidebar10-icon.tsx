import { Show, splitProps } from "solid-js"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import type { Sx } from "@kirana-style/core"

export function Sidebar10Icon(props: {
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
          {local.icon.lucide === "FileTextIcon" ? (
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="File01Icon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
          ) : (
            <>
              {local.icon.lucide === "LinkIcon" ? (
                <IconPlaceholder
                  lucide="LinkIcon"
                  tabler="IconLink"
                  hugeicons="LinkIcon"
                  phosphor="LinkIcon"
                  remixicon="RiLinksLine"
                />
              ) : (
                <>
                  {local.icon.lucide === "CopyIcon" ? (
                    <IconPlaceholder
                      lucide="CopyIcon"
                      tabler="IconCopy"
                      hugeicons="Copy01Icon"
                      phosphor="CopyIcon"
                      remixicon="RiFileCopyLine"
                    />
                  ) : (
                    <>
                      {local.icon.lucide === "CornerUpRightIcon" ? (
                        <IconPlaceholder
                          lucide="CornerUpRightIcon"
                          tabler="IconCornerUpRight"
                          hugeicons="RedoIcon"
                          phosphor="ArrowBendUpRightIcon"
                          remixicon="RiCornerUpRightLine"
                        />
                      ) : (
                        <>
                          {local.icon.lucide === "Trash2Icon" ? (
                            <IconPlaceholder
                              lucide="Trash2Icon"
                              tabler="IconTrash"
                              hugeicons="Delete02Icon"
                              phosphor="TrashIcon"
                              remixicon="RiDeleteBinLine"
                            />
                          ) : (
                            <>
                              {local.icon.lucide === "CornerUpLeftIcon" ? (
                                <IconPlaceholder
                                  lucide="CornerUpLeftIcon"
                                  tabler="IconCornerUpLeft"
                                  hugeicons="UndoIcon"
                                  phosphor="ArrowBendUpLeftIcon"
                                  remixicon="RiCornerUpLeftLine"
                                />
                              ) : (
                                <>
                                  {local.icon.lucide === "ChartLineIcon" ? (
                                    <IconPlaceholder
                                      lucide="ChartLineIcon"
                                      tabler="IconChartLine"
                                      hugeicons="ChartIcon"
                                      phosphor="ChartLineIcon"
                                      remixicon="RiLineChartLine"
                                    />
                                  ) : (
                                    <>
                                      {local.icon.lucide ===
                                      "GalleryVerticalEndIcon" ? (
                                        <IconPlaceholder
                                          lucide="GalleryVerticalEndIcon"
                                          tabler="IconLayoutRows"
                                          hugeicons="LayoutBottomIcon"
                                          phosphor="RowsIcon"
                                          remixicon="RiGalleryLine"
                                        />
                                      ) : (
                                        <>
                                          {local.icon.lucide === "TrashIcon" ? (
                                            <IconPlaceholder
                                              lucide="TrashIcon"
                                              tabler="IconTrash"
                                              hugeicons="DeleteIcon"
                                              phosphor="TrashIcon"
                                              remixicon="RiDeleteBinLine"
                                            />
                                          ) : (
                                            <>
                                              {local.icon.lucide ===
                                              "BellIcon" ? (
                                                <IconPlaceholder
                                                  lucide="BellIcon"
                                                  tabler="IconBell"
                                                  hugeicons="NotificationIcon"
                                                  phosphor="BellIcon"
                                                  remixicon="RiNotificationLine"
                                                />
                                              ) : (
                                                <>
                                                  {local.icon.lucide ===
                                                  "ArrowUpIcon" ? (
                                                    <IconPlaceholder
                                                      lucide="ArrowUpIcon"
                                                      tabler="IconArrowUp"
                                                      hugeicons="ArrowUpIcon"
                                                      phosphor="ArrowUpIcon"
                                                      remixicon="RiArrowUpLine"
                                                    />
                                                  ) : (
                                                    <>
                                                      {local.icon.lucide ===
                                                      "ArrowDownIcon" ? (
                                                        <IconPlaceholder
                                                          lucide="ArrowDownIcon"
                                                          tabler="IconArrowDown"
                                                          hugeicons="ArrowDownIcon"
                                                          phosphor="ArrowDownIcon"
                                                          remixicon="RiArrowDownLine"
                                                        />
                                                      ) : (
                                                        <>
                                                          {local.icon.lucide ===
                                                          "CommandIcon" ? (
                                                            <IconPlaceholder
                                                              lucide="CommandIcon"
                                                              tabler="IconCommand"
                                                              hugeicons="CommandIcon"
                                                              phosphor="CommandIcon"
                                                              remixicon="RiCommandLine"
                                                            />
                                                          ) : (
                                                            <>
                                                              {local.icon
                                                                .lucide ===
                                                              "AudioLinesIcon" ? (
                                                                <IconPlaceholder
                                                                  lucide="AudioLinesIcon"
                                                                  tabler="IconWaveSine"
                                                                  hugeicons="AudioWave01Icon"
                                                                  phosphor="WaveformIcon"
                                                                  remixicon="RiPulseLine"
                                                                />
                                                              ) : (
                                                                <>
                                                                  {local.icon
                                                                    .lucide ===
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
                                                                      {local
                                                                        .icon
                                                                        .lucide ===
                                                                      "SparklesIcon" ? (
                                                                        <IconPlaceholder
                                                                          lucide="SparklesIcon"
                                                                          tabler="IconSparkles"
                                                                          hugeicons="SparklesIcon"
                                                                          phosphor="SparkleIcon"
                                                                          remixicon="RiSparklingLine"
                                                                        />
                                                                      ) : (
                                                                        <>
                                                                          {local
                                                                            .icon
                                                                            .lucide ===
                                                                          "HomeIcon" ? (
                                                                            <IconPlaceholder
                                                                              lucide="HomeIcon"
                                                                              tabler="IconHome"
                                                                              hugeicons="HomeIcon"
                                                                              phosphor="HouseIcon"
                                                                              remixicon="RiHomeLine"
                                                                            />
                                                                          ) : (
                                                                            <>
                                                                              {local
                                                                                .icon
                                                                                .lucide ===
                                                                              "InboxIcon" ? (
                                                                                <IconPlaceholder
                                                                                  lucide="InboxIcon"
                                                                                  tabler="IconInbox"
                                                                                  hugeicons="InboxIcon"
                                                                                  phosphor="TrayIcon"
                                                                                  remixicon="RiInboxLine"
                                                                                />
                                                                              ) : (
                                                                                <>
                                                                                  {local
                                                                                    .icon
                                                                                    .lucide ===
                                                                                  "CalendarIcon" ? (
                                                                                    <IconPlaceholder
                                                                                      lucide="CalendarIcon"
                                                                                      tabler="IconCalendar"
                                                                                      hugeicons="CalendarIcon"
                                                                                      phosphor="CalendarIcon"
                                                                                      remixicon="RiCalendarLine"
                                                                                    />
                                                                                  ) : (
                                                                                    <>
                                                                                      {local
                                                                                        .icon
                                                                                        .lucide ===
                                                                                      "BlocksIcon" ? (
                                                                                        <IconPlaceholder
                                                                                          lucide="BlocksIcon"
                                                                                          tabler="IconCube"
                                                                                          hugeicons="CubeIcon"
                                                                                          phosphor="CubeIcon"
                                                                                          remixicon="RiBox3Line"
                                                                                        />
                                                                                      ) : (
                                                                                        <Show
                                                                                          when={
                                                                                            local
                                                                                              .icon
                                                                                              .lucide ===
                                                                                            "MessageCircleQuestionIcon"
                                                                                          }
                                                                                        >
                                                                                          <IconPlaceholder
                                                                                            lucide="MessageCircleQuestionIcon"
                                                                                            tabler="IconMessageQuestion"
                                                                                            hugeicons="MessageQuestionIcon"
                                                                                            phosphor="ChatCircleIcon"
                                                                                            remixicon="RiQuestionLine"
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
