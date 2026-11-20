import type { UIMessage } from "@tanstack/ai-svelte"

export type Part = UIMessage["parts"][number]

export type ToolResultPart = Extract<Part, { type: "tool-result" }>

/** A `runCommand` call: TanStack AI types a call by its tool's schemas, so this names them by hand. */
export type ToolPart = Omit<
  Extract<Part, { type: "tool-call" }>,
  "name" | "input" | "output"
> & {
  name: "runCommand"
  input?: { command: string }
  output?: { exitCode: number; output: string }
}

export const isRunCommand = (part: Part): part is ToolPart =>
  part.type === "tool-call" && part.name === "runCommand"

/** The result TanStack AI adds beside a call, which carries its error. */
export const resultOf = (message: UIMessage, toolCallId: string) =>
  message.parts.find(
    (part): part is ToolResultPart =>
      part.type === "tool-result" && part.toolCallId === toolCallId
  )
