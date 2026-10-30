"use client"

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
  ComboboxChipList,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
} from "../../../ui/combobox"
import { Tooltip, TooltipTrigger } from "../../../ui/tooltip"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  card: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardHeader: css({
    borderBottomWidth: { "*": null, base: "1px" },
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

// Users available for assignment.
const users = [
  "shadcn",
  "maxleiter",
  "evilrabbit",
  "pranathip",
  "jorgezreik",
  "shuding",
  "rauchg",
]

export function AssignIssue() {
  return (
    <Card sx={styles.card} size="sm">
      <CardHeader sx={styles.cardHeader}>
        <CardTitle sx={styles.cardTitle}>Assign Issue</CardTitle>
        <CardDescription sx={styles.cardDescription}>
          Select users to assign to this issue.
        </CardDescription>
        <CardAction>
          <TooltipTrigger>
            <Button variant="outline" size="icon-xs">
              <IconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              />
            </Button>
            <Tooltip>Add user</Tooltip>
          </TooltipTrigger>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Combobox
          selectionMode="multiple"
          defaultValue={[users[0]]}
          allowsEmptyCollection
        >
          <ComboboxChips>
            <ComboboxChipList<{ username: string }>>
              {(value: { username: string }) => (
                <ComboboxChip id={value.username}>
                  <Avatar sx={styles.avatar}>
                    <AvatarImage
                      src={`https://github.com/${value.username}.png`}
                      alt={value.username}
                    />
                    <AvatarFallback>{value.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {value.username}
                </ComboboxChip>
              )}
            </ComboboxChipList>
            <ComboboxChipsInput placeholder="Select a item..." />
          </ComboboxChips>
          <ComboboxContent>
            <ComboboxList
              renderEmptyState={() => (
                <ComboboxEmpty>No users found.</ComboboxEmpty>
              )}
            >
              {users.map((username) => (
                <ComboboxItem
                  key={username}
                  id={username}
                  value={{ username }}
                  textValue={username}
                >
                  <Avatar sx={styles.avatar2}>
                    <AvatarImage
                      src={`https://github.com/${username}.png`}
                      alt={username}
                    />
                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {username}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </CardContent>
    </Card>
  )
}
