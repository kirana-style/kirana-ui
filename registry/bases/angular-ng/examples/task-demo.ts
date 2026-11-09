import {
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import type { ChatMessage, TaskPart } from "../components/task-demo/types"
import { Chat } from "../../../lib/angular/chat"
import { createChat, getMessageText } from "../../../lib/ai"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent } from "../ui/message"
import { Trace } from "../ui/trace"
import { TaskRow } from "../components/task-demo/task-row"

const styles = {
  div: css({
    display: "flex",
    minHeight: space[72],
    width: "100%",
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: space[4],
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  messageContent: css({
    gap: { "*": null, base: space[4] },
  }),
  button: css({
    marginTop: { "*": null, base: "auto" },
    alignSelf: { "*": null, base: "flex-start" },
  }),
}

const TASKS = [
  {
    id: "find",
    title: ["Finding the project files", "Found the project files"],
    steps: [
      ["Searching for generateMetadata", "Searched for generateMetadata"],
      ["Reading app/layout.tsx", "Read app/layout.tsx"],
      ["Reading app/page.tsx", "Read app/page.tsx"],
    ],
  },
  {
    id: "update",
    title: ["Updating the page metadata", "Updated the page metadata"],
    steps: [
      ["Editing app/layout.tsx", "Edited app/layout.tsx"],
      ["Editing app/page.tsx", "Edited app/page.tsx"],
    ],
  },
]

function taskAt(task: (typeof TASKS)[number], done: number) {
  return {
    title: task.title[done < task.steps.length ? 0 : 1],
    steps: task.steps.slice(0, done + 1).map(([running, finished], index) => ({
      title: index < done ? finished : running,
      status: index < done ? "done" : "running",
    })),
  } satisfies TaskPart["data"]
}

const chat = createChat<ChatMessage>()
  .user("Add Open Graph metadata to the home page.")
  .assistant(({ writer }) => {
    TASKS.forEach((task) => {
      for (let done = 0; done <= task.steps.length; done++) {
        writer
          .data({ type: "data-task", id: task.id, data: taskAt(task, done) })
          .sleep(900)
      }
    })
    writer.text(
      "Added Open Graph defaults to app/layout.tsx and a title, description and image for the home page in app/page.tsx."
    )
  })

const transcript = chat.get()

const [question] = chat.get(1)

const transport = chat.transport({ delayMs: 20 })

const tasksOf = (message: ChatMessage) =>
  message.parts.filter((part) => part.type === "data-task")

@Component({
  selector: "task-demo",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Message,
    MessageContent,
    TaskRow,
    Trace,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        @for (message of chat.messages; track message.id) {
          @if (message.role === "user") {
            <div kuiMessage align="end">
              <div kuiMessageContent>
                <div kuiBubble align="end" variant="muted">
                  <div kuiBubbleContent>{{ getMessageText(message) }}</div>
                </div>
              </div>
            </div>
          } @else {
            <div kuiMessage>
              <div kuiMessageContent [sx]="styles.messageContent">
                @if (tasksOf(message).length > 0) {
                  <div kuiTrace>
                    @for (part of tasksOf(message); track part.id) {
                      <kui-task-row
                        [task]="part.data"
                        [streaming]="streaming(message)"
                      />
                    }
                  </div>
                }
                @if (getMessageText(message)) {
                  <p>{{ getMessageText(message) }}</p>
                }
              </div>
            </div>
          }
        }
        @if (!busy()) {
          <button
            kuiButton
            variant="outline"
            size="sm"
            [sx]="styles.button"
            (click)="replay()"
          >
            Replay
          </button>
        }
      </div>
    </div>
  `,
})
export default class TaskDemo {
  private readonly injector = inject(Injector)
  protected readonly chat = new Chat<ChatMessage>({
    messages: transcript,
    transport,
  })
  protected readonly busy = computed(
    () => this.chat.status === "submitted" || this.chat.status === "streaming"
  )
  protected streaming(message: ChatMessage) {
    return this.busy() && message === this.chat.messages.at(-1)
  }
  protected replay() {
    this.chat.messages = []
    // The rows go before the replay's arrive, so each starts afresh, as React's do.
    afterNextRender(() => void this.chat.sendMessage(question), {
      injector: this.injector,
    })
  }
  protected readonly styles = styles
  protected readonly tasksOf = tasksOf
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
