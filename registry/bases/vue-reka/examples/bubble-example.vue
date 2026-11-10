<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { toast } from "vue-sonner"
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
import { containerSize, space, spacing } from "../../../core/scales"
import { theme } from "../../../core/tokens"

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

const open = ref(false)

const isLong = text.length > previewLength

const preview = `${text.slice(0, previewLength)}...`
</script>

<template>
  <ExampleWrapper>
    <!-- BubbleSizes -->
    <Example title="Sizes">
      <div :sx="styles.flexWFullMaxWMdFlexColGa">
        <Bubble>
          <BubbleContent>This is a one line bubble.</BubbleContent>
        </Bubble>
        <Bubble>
          <BubbleContent>
            This bubble has multiple lines. It should wrap to the next line and
            you should see a different radius on the corners.
          </BubbleContent>
        </Bubble>
        <Bubble>
          <BubbleContent>
            <p>This bubble has multiple lines.</p>
            <p>
              It should wrap to the next line and you should see a different
              radius on the corners.
            </p>
            <p>Here is some more text to see how it wraps.</p>
          </BubbleContent>
        </Bubble>
      </div>
    </Example>
    <!-- BubbleVariants -->
    <Example title="Variants">
      <div :sx="styles.flexWFullMaxWMdFlexColGa">
        <Bubble>
          <BubbleContent>
            Default bubbles use the primary color for the active user side of a
            chat.
          </BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>
            Secondary bubbles are the standard neutral surface for assistant and
            conversation content.
          </BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            Muted bubbles lower the emphasis for quiet system notes or for
            displaying supporting content.
          </BubbleContent>
        </Bubble>
        <Bubble variant="tinted" align="end">
          <BubbleContent>
            Tinted bubbles use a softer primary tint when primary fill is too
            strong.
          </BubbleContent>
        </Bubble>
        <Bubble variant="outline">
          <BubbleContent>
            Outline bubbles can be used to frame message content and give it a
            border.
          </BubbleContent>
        </Bubble>
        <Bubble variant="destructive">
          <BubbleContent>
            Destructive bubbles flag errors or failed actions in a conversation.
          </BubbleContent>
        </Bubble>
        <Bubble variant="ghost">
          <BubbleContent>
            <span :sx="styles.whitespacePreWrap">
              {{
                `Ghost bubbles work for assistant text and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container.

Ghost bubbles are full width and can take the full width of the container.
`
              }}
            </span>
          </BubbleContent>
        </Bubble>
      </div>
    </Example>
    <!-- BubbleAlignment -->
    <Example title="Alignment">
      <div :sx="styles.flexWFullMaxWMdFlexColGa">
        <Bubble variant="muted">
          <BubbleContent>This bubble is aligned to the start.</BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>This bubble is aligned to the end.</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            This multiline bubble is aligned to the start. The corners should
            adjust when the text wraps to show the grouped side of the
            conversation.
          </BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>
            This multiline bubble is aligned to the end. It should sit on the
            opposite side with the matching corner radius for wrapped text.
          </BubbleContent>
        </Bubble>
      </div>
    </Example>
    <!-- BubbleGrouped -->
    <Example title="Grouped">
      <div :sx="styles.flexWFullMaxWMdFlexColGa">
        <BubbleGroup>
          <Bubble variant="secondary">
            <BubbleContent>I finished the audit pass.</BubbleContent>
          </Bubble>
          <Bubble variant="secondary">
            <BubbleContent>
              The registry output looks clean, but I found one stale route.
            </BubbleContent>
          </Bubble>
          <Bubble variant="secondary">
            <BubbleContent>Want me to remove it now?</BubbleContent>
          </Bubble>
        </BubbleGroup>
        <BubbleGroup>
          <Bubble variant="tinted" align="end">
            <BubbleContent>Yes, clean that up.</BubbleContent>
          </Bubble>
          <Bubble variant="tinted" align="end">
            <BubbleContent>Then rerun the registry build.</BubbleContent>
          </Bubble>
        </BubbleGroup>
      </div>
    </Example>
    <!-- BubbleCollapsible -->
    <Example title="Collapsible">
      <div :sx="styles.flexWFullMaxWMdFlexColGa">
        <Collapsible v-model:open="open">
          <Bubble variant="muted" align="end">
            <BubbleContent :sx="styles.whitespacePreLine">
              <div>{{ open || !isLong ? text : preview }}</div>
              <CollapsibleTrigger v-if="isLong" as-child>
                <Button variant="link" :sx="styles.gap1P0TextMutedForegroun">
                  {{ open ? "Show less" : "Show more" }}
                  <IconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                    data-icon="inline-end"
                    :sx="styles.groupDataPanelOpenButton"
                  />
                </Button>
              </CollapsibleTrigger>
            </BubbleContent>
          </Bubble>
        </Collapsible>
        <Bubble variant="ghost">
          <BubbleContent>
            <span :sx="styles.whitespacePreWrap">
              {{
                `Ghost bubbles work for assistant text and other content that should not be framed.

This is perfect for assistant messages that should not have a frame and can take the full width of the container.

Use this for content that needs the whole row.`
              }}
            </span>
          </BubbleContent>
        </Bubble>
      </div>
    </Example>
    <!-- BubbleButtonLinks -->
    <Example title="Button & Links">
      <div :sx="styles.flexWFullMaxWMdFlexColGa">
        <Bubble>
          <BubbleContent as-child>
            <a href="#"> This bubble is a link. </a>
          </BubbleContent>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent as-child>
            <button type="button">This one is a button you can click.</button>
          </BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent as-child>
            <button type="button">
              You can also do tinted buttons. Even ones that are multilines.
            </button>
          </BubbleContent>
        </Bubble>
        <Marker variant="separator">
          <MarkerContent>Chat Suggestions</MarkerContent>
        </Marker>
        <Bubble>
          <BubbleContent>How can I help you today?</BubbleContent>
        </Bubble>
        <BubbleGroup>
          <Bubble
            v-for="reply in quickReplies"
            :key="reply.label"
            variant="outline"
            align="end"
          >
            <BubbleContent :sx="styles.borderDashedBorderPrimar" as-child>
              <button type="button" @click="() => toast(reply.message)">
                {{ reply.label }}
              </button>
            </BubbleContent>
          </Bubble>
        </BubbleGroup>
      </div>
    </Example>
    <!-- BubbleWithReactions -->
    <Example title="Reaction Placement">
      <div :sx="styles.flexWFullMaxWMdFlexColGa2">
        <Marker variant="separator">
          <MarkerContent>side=bottom align=end</MarkerContent>
        </Marker>
        <Bubble>
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions
            side="bottom"
            align="end"
            role="img"
            aria-label="Reaction: thumbs up"
          >
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="secondary" align="end">
          <BubbleContent>
            A longer message that wraps across lines so the reaction offset is
            easier to inspect.
          </BubbleContent>
          <BubbleReactions
            side="bottom"
            align="start"
            role="img"
            aria-label="Reactions: thumbs up, surprised"
          >
            <span>👍</span>
            <span>😮</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="tinted">
          <BubbleContent>
            A longer message that wraps across lines so the reaction offset is
            easier to inspect.
          </BubbleContent>
          <BubbleReactions
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
          </BubbleReactions>
        </Bubble>
        <Marker variant="separator">
          <MarkerContent>side=bottom align=start</MarkerContent>
        </Marker>
        <Bubble variant="secondary">
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions
            side="bottom"
            align="start"
            role="img"
            aria-label="Reaction: fire"
          >
            <span>🔥</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>
            A longer message that wraps across lines so the reaction offset is
            easier to inspect.
          </BubbleContent>
          <BubbleReactions
            side="bottom"
            align="start"
            role="img"
            aria-label="Reactions: thumbs up, surprised, fire, eyes"
          >
            <span>👍</span>
            <span>😮</span>
            <span>🔥</span>
            <span>👀</span>
          </BubbleReactions>
        </Bubble>
        <Marker variant="separator">
          <MarkerContent>side=top align=start</MarkerContent>
        </Marker>
        <Bubble variant="secondary">
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions
            side="top"
            align="start"
            role="img"
            aria-label="Reaction: fire"
          >
            <span>🔥</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="secondary">
          <BubbleContent>
            A longer message that wraps across lines so the reaction offset is
            easier to inspect.
          </BubbleContent>
          <BubbleReactions
            side="top"
            align="start"
            role="img"
            aria-label="Reactions: thumbs up, surprised, fire, eyes"
          >
            <span>👍</span>
            <span>😮</span>
            <span>🔥</span>
            <span>👀</span>
          </BubbleReactions>
        </Bubble>
        <Marker variant="separator">
          <MarkerContent>side=bottom align=end</MarkerContent>
        </Marker>
        <Bubble variant="muted">
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions
            side="top"
            align="end"
            role="img"
            aria-label="Reaction: thumbs up"
          >
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            A longer message that wraps across lines so the reaction offset.
          </BubbleContent>
          <BubbleReactions
            side="top"
            align="end"
            role="img"
            aria-label="Reactions: thumbs up, surprised, fire, eyes"
            :sx="styles.px15Py05"
          >
            <span>👍</span>
            <span>😮</span>
            <span>🔥</span>
            <span>👀</span>
          </BubbleReactions>
        </Bubble>
      </div>
    </Example>
    <!-- BubbleReactionsButtons -->
    <Example title="Reactions Buttons">
      <div :sx="styles.flexWFullMaxWMdFlexColGa">
        <Bubble>
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions>
            <Button
              variant="outline"
              size="xs"
              @click="
                () => toast('You clicked the button in the bubble reaction')
              "
              >Button</Button
            >
          </BubbleReactions>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>This is a one line message.</BubbleContent>
          <BubbleReactions align="start">
            <Button
              variant="ghost"
              size="icon-xs"
              @click="() => toast('Confetti!')"
              >🎉</Button
            >
          </BubbleReactions>
        </Bubble>
        <Bubble variant="tinted">
          <BubbleContent>
            We are going to the movies first then dinner. Are you in?
          </BubbleContent>
          <BubbleReactions :sx="styles.gap1BgBackground">
            <Button
              variant="secondary"
              size="icon-xs"
              aria-label="Thumbs up"
              @click="() => toast('You agree!')"
            >
              <IconPlaceholder
                lucide="ThumbsUpIcon"
                tabler="IconThumbUp"
                hugeicons="ThumbsUpIcon"
                phosphor="ThumbsUpIcon"
                remixicon="RiThumbUpLine"
              />
            </Button>
            <Button
              variant="secondary"
              size="icon-xs"
              aria-label="Thumbs down"
              @click="() => toast('You disagree!')"
            >
              <IconPlaceholder
                lucide="ThumbsDownIcon"
                tabler="IconThumbDown"
                hugeicons="ThumbsDownIcon"
                phosphor="ThumbsDownIcon"
                remixicon="RiThumbDownLine"
              />
            </Button>
          </BubbleReactions>
        </Bubble>
      </div>
    </Example>
  </ExampleWrapper>
</template>
