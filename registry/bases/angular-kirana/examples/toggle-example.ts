import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Toggle } from "../ui/toggle"

const styles = {
  flexFlexWrapItemsCenterG: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: { "*": null, base: space[2] },
  }),
  flexFlexColGap4: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
  }),
  pair: css({ display: "flex", alignItems: "center", gap: space[2] }),
  groupDataStateOnToggleFi: css({
    // Upstream's `group-data-[state=on]/toggle:fill-accent-foreground` reads Radix's state, which
    // Base UI's toggle never writes: nothing to draw.
  }),
}

@Component({
  selector: "toggle-example",
  imports: [
    Button,
    Example,
    ExampleWrapper,
    Toggle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- ToggleBasic -->
      <div kuiExample title="Basic">
        <div [sx]="styles.flexFlexWrapItemsCenterG">
          <button kuiToggle aria-label="Toggle bold" defaultPressed>
            <svg
              iconPlaceholder
              lucide="BoldIcon"
              tabler="IconBold"
              hugeicons="TextBoldIcon"
              phosphor="TextBIcon"
              remixicon="RiBold"
            ></svg>
          </button>
          <button kuiToggle aria-label="Toggle italic">
            <svg
              iconPlaceholder
              lucide="ItalicIcon"
              tabler="IconItalic"
              hugeicons="TextItalicIcon"
              phosphor="TextItalicIcon"
              remixicon="RiItalic"
            ></svg>
          </button>
          <button kuiToggle aria-label="Toggle underline">
            <svg
              iconPlaceholder
              lucide="UnderlineIcon"
              tabler="IconUnderline"
              hugeicons="TextUnderlineIcon"
              phosphor="TextUnderlineIcon"
              remixicon="RiUnderline"
            ></svg>
          </button>
        </div>
      </div>
      <!-- ToggleOutline -->
      <div kuiExample title="Outline">
        <div [sx]="styles.flexFlexWrapItemsCenterG">
          <button kuiToggle variant="outline" aria-label="Toggle italic">
            <svg
              iconPlaceholder
              lucide="ItalicIcon"
              tabler="IconItalic"
              hugeicons="TextItalicIcon"
              phosphor="TextItalicIcon"
              remixicon="RiItalic"
            ></svg>
            Italic
          </button>
          <button kuiToggle variant="outline" aria-label="Toggle bold">
            <svg
              iconPlaceholder
              lucide="BoldIcon"
              tabler="IconBold"
              hugeicons="TextBoldIcon"
              phosphor="TextBIcon"
              remixicon="RiBold"
            ></svg>
            Bold
          </button>
        </div>
      </div>
      <!-- ToggleSizes -->
      <div kuiExample title="Sizes">
        <div [sx]="styles.flexFlexWrapItemsCenterG">
          <button
            kuiToggle
            variant="outline"
            aria-label="Toggle small"
            size="sm"
          >
            Small
          </button>
          <button
            kuiToggle
            variant="outline"
            aria-label="Toggle default"
            size="default"
          >
            Default
          </button>
          <button
            kuiToggle
            variant="outline"
            aria-label="Toggle large"
            size="lg"
          >
            Large
          </button>
        </div>
      </div>
      <!-- ToggleWithButtonText -->
      <div kuiExample title="With Button Text">
        <div [sx]="styles.flexFlexColGap4">
          <div [sx]="styles.pair">
            <button kuiButton size="sm" variant="outline">Button</button>
            <button
              kuiToggle
              variant="outline"
              aria-label="Toggle sm"
              size="sm"
            >
              Toggle
            </button>
          </div>
          <div [sx]="styles.pair">
            <button kuiButton size="default" variant="outline">Button</button>
            <button
              kuiToggle
              variant="outline"
              aria-label="Toggle default"
              size="default"
            >
              Toggle
            </button>
          </div>
          <div [sx]="styles.pair">
            <button kuiButton size="lg" variant="outline">Button</button>
            <button
              kuiToggle
              variant="outline"
              aria-label="Toggle lg"
              size="lg"
            >
              Toggle
            </button>
          </div>
        </div>
      </div>
      <!-- ToggleWithButtonIcon -->
      <div kuiExample title="With Button Icon">
        <div [sx]="styles.flexFlexColGap4">
          <div [sx]="styles.pair">
            <button kuiButton variant="outline" size="icon-sm">
              <svg
                iconPlaceholder
                lucide="BoldIcon"
                tabler="IconBold"
                hugeicons="TextBoldIcon"
                phosphor="TextBIcon"
                remixicon="RiBold"
              ></svg>
            </button>
            <button
              kuiToggle
              variant="outline"
              aria-label="Toggle sm icon"
              size="sm"
            >
              <svg
                iconPlaceholder
                lucide="BoldIcon"
                tabler="IconBold"
                hugeicons="TextBoldIcon"
                phosphor="TextBIcon"
                remixicon="RiBold"
              ></svg>
            </button>
          </div>
          <div [sx]="styles.pair">
            <button kuiButton variant="outline" size="icon">
              <svg
                iconPlaceholder
                lucide="ItalicIcon"
                tabler="IconItalic"
                hugeicons="TextItalicIcon"
                phosphor="TextItalicIcon"
                remixicon="RiItalic"
              ></svg>
            </button>
            <button
              kuiToggle
              variant="outline"
              aria-label="Toggle default icon"
              size="default"
            >
              <svg
                iconPlaceholder
                lucide="ItalicIcon"
                tabler="IconItalic"
                hugeicons="TextItalicIcon"
                phosphor="TextItalicIcon"
                remixicon="RiItalic"
              ></svg>
            </button>
          </div>
          <div [sx]="styles.pair">
            <button kuiButton variant="outline" size="icon-lg">
              <svg
                iconPlaceholder
                lucide="UnderlineIcon"
                tabler="IconUnderline"
                hugeicons="TextUnderlineIcon"
                phosphor="TextUnderlineIcon"
                remixicon="RiUnderline"
              ></svg>
            </button>
            <button
              kuiToggle
              variant="outline"
              aria-label="Toggle lg icon"
              size="lg"
            >
              <svg
                iconPlaceholder
                lucide="UnderlineIcon"
                tabler="IconUnderline"
                hugeicons="TextUnderlineIcon"
                phosphor="TextUnderlineIcon"
                remixicon="RiUnderline"
              ></svg>
            </button>
          </div>
        </div>
      </div>
      <!-- ToggleWithButtonIconText -->
      <div kuiExample title="With Button Icon + Text">
        <div [sx]="styles.flexFlexColGap4">
          <div [sx]="styles.pair">
            <button kuiButton size="sm" variant="outline">
              <svg
                iconPlaceholder
                lucide="BoldIcon"
                tabler="IconBold"
                hugeicons="TextBoldIcon"
                phosphor="TextBIcon"
                remixicon="RiBold"
                data-icon="inline-start"
              ></svg>
              Button
            </button>
            <button
              kuiToggle
              variant="outline"
              aria-label="Toggle sm icon text"
              size="sm"
            >
              <svg
                iconPlaceholder
                lucide="BoldIcon"
                tabler="IconBold"
                hugeicons="TextBoldIcon"
                phosphor="TextBIcon"
                remixicon="RiBold"
              ></svg>
              Toggle
            </button>
          </div>
          <div [sx]="styles.pair">
            <button kuiButton size="default" variant="outline">
              <svg
                iconPlaceholder
                lucide="ItalicIcon"
                tabler="IconItalic"
                hugeicons="TextItalicIcon"
                phosphor="TextItalicIcon"
                remixicon="RiItalic"
                data-icon="inline-start"
              ></svg>
              Button
            </button>
            <button
              kuiToggle
              variant="outline"
              aria-label="Toggle default icon text"
              size="default"
            >
              <svg
                iconPlaceholder
                lucide="ItalicIcon"
                tabler="IconItalic"
                hugeicons="TextItalicIcon"
                phosphor="TextItalicIcon"
                remixicon="RiItalic"
              ></svg>
              Toggle
            </button>
          </div>
          <div [sx]="styles.pair">
            <button kuiButton size="lg" variant="outline">
              <svg
                iconPlaceholder
                lucide="UnderlineIcon"
                tabler="IconUnderline"
                hugeicons="TextUnderlineIcon"
                phosphor="TextUnderlineIcon"
                remixicon="RiUnderline"
                data-icon="inline-start"
              ></svg>
              Button
            </button>
            <button
              kuiToggle
              variant="outline"
              aria-label="Toggle lg icon text"
              size="lg"
            >
              <svg
                iconPlaceholder
                lucide="UnderlineIcon"
                tabler="IconUnderline"
                hugeicons="TextUnderlineIcon"
                phosphor="TextUnderlineIcon"
                remixicon="RiUnderline"
              ></svg>
              Toggle
            </button>
          </div>
        </div>
      </div>
      <!-- ToggleDisabled -->
      <div kuiExample title="Disabled">
        <div [sx]="styles.flexFlexWrapItemsCenterG">
          <button kuiToggle aria-label="Toggle disabled" disabled>
            Disabled
          </button>
          <button
            kuiToggle
            variant="outline"
            aria-label="Toggle disabled outline"
            disabled
          >
            Disabled
          </button>
        </div>
      </div>
      <!-- ToggleWithIcon -->
      <div kuiExample title="With Icon">
        <div [sx]="styles.flexFlexWrapItemsCenterG">
          <button kuiToggle aria-label="Toggle bookmark" defaultPressed>
            <svg
              iconPlaceholder
              lucide="BookmarkIcon"
              tabler="IconBookmark"
              hugeicons="BookmarkIcon"
              phosphor="BookmarkIcon"
              remixicon="RiBookmarkLine"
              [sx]="styles.groupDataStateOnToggleFi"
            ></svg>
          </button>
          <button
            kuiToggle
            variant="outline"
            aria-label="Toggle bookmark outline"
          >
            <svg
              iconPlaceholder
              lucide="BookmarkIcon"
              tabler="IconBookmark"
              hugeicons="BookmarkIcon"
              phosphor="BookmarkIcon"
              remixicon="RiBookmarkLine"
              [sx]="styles.groupDataStateOnToggleFi"
            ></svg>
            Bookmark
          </button>
        </div>
      </div>
    </div>
  `,
})
export default class ToggleExample {
  protected readonly styles = styles
}
