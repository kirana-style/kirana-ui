import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "ngx-sonner"
import { containerSize, space, spacing } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "../ui/bubble"
import { Button } from "../ui/button"
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible"
import { Marker, MarkerContent } from "../ui/marker"

const styles = {
  flexWFullMaxWMdFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[8] },
  }),
  whitespacePreWrap: css({ whiteSpace: "pre-wrap" }),
  whitespacePreLine: css({ whiteSpace: "pre-line" }),
  gap1P0TextMutedForegroun: css({
    gap: { "*": null, base: space[1] },
    padding: { "*": null, base: "0" },
    color: theme.mutedForeground,
  }),
  groupDataPanelOpenButton: css({
    rotate: { ':is([data-state="open"] *)': "180deg" },
  }),
  flexWFullMaxWMdFlexColGa2: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    flexDirection: "column",
    gap: { "*": null, base: space[12] },
  }),
  px15Py05: css({
    paddingInline: { "*": null, base: spacing(1.5) },
    paddingBlock: { "*": null, base: spacing(0.5) },
  }),
  gap1BgBackground: css({
    gap: { "*": null, base: space[1] },
    backgroundColor: { "*": null, base: theme.background },
  }),
  borderDashedBorderPrimar: css({
    borderStyle: "dashed",
    borderColor: { "*": null, base: theme.primary },
  }),
}

const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`

const previewLength = 180

const quickReplies = [
  {
    label: "I need help with my account.",
    message: "I need help with my account.",
  },
  {
    label: "I forgot my password.",
    message: "I forgot my password.",
  },
  {
    label:
      "I have another question. I'd like to talk to a human. Can you help me?",
    message: "I have another question.",
  },
]

const isLong = text.length > previewLength

const preview = `${text.slice(0, previewLength)}...`

const text1 = `Ghost bubbles work for assistant text and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container.

Ghost bubbles are full width and can take the full width of the container.
`

const text2 = `Ghost bubbles work for assistant text and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container.

Use this for content that needs the whole row.`

@Component({
  selector: "bubble-example",
  imports: [
    Bubble,
    BubbleContent,
    BubbleGroup,
    BubbleReactions,
    Button,
    Collapsible,
    CollapsibleTrigger,
    Example,
    ExampleWrapper,
    Marker,
    MarkerContent,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- BubbleSizes -->
      <div kuiExample title="Sizes">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa">
          <div kuiBubble>
            <div kuiBubbleContent>This is a one line bubble.</div>
          </div>
          <div kuiBubble>
            <div kuiBubbleContent>
              This bubble has multiple lines. It should wrap to the next line
              and you should see a different radius on the corners.
            </div>
          </div>
          <div kuiBubble>
            <div kuiBubbleContent>
              <p>This bubble has multiple lines.</p>
              <p>
                It should wrap to the next line and you should see a different
                radius on the corners.
              </p>
              <p>Here is some more text to see how it wraps.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- BubbleVariants -->
      <div kuiExample title="Variants">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa">
          <div kuiBubble>
            <div kuiBubbleContent>
              Default bubbles use the primary color for the active user side of
              a chat.
            </div>
          </div>
          <div kuiBubble variant="secondary">
            <div kuiBubbleContent>
              Secondary bubbles are the standard neutral surface for assistant
              and conversation content.
            </div>
          </div>
          <div kuiBubble variant="muted">
            <div kuiBubbleContent>
              Muted bubbles lower the emphasis for quiet system notes or for
              displaying supporting content.
            </div>
          </div>
          <div kuiBubble variant="tinted" align="end">
            <div kuiBubbleContent>
              Tinted bubbles use a softer primary tint when primary fill is too
              strong.
            </div>
          </div>
          <div kuiBubble variant="outline">
            <div kuiBubbleContent>
              Outline bubbles can be used to frame message content and give it a
              border.
            </div>
          </div>
          <div kuiBubble variant="destructive">
            <div kuiBubbleContent>
              Destructive bubbles flag errors or failed actions in a
              conversation.
            </div>
          </div>
          <div kuiBubble variant="ghost">
            <div kuiBubbleContent>
              <span [sx]="styles.whitespacePreWrap">{{ text1 }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- BubbleAlignment -->
      <div kuiExample title="Alignment">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa">
          <div kuiBubble variant="muted">
            <div kuiBubbleContent>This bubble is aligned to the start.</div>
          </div>
          <div kuiBubble align="end">
            <div kuiBubbleContent>This bubble is aligned to the end.</div>
          </div>
          <div kuiBubble variant="muted">
            <div kuiBubbleContent>
              This multiline bubble is aligned to the start. The corners should
              adjust when the text wraps to show the grouped side of the
              conversation.
            </div>
          </div>
          <div kuiBubble align="end">
            <div kuiBubbleContent>
              This multiline bubble is aligned to the end. It should sit on the
              opposite side with the matching corner radius for wrapped text.
            </div>
          </div>
        </div>
      </div>
      <!-- BubbleGrouped -->
      <div kuiExample title="Grouped">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa">
          <div kuiBubbleGroup>
            <div kuiBubble variant="secondary">
              <div kuiBubbleContent>I finished the audit pass.</div>
            </div>
            <div kuiBubble variant="secondary">
              <div kuiBubbleContent>
                The registry output looks clean, but I found one stale route.
              </div>
            </div>
            <div kuiBubble variant="secondary">
              <div kuiBubbleContent>Want me to remove it now?</div>
            </div>
          </div>
          <div kuiBubbleGroup>
            <div kuiBubble variant="tinted" align="end">
              <div kuiBubbleContent>Yes, clean that up.</div>
            </div>
            <div kuiBubble variant="tinted" align="end">
              <div kuiBubbleContent>Then rerun the registry build.</div>
            </div>
          </div>
        </div>
      </div>
      <!-- BubbleCollapsible -->
      <div kuiExample title="Collapsible">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa">
          <div kuiCollapsible [(open)]="open">
            <div kuiBubble variant="muted" align="end">
              <div kuiBubbleContent [sx]="styles.whitespacePreLine">
                <div>{{ open() || !isLong ? text : preview }}</div>
                @if (isLong) {
                  <button
                    kuiButton
                    kuiCollapsibleTrigger
                    variant="link"
                    [sx]="styles.gap1P0TextMutedForegroun"
                  >
                    {{ open() ? "Show less" : "Show more" }}
                    <svg
                      iconPlaceholder
                      lucide="ChevronDownIcon"
                      tabler="IconChevronDown"
                      hugeicons="ArrowDown01Icon"
                      phosphor="CaretDownIcon"
                      remixicon="RiArrowDownSLine"
                      data-icon="inline-end"
                      [sx]="styles.groupDataPanelOpenButton"
                    ></svg>
                  </button>
                }
              </div>
            </div>
          </div>
          <div kuiBubble variant="ghost">
            <div kuiBubbleContent>
              <span [sx]="styles.whitespacePreWrap">{{ text2 }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- BubbleButtonLinks -->
      <div kuiExample title="Button & Links">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa">
          <div kuiBubble>
            <a kuiBubbleContent href="#">This bubble is a link.</a>
          </div>
          <div kuiBubble variant="secondary">
            <button kuiBubbleContent type="button">
              This one is a button you can click.
            </button>
          </div>
          <div kuiBubble variant="muted">
            <button kuiBubbleContent type="button">
              You can also do tinted buttons. Even ones that are multilines.
            </button>
          </div>
          <div kuiMarker variant="separator">
            <span kuiMarkerContent>Chat Suggestions</span>
          </div>
          <div kuiBubble>
            <div kuiBubbleContent>How can I help you today?</div>
          </div>
          <div kuiBubbleGroup>
            @for (reply of quickReplies; track reply.label) {
              <div kuiBubble variant="outline" align="end">
                <button
                  kuiBubbleContent
                  [sx]="styles.borderDashedBorderPrimar"
                  type="button"
                  (click)="toast(reply.message)"
                >
                  {{ reply.label }}
                </button>
              </div>
            }
          </div>
        </div>
      </div>
      <!-- BubbleWithReactions -->
      <div kuiExample title="Reaction Placement">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa2">
          <div kuiMarker variant="separator">
            <span kuiMarkerContent>side=bottom align=end</span>
          </div>
          <div kuiBubble>
            <div kuiBubbleContent>This is a one line message.</div>
            <div
              kuiBubbleReactions
              side="bottom"
              align="end"
              role="img"
              aria-label="Reaction: thumbs up"
            >
              <span>👍</span>
            </div>
          </div>
          <div kuiBubble variant="secondary" align="end">
            <div kuiBubbleContent>
              A longer message that wraps across lines so the reaction offset is
              easier to inspect.
            </div>
            <div
              kuiBubbleReactions
              side="bottom"
              align="start"
              role="img"
              aria-label="Reactions: thumbs up, surprised"
            >
              <span>👍</span>
              <span>😮</span>
            </div>
          </div>
          <div kuiBubble variant="tinted">
            <div kuiBubbleContent>
              A longer message that wraps across lines so the reaction offset is
              easier to inspect.
            </div>
            <div
              kuiBubbleReactions
              side="bottom"
              align="end"
              role="img"
              aria-label="Reactions: thumbs up, surprised, fire, eyes, and 8 more"
            >
              <span>👍</span>
              <span>😮</span>
              <span>🔥</span>
              <span>👀</span>
              <span>+8</span>
            </div>
          </div>
          <div kuiMarker variant="separator">
            <span kuiMarkerContent>side=bottom align=start</span>
          </div>
          <div kuiBubble variant="secondary">
            <div kuiBubbleContent>This is a one line message.</div>
            <div
              kuiBubbleReactions
              side="bottom"
              align="start"
              role="img"
              aria-label="Reaction: fire"
            >
              <span>🔥</span>
            </div>
          </div>
          <div kuiBubble variant="secondary">
            <div kuiBubbleContent>
              A longer message that wraps across lines so the reaction offset is
              easier to inspect.
            </div>
            <div
              kuiBubbleReactions
              side="bottom"
              align="start"
              role="img"
              aria-label="Reactions: thumbs up, surprised, fire, eyes"
            >
              <span>👍</span>
              <span>😮</span>
              <span>🔥</span>
              <span>👀</span>
            </div>
          </div>
          <div kuiMarker variant="separator">
            <span kuiMarkerContent>side=top align=start</span>
          </div>
          <div kuiBubble variant="secondary">
            <div kuiBubbleContent>This is a one line message.</div>
            <div
              kuiBubbleReactions
              side="top"
              align="start"
              role="img"
              aria-label="Reaction: fire"
            >
              <span>🔥</span>
            </div>
          </div>
          <div kuiBubble variant="secondary">
            <div kuiBubbleContent>
              A longer message that wraps across lines so the reaction offset is
              easier to inspect.
            </div>
            <div
              kuiBubbleReactions
              side="top"
              align="start"
              role="img"
              aria-label="Reactions: thumbs up, surprised, fire, eyes"
            >
              <span>👍</span>
              <span>😮</span>
              <span>🔥</span>
              <span>👀</span>
            </div>
          </div>
          <div kuiMarker variant="separator">
            <span kuiMarkerContent>side=bottom align=end</span>
          </div>
          <div kuiBubble variant="muted">
            <div kuiBubbleContent>This is a one line message.</div>
            <div
              kuiBubbleReactions
              side="top"
              align="end"
              role="img"
              aria-label="Reaction: thumbs up"
            >
              <span>👍</span>
            </div>
          </div>
          <div kuiBubble variant="muted">
            <div kuiBubbleContent>
              A longer message that wraps across lines so the reaction offset.
            </div>
            <div
              kuiBubbleReactions
              side="top"
              align="end"
              role="img"
              aria-label="Reactions: thumbs up, surprised, fire, eyes"
              [sx]="styles.px15Py05"
            >
              <span>👍</span>
              <span>😮</span>
              <span>🔥</span>
              <span>👀</span>
            </div>
          </div>
        </div>
      </div>
      <!-- BubbleReactionsButtons -->
      <div kuiExample title="Reactions Buttons">
        <div [sx]="styles.flexWFullMaxWMdFlexColGa">
          <div kuiBubble>
            <div kuiBubbleContent>This is a one line message.</div>
            <div kuiBubbleReactions>
              <button
                kuiButton
                variant="outline"
                size="xs"
                (click)="toast('You clicked the button in the bubble reaction')"
              >
                Button
              </button>
            </div>
          </div>
          <div kuiBubble align="end">
            <div kuiBubbleContent>This is a one line message.</div>
            <div kuiBubbleReactions align="start">
              <button
                kuiButton
                variant="ghost"
                size="icon-xs"
                (click)="toast('Confetti!')"
              >
                🎉
              </button>
            </div>
          </div>
          <div kuiBubble variant="tinted">
            <div kuiBubbleContent>
              We are going to the movies first then dinner. Are you in?
            </div>
            <div kuiBubbleReactions [sx]="styles.gap1BgBackground">
              <button
                kuiButton
                variant="secondary"
                size="icon-xs"
                aria-label="Thumbs up"
                (click)="toast('You agree!')"
              >
                <svg
                  iconPlaceholder
                  lucide="ThumbsUpIcon"
                  tabler="IconThumbUp"
                  hugeicons="ThumbsUpIcon"
                  phosphor="ThumbsUpIcon"
                  remixicon="RiThumbUpLine"
                ></svg>
              </button>
              <button
                kuiButton
                variant="secondary"
                size="icon-xs"
                aria-label="Thumbs down"
                (click)="toast('You disagree!')"
              >
                <svg
                  iconPlaceholder
                  lucide="ThumbsDownIcon"
                  tabler="IconThumbDown"
                  hugeicons="ThumbsDownIcon"
                  phosphor="ThumbsDownIcon"
                  remixicon="RiThumbDownLine"
                ></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class BubbleExample {
  protected readonly text1 = text1
  protected readonly text2 = text2
  protected readonly open = signal(false)
  protected readonly styles = styles
  protected readonly text = text
  protected readonly quickReplies = quickReplies
  protected readonly isLong = isLong
  protected readonly preview = preview
  protected readonly toast = toast
}
