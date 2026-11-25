import { getContext, setContext } from "svelte"
import type { FileUploadEntry } from "@kirana-ui/svelte"

/** The file an item is, for the parts inside it (the remove button's name). */
const KEY = Symbol("file-upload-entry")

export const setFileUploadEntry = (entry: () => FileUploadEntry) =>
  setContext(KEY, entry)
export const useFileUploadEntry = () =>
  getContext<(() => FileUploadEntry) | undefined>(KEY)
