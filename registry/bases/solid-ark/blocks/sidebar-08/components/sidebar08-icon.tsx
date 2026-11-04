import { Show, splitProps } from "solid-js"
import { IconPlaceholder } from "../../../ui/icon-placeholder"
import type { Sx } from "@kirana-style/core"

export function Sidebar08Icon(props: {
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
      {local.icon.lucide === "TerminalSquareIcon" ? (
        <IconPlaceholder
          lucide="TerminalSquareIcon"
          tabler="IconTerminal2"
          hugeicons="ComputerTerminalIcon"
          phosphor="TerminalIcon"
          remixicon="RiTerminalBoxLine"
        />
      ) : (
        <>
          {local.icon.lucide === "BotIcon" ? (
            <IconPlaceholder
              lucide="BotIcon"
              tabler="IconRobot"
              hugeicons="RoboticIcon"
              phosphor="RobotIcon"
              remixicon="RiRobotLine"
            />
          ) : (
            <>
              {local.icon.lucide === "BookOpenIcon" ? (
                <IconPlaceholder
                  lucide="BookOpenIcon"
                  tabler="IconBook"
                  hugeicons="BookOpen02Icon"
                  phosphor="BookOpenIcon"
                  remixicon="RiBookOpenLine"
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
                      {local.icon.lucide === "LifeBuoyIcon" ? (
                        <IconPlaceholder
                          lucide="LifeBuoyIcon"
                          tabler="IconLifebuoy"
                          hugeicons="ChartRingIcon"
                          phosphor="LifebuoyIcon"
                          remixicon="RiLifebuoyLine"
                        />
                      ) : (
                        <>
                          {local.icon.lucide === "SendIcon" ? (
                            <IconPlaceholder
                              lucide="SendIcon"
                              tabler="IconSend"
                              hugeicons="SentIcon"
                              phosphor="PaperPlaneTiltIcon"
                              remixicon="RiSendPlaneLine"
                            />
                          ) : (
                            <>
                              {local.icon.lucide === "FrameIcon" ? (
                                <IconPlaceholder
                                  lucide="FrameIcon"
                                  tabler="IconFrame"
                                  hugeicons="CropIcon"
                                  phosphor="CropIcon"
                                  remixicon="RiCropLine"
                                />
                              ) : (
                                <>
                                  {local.icon.lucide === "PieChartIcon" ? (
                                    <IconPlaceholder
                                      lucide="PieChartIcon"
                                      tabler="IconChartPie"
                                      hugeicons="PieChartIcon"
                                      phosphor="ChartPieIcon"
                                      remixicon="RiPieChartLine"
                                    />
                                  ) : (
                                    <Show
                                      when={local.icon.lucide === "MapIcon"}
                                    >
                                      <IconPlaceholder
                                        lucide="MapIcon"
                                        tabler="IconMap"
                                        hugeicons="MapsIcon"
                                        phosphor="MapTrifoldIcon"
                                        remixicon="RiMapLine"
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
  )
}
