import { splitProps } from "solid-js"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { TraceIcon, TraceLine, TraceTitle } from "../../ui/trace"
import type { Sx } from "@kirana-style/core"
import type { Todo } from "./types"

export function TodoLine(props: {
  todo: Todo
  streaming: boolean
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(props, ["todo", "streaming", "sx", "class"])
  return (
    <TraceLine
      status={
        local.streaming && local.todo.status === "in_progress"
          ? "running"
          : undefined
      }
    >
      <TraceIcon>
        {local.todo.status === "completed" ? (
          <IconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
          />
        ) : (
          <>
            {local.todo.status === "in_progress" ? (
              <IconPlaceholder
                lucide="CircleDotIcon"
                tabler="IconCircleDot"
                hugeicons="RecordIcon"
                phosphor="RecordIcon"
                remixicon="RiRecordCircleLine"
              />
            ) : (
              <IconPlaceholder
                lucide="CircleIcon"
                tabler="IconCircle"
                hugeicons="CircleIcon"
                phosphor="CircleIcon"
                remixicon="RiCheckboxBlankCircleLine"
              />
            )}
          </>
        )}
      </TraceIcon>
      <TraceTitle>{local.todo.content}</TraceTitle>
    </TraceLine>
  )
}
