import { Show, splitProps } from "solid-js"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import type { Sx } from "@kirana-style/core"

export function Sidebar15Icon(props: {
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
      {local.icon.lucide === "CommandIcon" ? (
        <IconPlaceholder
          lucide="CommandIcon"
          tabler="IconCommand"
          hugeicons="CommandIcon"
          phosphor="CommandIcon"
          remixicon="RiCommandLine"
        />
      ) : (
        <>
          {local.icon.lucide === "AudioLinesIcon" ? (
            <IconPlaceholder
              lucide="AudioLinesIcon"
              tabler="IconWaveSine"
              hugeicons="AudioWave01Icon"
              phosphor="WaveformIcon"
              remixicon="RiPulseLine"
            />
          ) : (
            <>
              {local.icon.lucide === "SearchIcon" ? (
                <IconPlaceholder
                  lucide="SearchIcon"
                  tabler="IconSearch"
                  hugeicons="SearchIcon"
                  phosphor="MagnifyingGlassIcon"
                  remixicon="RiSearchLine"
                />
              ) : (
                <>
                  {local.icon.lucide === "SparklesIcon" ? (
                    <IconPlaceholder
                      lucide="SparklesIcon"
                      tabler="IconSparkles"
                      hugeicons="SparklesIcon"
                      phosphor="SparkleIcon"
                      remixicon="RiSparklingLine"
                    />
                  ) : (
                    <>
                      {local.icon.lucide === "HomeIcon" ? (
                        <IconPlaceholder
                          lucide="HomeIcon"
                          tabler="IconHome"
                          hugeicons="HomeIcon"
                          phosphor="HouseIcon"
                          remixicon="RiHomeLine"
                        />
                      ) : (
                        <>
                          {local.icon.lucide === "InboxIcon" ? (
                            <IconPlaceholder
                              lucide="InboxIcon"
                              tabler="IconInbox"
                              hugeicons="InboxIcon"
                              phosphor="TrayIcon"
                              remixicon="RiInboxLine"
                            />
                          ) : (
                            <>
                              {local.icon.lucide === "CalendarIcon" ? (
                                <IconPlaceholder
                                  lucide="CalendarIcon"
                                  tabler="IconCalendar"
                                  hugeicons="CalendarIcon"
                                  phosphor="CalendarIcon"
                                  remixicon="RiCalendarLine"
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
                                      {local.icon.lucide === "BlocksIcon" ? (
                                        <IconPlaceholder
                                          lucide="BlocksIcon"
                                          tabler="IconCube"
                                          hugeicons="CubeIcon"
                                          phosphor="CubeIcon"
                                          remixicon="RiBox3Line"
                                        />
                                      ) : (
                                        <>
                                          {local.icon.lucide ===
                                          "Trash2Icon" ? (
                                            <IconPlaceholder
                                              lucide="Trash2Icon"
                                              tabler="IconTrash"
                                              hugeicons="Delete02Icon"
                                              phosphor="TrashIcon"
                                              remixicon="RiDeleteBinLine"
                                            />
                                          ) : (
                                            <Show
                                              when={
                                                local.icon.lucide ===
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
  )
}
