import type { UIMessage } from "@tanstack/ai-svelte"

export type Part = UIMessage["parts"][number]

type ToolCall<NAME extends string, INPUT, OUTPUT> = Omit<
  Extract<Part, { type: "tool-call" }>,
  "name" | "input" | "output"
> & { name: NAME; input?: INPUT; output?: OUTPUT }

/** The subagent's own `runCommand` calls: TanStack AI types a call by its tool's schemas, so this names them by hand. */
export type StepPart = ToolCall<
  "runCommand",
  { command: string },
  { stdout: string }
>

/** The `researchAgent` call, which returns the subagent's message. */
export type AgentPart = ToolCall<"researchAgent", { task: string }, UIMessage>

export const isStep = (part: Part): part is StepPart =>
  part.type === "tool-call" && part.name === "runCommand"

export const isAgent = (part: Part): part is AgentPart =>
  part.type === "tool-call" && part.name === "researchAgent"
