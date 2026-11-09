import { getContext, setContext } from "svelte"

/**
 * The radio group a group sits in: Base UI's radio items read the nearest radio group through any
 * group between them, Ark's read the nearest group, so a group inside a radio group passes its
 * value on (`DropdownMenuGroup`).
 */
export type RadioGroupState = {
  readonly value: string | undefined
  readonly onValueChange: ((details: { value: string }) => void) | undefined
}

const KEY = Symbol("dropdown-menu-radio-group")

export const setRadioGroup = (state: RadioGroupState) => setContext(KEY, state)
export const getRadioGroup = () => getContext<RadioGroupState | undefined>(KEY)
