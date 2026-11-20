import type { UIMessage } from "@tanstack/ai-svelte"

export type Task = {
  id: string
  title: string
  steps: { title: string; status: "done" | "running" | "error" }[]
}

/** An `updateTask` call: TanStack AI types a call by its tool's schemas, so this names them by hand. */
export type TaskPart = Omit<
  Extract<UIMessage["parts"][number], { type: "tool-call" }>,
  "name" | "input"
> & { name: "updateTask"; input?: Task }

export type Status = "running" | "error" | undefined

export const isUpdateTask = (
  part: UIMessage["parts"][number]
): part is TaskPart => part.type === "tool-call" && part.name === "updateTask"
