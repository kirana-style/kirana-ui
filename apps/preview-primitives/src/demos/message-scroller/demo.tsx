import { MessageScroller } from "@kirana-ui/react/message-scroller"
import { useState } from "react"
import type { FormEvent } from "react"

import type { Styles } from "../../styled.ts"

const earlier = [
  { mine: false, text: "Are we still on for the hike on Saturday?" },
  { mine: true, text: "Yes! The forecast looks clear." },
  { mine: false, text: "Great. Which trail?" },
  { mine: true, text: "The ridge loop, about four hours." },
  { mine: false, text: "I will bring lunch for both of us." },
  { mine: true, text: "Then coffee is on me." },
  { mine: false, text: "Deal. What time should we meet?" },
]

export default function Demo({
  s,
}: {
  s: Styles<
    | "frame"
    | "root"
    | "viewport"
    | "content"
    | "theirs"
    | "mine"
    | "button"
    | "form"
    | "input"
    | "send"
  >
}) {
  const [messages, setMessages] = useState(earlier)
  const [draft, setDraft] = useState("")

  function send(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (text === "") return
    setMessages([...messages, { mine: true, text }])
    setDraft("")
  }

  return (
    <div {...s.frame}>
      <MessageScroller.Root {...s.root}>
        <MessageScroller.Viewport aria-label="Conversation" {...s.viewport}>
          <MessageScroller.Content {...s.content}>
            {messages.map((message, at) => (
              <p key={at} {...(message.mine ? s.mine : s.theirs)}>
                {message.text}
              </p>
            ))}
          </MessageScroller.Content>
        </MessageScroller.Viewport>
        <MessageScroller.Button {...s.button}>↓ Newest</MessageScroller.Button>
      </MessageScroller.Root>
      <form onSubmit={send} {...s.form}>
        <input
          aria-label="Message"
          placeholder="Write a message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          {...s.input}
        />
        <button type="submit" {...s.send}>
          Send
        </button>
      </form>
    </div>
  )
}
