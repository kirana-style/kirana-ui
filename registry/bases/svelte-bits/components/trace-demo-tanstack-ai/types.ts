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
  output?: { stdout: string }
}

/** A source as the search tool returns it: TanStack AI has no source part. */
export type Source = { url: string; title?: string }

/** A `searchDocs` call, whose output holds the sources. */
export type SearchPart = Omit<
  Extract<Part, { type: "tool-call" }>,
  "name" | "input" | "output"
> & {
  name: "searchDocs"
  input?: { query: string }
  output?: { sources: Source[] }
}

export const isSearchDocs = (part: Part): part is SearchPart =>
  part.type === "tool-call" && part.name === "searchDocs"

export const isRunCommand = (part: Part): part is ToolPart =>
  part.type === "tool-call" && part.name === "runCommand"

/** The result TanStack AI adds beside a call, which carries its error. */
export const resultOf = (message: UIMessage, toolCallId: string) =>
  message.parts.find(
    (part): part is ToolResultPart =>
      part.type === "tool-result" && part.toolCallId === toolCallId
  )
