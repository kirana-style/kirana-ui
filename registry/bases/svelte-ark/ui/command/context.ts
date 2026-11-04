import { getContext } from "svelte"

/** An item as it registers with its Command: its value, words, group and what choosing it does. */
export type CommandEntry = {
  id: symbol
  readonly value: string
  keywords: string[]
  group?: symbol
  readonly disabled: boolean
  onSelect: () => void
}

/** What a Command hands its parts: getters, so they follow it. */
export type CommandContext = {
  register: (entry: CommandEntry) => () => void
  /** Whether an item, or any item of a group, matches what is typed. */
  visible: (value: string) => boolean
  groupVisible: (group: symbol) => boolean
  readonly empty: boolean
  highlighted: string | null
  query: string
}

export const COMMAND = Symbol("command")
export const COMMAND_GROUP = Symbol("command-group")

export function useCommand() {
  const context = getContext<CommandContext | undefined>(COMMAND)
  if (!context) throw new Error("A command part must be used within a Command.")
  return context
}
