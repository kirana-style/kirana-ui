import type { UIMessage } from "@tanstack/ai-svelte"

export type Part = UIMessage["parts"][number]

export type Todo = {
  content: string
  status: "pending" | "in_progress" | "completed"
}

/** A `writeTodos` call: TanStack AI types a call by its tool's schemas, so this names them by hand. */
export type WriteTodosPart = Omit<
  Extract<Part, { type: "tool-call" }>,
  "name" | "input" | "output"
> & {
  name: "writeTodos"
  input?: { todos: Todo[] }
  output?: string
}

export const isWriteTodos = (part: Part): part is WriteTodosPart =>
  part.type === "tool-call" && part.name === "writeTodos"
