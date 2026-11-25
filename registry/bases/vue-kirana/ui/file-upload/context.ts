import type { FileUploadEntry } from "@kirana-ui/vue"
import type { InjectionKey } from "vue"

/** The file an item is, for the parts inside it (the remove button's name). */
export const FILE_UPLOAD_ENTRY: InjectionKey<() => FileUploadEntry> =
  Symbol("FileUploadEntry")
