import { inject } from "vue"
import type { ComputedRef, InjectionKey, Ref } from "vue"

/** An item as it registers with its Command: its value, words, group and what choosing it does. */
export type CommandEntry = {
  id: symbol
  value: Ref<string>
  keywords: string[]
  group?: symbol
  disabled: Ref<boolean>
  onSelect: () => void
}

/** What a Command hands its parts. */
export type CommandContext = {
  register: (entry: CommandEntry) => () => void
  /** Whether an item, or any item of a group, matches what is typed. */
  visible: (value: string) => boolean
  groupVisible: (group: symbol) => boolean
  empty: ComputedRef<boolean>
  highlighted: Ref<string | null>
  query: Ref<string>
}

export const COMMAND: InjectionKey<CommandContext> = Symbol("command")
export const COMMAND_GROUP: InjectionKey<symbol> = Symbol("command-group")

export function useCommand() {
  const context = inject(COMMAND)
  if (!context) throw new Error("A command part must be used within a Command.")
  return context
}
