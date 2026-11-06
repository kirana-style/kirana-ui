import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { cardCtx } from "../../../../../core/context"
import { theme } from "../../../../../core/tokens"
import { axes } from "../../../../../core/axes"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar"
import { Button } from "../../../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "../../../ui/combobox"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip"

const styles = {
  card: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardHeader: css({
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    // The header's `[.border-b]:pb-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockEnd: cardCtx.spacing,
  }),
  cardTitle: css({
    fontSize: { "*": null, base: fontSize.sm },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight.sm,
      [axes.style.lyra]: lineHeight.sm,
      [axes.style.mira]: lineHeight.sm,
      [axes.style.luma]: lineHeight.sm,
      [axes.style.rhea]: lineHeight.sm,
      [axes.style.sera]: lineHeight.sm,
    },
  }),
  cardDescription: css({
    fontSize: { "*": null, base: fontSize.sm },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      base: lineHeight.sm,
      [axes.style.vega]: lineHeight.sm,
      [axes.style.maia]: lineHeight.sm,
      [axes.style.lyra]: lineHeight.sm,
      [axes.style.mira]: lineHeight.sm,
      [axes.style.luma]: lineHeight.sm,
      [axes.style.rhea]: lineHeight.sm,
    },
  }),
  avatar: css({
    width: { "*": null, base: space[4] },
    height: { "*": null, base: space[4] },
  }),
  avatar2: css({
    width: { "*": null, base: space[5] },
    height: { "*": null, base: space[5] },
  }),
}

const users = [
  "shadcn",
  "maxleiter",
  "evilrabbit",
  "pranathip",
  "jorgezreik",
  "shuding",
  "rauchg",
]

@Component({
  selector: "kui-assign-issue",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard [sx]="styles.card" size="sm">
      <div kuiCardHeader [sx]="styles.cardHeader">
        <div kuiCardTitle [sx]="styles.cardTitle">Assign Issue</div>
        <div kuiCardDescription [sx]="styles.cardDescription">
          Select users to assign to this issue.
        </div>
        <div kuiCardAction>
          <ng-container kuiTooltip>
            <button
              kuiButton
              kuiTooltipTrigger
              variant="outline"
              size="icon-xs"
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
            <div kuiTooltipContent>Add user</div>
          </ng-container>
        </div>
      </div>
      <div kuiCardContent>
        <ng-container
          kuiCombobox
          multiple
          autoHighlight
          [items]="users"
          [defaultValue]="[users[0]]"
        >
          <div kuiComboboxChips>
            <kui-combobox-value>
              <ng-template let-values>
                @for (username of values; track username) {
                  <div kuiComboboxChip>
                    <span kuiAvatar [sx]="styles.avatar">
                      <img
                        kuiAvatarImage
                        [attr.src]="\`https://github.com/\${username}.png\`"
                        [attr.alt]="username"
                      />
                      <span kuiAvatarFallback>{{ username.charAt(0) }}</span>
                    </span>
                    {{ username }}
                  </div>
                }
                <input
                  kuiComboboxChipsInput
                  [attr.placeholder]="
                    values.length > 0 ? undefined : 'Select a item...'
                  "
                />
              </ng-template>
            </kui-combobox-value>
          </div>
          <div kuiComboboxContent>
            <div kuiComboboxEmpty>No users found.</div>
            <div kuiComboboxList>
              <ng-template let-username>
                <div kuiComboboxItem [value]="username">
                  <span kuiAvatar [sx]="styles.avatar2">
                    <img
                      kuiAvatarImage
                      [attr.src]="\`https://github.com/\${username}.png\`"
                      [attr.alt]="username"
                    />
                    <span kuiAvatarFallback>{{ username.charAt(0) }}</span>
                  </span>
                  {{ username }}
                </div>
              </ng-template>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export class AssignIssue {
  protected readonly styles = styles
  protected readonly users = users
}
