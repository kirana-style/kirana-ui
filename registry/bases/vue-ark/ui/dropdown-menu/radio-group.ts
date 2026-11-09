import type { InjectionKey, Ref } from "vue"

/**
 * The value of the radio group a group sits in: Base UI's radio items read the nearest radio
 * group through any group between them, Ark's read the nearest group, so a group inside a radio
 * group passes its value on (`DropdownMenuGroup`).
 */
export const RADIO_GROUP: InjectionKey<Ref<string | undefined>> = Symbol(
  "dropdown-menu-radio-group"
)
