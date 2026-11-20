import type { UIMessage } from "@tanstack/ai-svelte"

export type Test = {
  name: string
  status: "passed" | "failed" | "skipped"
  error?: string
}

export type Part = UIMessage["parts"][number]

export type ToolResultPart = Extract<Part, { type: "tool-result" }>

/** A `runTests` call: TanStack AI types a call by its tool's schemas, so this names them by hand. */
export type ToolPart = Omit<
  Extract<Part, { type: "tool-call" }>,
  "name" | "input" | "output"
> & {
  name: "runTests"
  input?: { command: string }
  output?: { suites: { name: string; tests: Test[] }[] }
}

export const isRunTests = (part: Part): part is ToolPart =>
  part.type === "tool-call" && part.name === "runTests"

/** The result TanStack AI adds beside a call, which carries its error. */
export const resultOf = (message: UIMessage, toolCallId: string) =>
  message.parts.find(
    (part): part is ToolResultPart =>
      part.type === "tool-result" && part.toolCallId === toolCallId
  )
