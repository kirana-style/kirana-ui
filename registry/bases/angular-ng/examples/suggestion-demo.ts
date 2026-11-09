import { Component, computed, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { scrollFadeX } from "../../../styles/scroll-fade.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Bubble, BubbleContent } from "../ui/bubble"
import { Button } from "../ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../ui/input-group"
import { Message, MessageContent } from "../ui/message"

const styles = {
  div: css({
    marginInline: "auto",
    display: "flex",
    width: "100%",
    maxWidth: containerSize.lg,
    flexDirection: "column",
    gap: space[6],
    paddingBlock: space[6],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  div3: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
  }),
  div4: css({
    // `scrollbar-none`; `scroll-fade-x` is `scrollFadeX`, beside it.
    scrollbarWidth: "none",
    display: "flex",
    gap: space[2],
    overflowX: "auto",
    overscrollBehaviorX: "contain",
  }),
  button: css({
    flexShrink: { "*": null, base: "0" },
  }),
  inputGroupTextarea: css({
    // `p-3`, block sides logical: InputGroupTextarea sets `padding-block`, which a physical side
    // would not replace.
    paddingBlock: space[3],
    paddingInline: space[3],
  }),
  inputGroupButton: css({
    borderRadius: { "*": null, base: radius.full },
  }),
  inputGroupButton2: css({
    marginLeft: { "*": null, base: "auto" },
    borderRadius: { "*": null, base: radius.full },
  }),
}

const suggestions = [
  "Add a dark mode toggle",
  "Fix the failing build",
  "Write tests for the form",
  "Upgrade to Next.js 16",
  "Add a loading state",
  "Find unused dependencies",
]

const replies: Record<string, string> = {
  "Add a dark mode toggle":
    "Added a ModeToggle to the site header. It calls setTheme from next-themes.",
  "Fix the failing build":
    "The build failed on a missing import in app/page.tsx. I added it and the build passes.",
  "Write tests for the form":
    "Added four tests in signup-form.test.tsx. They cover the empty, invalid and valid states.",
  "Upgrade to Next.js 16":
    "Ran the codemod and bumped next to 16. Two routes needed async params, so I updated them.",
  "Add a loading state":
    "Added a loading.tsx to the dashboard route. It shows skeletons while the data loads.",
  "Find unused dependencies":
    "Three packages are not imported anywhere: lodash, moment and classnames. Should I remove them?",
}

@Component({
  selector: "suggestion-demo",
  imports: [
    Bubble,
    BubbleContent,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
    Message,
    MessageContent,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        @if (turn(); as current) {
          <div [sx]="styles.div2">
            <div kuiMessage align="end">
              <div kuiMessageContent>
                <div kuiBubble align="end" variant="muted">
                  <div kuiBubbleContent>{{ current.prompt }}</div>
                </div>
              </div>
            </div>
            <div kuiMessage>
              <div kuiMessageContent>
                <p>{{ current.reply }}</p>
              </div>
            </div>
          </div>
        }
        <div [sx]="styles.div3">
          <div [sx]="[styles.div4, scrollFadeX]">
            @for (suggestion of suggestions; track suggestion) {
              <button
                kuiButton
                variant="outline"
                size="sm"
                [sx]="styles.button"
                (click)="send(suggestion)"
              >
                {{ suggestion }}
              </button>
            }
          </div>
          <form #form (submit)="onSubmit($event)">
            <div kuiInputGroup>
              <textarea
                kuiInputGroupTextarea
                [value]="text()"
                (input)="onInput($event)"
                placeholder="Ask the agent to change your code..."
                (keydown)="onKeydown($event, form)"
                [sx]="styles.inputGroupTextarea"
              ></textarea>
              <div kuiInputGroupAddon align="block-end">
                <button
                  kuiInputGroupButton
                  size="icon-sm"
                  variant="outline"
                  [sx]="styles.inputGroupButton"
                  aria-label="Attach files"
                >
                  <svg
                    iconPlaceholder
                    lucide="PlusIcon"
                    tabler="IconPlus"
                    hugeicons="PlusSignIcon"
                    phosphor="PlusIcon"
                    remixicon="RiAddLine"
                  ></svg>
                </button>
                <button
                  kuiInputGroupButton
                  type="submit"
                  size="icon-sm"
                  variant="default"
                  [sx]="styles.inputGroupButton2"
                  [disabled]="!canSend()"
                  aria-label="Send"
                >
                  <svg
                    iconPlaceholder
                    lucide="ArrowUpIcon"
                    tabler="IconArrowUp"
                    hugeicons="ArrowUp02Icon"
                    phosphor="ArrowUpIcon"
                    remixicon="RiArrowUpLine"
                  ></svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export default class SuggestionDemo {
  protected readonly text = signal("")
  protected readonly turn = signal<{ prompt: string; reply: string } | null>(
    null
  )
  protected readonly canSend = computed(() => this.text().trim().length > 0)
  protected readonly styles = styles
  protected readonly suggestions = suggestions
  protected readonly page = page
  protected readonly scrollFadeX = scrollFadeX

  protected send(prompt: string) {
    this.turn.set({
      prompt,
      reply:
        replies[prompt] ?? "This demo only knows the suggestions. Pick one.",
    })
    this.text.set("")
  }

  protected onSubmit(event: Event) {
    event.preventDefault()
    if (!this.canSend()) {
      return
    }

    this.send(this.text().trim())
  }

  protected onInput(event: Event) {
    this.text.set((event.target as HTMLTextAreaElement).value)
  }

  protected onKeydown(event: KeyboardEvent, form: HTMLFormElement) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      form.requestSubmit()
    }
  }
}
