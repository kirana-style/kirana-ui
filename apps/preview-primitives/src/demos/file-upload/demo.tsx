import { FileUpload } from "@kirana-ui/react/file-upload"

import type { Styles } from "../../styled.ts"

// Two files already chosen, so the list has something in it from the start.
const CHOSEN = [
  new File(["Monday: plans for the week"], "agenda.txt", {
    type: "text/plain",
  }),
  new File(["name,email\nAda,ada@example.com"], "guests.csv", {
    type: "text/csv",
  }),
]

export default function Demo({
  s,
}: {
  s: Styles<
    | "root"
    | "dropzone"
    | "hint"
    | "trigger"
    | "list"
    | "item"
    | "name"
    | "size"
    | "remove"
  >
}) {
  return (
    <FileUpload.Root
      name="attachments"
      multiple
      defaultFiles={CHOSEN}
      {...s.root}
    >
      <FileUpload.Dropzone aria-label="Attachments" {...s.dropzone}>
        <span {...s.hint}>Drop files here, or</span>
        <FileUpload.Trigger {...s.trigger}>Choose files</FileUpload.Trigger>
      </FileUpload.Dropzone>
      <FileUpload.List {...s.list}>
        <FileUpload.Items>
          {(entry) => (
            <FileUpload.Item entry={entry} {...s.item}>
              <FileUpload.ItemName {...s.name} />
              <FileUpload.ItemSize locale="en-US" {...s.size} />
              <FileUpload.ItemRemove
                aria-label={`Remove ${entry.file.name}`}
                {...s.remove}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </FileUpload.ItemRemove>
            </FileUpload.Item>
          )}
        </FileUpload.Items>
      </FileUpload.List>
    </FileUpload.Root>
  )
}
