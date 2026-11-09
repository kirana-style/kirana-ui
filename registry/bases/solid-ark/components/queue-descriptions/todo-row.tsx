import { splitProps } from "solid-js"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "../../ui/trace"
import type { Sx } from "@kirana-style/core"

export type Todo = { title: string; description?: string; done: boolean }

export function TodoRow(props: { todo: Todo; sx?: Sx; class?: string }) {
  const [local] = splitProps(props, ["todo", "sx", "class"])
  return (
    <>
      {local.todo.description ? (
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine>
              <TraceIcon>
                {local.todo.done ? (
                  <IconPlaceholder
                    lucide="CircleCheckIcon"
                    tabler="IconCircleCheckFilled"
                    hugeicons="CheckmarkCircle01Icon"
                    phosphor="CheckCircleIcon"
                    remixicon="RiCheckboxCircleFill"
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
              </TraceIcon>
              <TraceTitle>{local.todo.title}</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            {local.todo.description}
          </TraceCollapsibleContent>
        </TraceCollapsible>
      ) : (
        <TraceLine>
          <TraceIcon>
            {local.todo.done ? (
              <IconPlaceholder
                lucide="CircleCheckIcon"
                tabler="IconCircleCheckFilled"
                hugeicons="CheckmarkCircle01Icon"
                phosphor="CheckCircleIcon"
                remixicon="RiCheckboxCircleFill"
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
          </TraceIcon>
          <TraceTitle>{local.todo.title}</TraceTitle>
        </TraceLine>
      )}
    </>
  )
}
