import { SourcesRow } from "../components/trace-demo-tanstack-ai/sources-row"
import { ThinkingRow } from "../components/trace-demo-tanstack-ai/thinking-row"
import { ToolRow } from "../components/trace-demo-tanstack-ai/tool-row"
import { For, Show, createMemo } from "solid-js"
import { useChat } from "../../../lib/solid2/tanstack-chat"
import { createChat, getMessageText } from "../../../lib/tanstack-ai"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import { Message, MessageContent } from "../ui/message"
import { Trace } from "../ui/trace"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type {
  ChatMessage,
  Part,
  ToolPart,
  ToolResultPart,
  tools,
} from "../components/trace-demo-tanstack-ai/types"

export default function TraceDemoTanstackAi() {
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

  const chat = createChat<typeof tools>()
    .user("Why does pnpm install fail in CI?")
    .assistant(({ writer }) => {
      writer.reasoning(
        "CI installs with a frozen lockfile, so the install stops when package.json and pnpm-lock.yaml disagree. I should check what the last commit changed, then reproduce the install.",
        { delayMs: 40 }
      )
      writer
        .tool("runCommand", { input: { command: "pnpm --version" } })
        .sleep(700)
        .output({ stdout: "10.18.0" })
      writer
        .tool("runCommand", {
          input: {
            command: "git diff --stat HEAD~1 -- package.json pnpm-lock.yaml",
          },
        })
        .sleep(900)
        .output({
          stdout:
            " package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
        })
      writer
        .tool("runCommand", {
          input: { command: "pnpm install --frozen-lockfile" },
        })
        .sleep(1200)
        .error(
          'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json'
        )
      writer
        .tool("searchWeb", { input: { query: "pnpm frozen-lockfile ci" } })
        .output({
          results: [
            {
              url: "https://pnpm.io/cli/install#--frozen-lockfile",
              title: "pnpm install | pnpm.io",
            },
            {
              url: "https://pnpm.io/continuous-integration",
              title: "Continuous Integration | pnpm.io",
            },
          ],
        })
      writer.sleep(1000)
      writer.text(
        "The last commit bumped a version in package.json without updating pnpm-lock.yaml, so the frozen install fails. Run pnpm install locally and commit the lockfile."
      )
    })

  const transcript = chat.get()
  const [question] = chat.get(1)
  const connection = chat.transport({ delayMs: 20 })

  const { messages, append, setMessages, status } = useChat({
    threadId: "trace-demo",
    initialMessages: transcript,
    connection,
  })
  const busy = createMemo(
    () => status() === "submitted" || status() === "streaming"
  )

  type Row = Extract<Part, { type: "thinking" }> | ToolPart

  /** What each assistant message draws: its trace's rows and sources, and its text. */
  const replies = createMemo(() =>
    messages().map((message, index) => ({
      streaming: busy() && index === messages().length - 1,
      rows: message.parts.filter(
        (part): part is Row =>
          part.type === "thinking" ||
          (part.type === "tool-call" && part.name === "runCommand")
      ),
      sources: message.parts.flatMap((part) =>
        part.type === "tool-call" && part.name === "searchWeb"
          ? (part.output?.results ?? [])
          : []
      ),
      text: getMessageText(message),
    }))
  )
  const reply = (index: number) => replies()[index]!
  // A tool call's error is in the `tool-result` part that follows it.
  const resultOf = (message: ChatMessage, part: ToolPart) =>
    message.parts.find(
      (result): result is ToolResultPart =>
        result.type === "tool-result" && result.toolCallId === part.id
    )
  const thinkingPart = (row: Row) => (row.type === "thinking" ? row : undefined)
  const toolPart = (row: Row) => (row.type === "tool-call" ? row : undefined)

  function replay() {
    setMessages([])
    if (question) void append(question)
  }

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <For keyed={false} each={messages()}>
          {(message, index) => (
            <>
              {message().role === "user" ? (
                <Message align="end">
                  <MessageContent>
                    <Bubble align="end" variant="muted">
                      <BubbleContent>{getMessageText(message())}</BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              ) : (
                <Message>
                  <MessageContent sx={styles.messageContent}>
                    <Show
                      when={
                        reply(index).rows.length + reply(index).sources.length >
                        0
                      }
                    >
                      <Trace>
                        <For keyed={false} each={reply(index).rows}>
                          {(part, at) => (
                            <>
                              <Show when={thinkingPart(part())}>
                                {(thinking) => (
                                  <ThinkingRow
                                    text={thinking().content}
                                    running={
                                      reply(index).streaming &&
                                      message().parts.at(-1) === thinking()
                                    }
                                  />
                                )}
                              </Show>
                              <Show when={toolPart(part())}>
                                {(tool) => (
                                  <ToolRow
                                    part={tool()}
                                    result={resultOf(message(), tool())}
                                    streaming={reply(index).streaming}
                                    defaultOpen={at === 2}
                                  />
                                )}
                              </Show>
                            </>
                          )}
                        </For>
                        <Show when={reply(index).sources.length > 0}>
                          <SourcesRow
                            sources={reply(index).sources}
                            running={
                              reply(index).streaming &&
                              reply(index).text.length === 0
                            }
                          />
                        </Show>
                      </Trace>
                    </Show>
                    <Show when={reply(index).text}>
                      <p>{reply(index).text}</p>
                    </Show>
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </For>
        <Show when={!busy()}>
          <Button
            variant="outline"
            size="sm"
            sx={styles.button}
            onClick={replay}
          >
            Replay
          </Button>
        </Show>
      </div>
    </div>
  )
}
