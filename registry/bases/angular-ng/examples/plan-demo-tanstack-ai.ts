import {
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
} from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { clientTools, injectChat } from "@tanstack/ai-angular"
import type { UIMessage } from "@tanstack/ai-angular"
import { toolDefinition } from "@tanstack/ai/client"
import * as z from "zod"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Plan } from "../components/plan-demo-tanstack-ai/plan-row"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent } from "../ui/message"
import { Trace } from "../ui/trace"
import { PlanRow } from "../components/plan-demo-tanstack-ai/plan-row"

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

const STEPS = [
  "Install @base-ui/react",
  "Replace the Radix imports",
  "Rename asChild to render",
  "Run the type checker",
]

function planAt(current: number) {
  return {
    title: "Plan: migrate to Base UI",
    steps: STEPS.map((title, index) => ({
      title,
      status:
        index < current ? "done" : index === current ? "running" : "pending",
    })),
  } satisfies Plan
}

const planSchema = z.object({
  title: z.string(),
  steps: z.array(
    z.object({
      title: z.string(),
      status: z.enum(["done", "running", "pending"]),
    })
  ),
})

// The server's tool, as the client takes it for its types: the server runs it.
const updatePlan = toolDefinition({
  name: "updatePlan",
  description: "Write the plan before you start, and again as each step moves.",
  inputSchema: planSchema,
  outputSchema: z.string(),
})

const tools = clientTools(updatePlan)

type ChatMessage = UIMessage<typeof tools>

// TanStack AI's connection carries no data parts: the agent writes its plan with a tool, as it
// writes a todo list, and the latest call's input is the plan.
const chat = createChat<typeof tools>()
  .user("Migrate the dialog components to Base UI.")
  .assistant(({ writer }) => {
    STEPS.forEach((_, index) => {
      writer
        .tool("updatePlan", { input: planAt(index) })
        .output("Updated the plan.")
      writer.sleep(1200)
    })
    writer
      .tool("updatePlan", { input: planAt(STEPS.length) })
      .output("Updated the plan.")
    writer.text("Migrated Dialog and AlertDialog. The type checker passes.")
  })

const transcript = chat.get()

const [question] = chat.get(1)

const connection = chat.transport({ delayMs: 20 })

const planOf = (message: ChatMessage) =>
  message.parts
    .filter((part) => part.type === "tool-call")
    .filter((part) => part.name === "updatePlan" && part.input !== undefined)
    .at(-1)?.input

@Component({
  selector: "plan-demo-tanstack-ai",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    Message,
    MessageContent,
    PlanRow,
    Trace,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        @for (message of chat.messages(); track message.id) {
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
                @if (planOf(message)) {
                  <div kuiTrace>
                    <kui-plan-row
                      [plan]="planOf(message)!"
                      [streaming]="streaming(message)"
                    />
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
export default class PlanDemoTanstackAi {
  private readonly injector = inject(Injector)
  protected readonly chat = injectChat({
    initialMessages: transcript,
    connection,
    threadId: "plan-demo",
    tools,
  })
  protected readonly busy = computed(
    () =>
      this.chat.status() === "submitted" || this.chat.status() === "streaming"
  )
  protected streaming(message: ChatMessage) {
    return this.busy() && message === this.chat.messages().at(-1)
  }
  protected replay() {
    this.chat.setMessages([])
    // The rows go before the replay's arrive, so each starts afresh, as React's do.
    afterNextRender(() => void this.chat.append(question), {
      injector: this.injector,
    })
  }
  protected readonly styles = styles
  protected readonly planOf = planOf
  protected readonly getMessageText = getMessageText
  protected readonly page = page
}
