import { ScrollArea } from "@kirana-ui/react/scroll-area"

import type { Styles } from "../../styled.ts"

const NOTES = [
  "Search now finds archived projects.",
  "Invoices can be exported as a spreadsheet.",
  "Comments keep their place when a file is renamed.",
  "The mobile app opens on the last project you used.",
  "Shared links can expire after a day, a week or a month.",
  "Keyboard shortcuts are listed under Help.",
]

export default function Demo({
  s,
}: {
  s: Styles<
    "root" | "viewport" | "content" | "title" | "text" | "scrollbar" | "thumb"
  >
}) {
  return (
    <ScrollArea.Root {...s.root}>
      <ScrollArea.Viewport {...s.viewport}>
        <ScrollArea.Content {...s.content}>
          <p {...s.title}>What is new</p>
          {NOTES.map((note) => (
            <p key={note} {...s.text}>
              {note}
            </p>
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar {...s.scrollbar}>
        <ScrollArea.Thumb {...s.thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
