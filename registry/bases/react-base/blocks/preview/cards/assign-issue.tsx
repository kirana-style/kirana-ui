"use client"

import * as React from "react"

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
  useComboboxAnchor,
} from "../../../ui/combobox"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip"
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
  const anchor = useComboboxAnchor()
  return (
    <Card sx={styles.card} size="sm">
      <CardHeader sx={styles.cardHeader}>
        <CardTitle sx={styles.cardTitle}>Assign Issue</CardTitle>
        <CardDescription sx={styles.cardDescription}>
          Select users to assign to this issue.
        </CardDescription>
        <CardAction>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="outline" size="icon-xs" />}
            >
              <IconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              />
            </TooltipTrigger>
            <TooltipContent>Add user</TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Combobox
          multiple
          autoHighlight
          items={users}
          defaultValue={[users[0]]}
        >
          <ComboboxChips ref={anchor}>
            <ComboboxValue>
              {(values) => (
                <React.Fragment>
                  {values.map((username: string) => (
                    <ComboboxChip key={username}>
                      <Avatar sx={styles.avatar}>
                        <AvatarImage
                          src={`https://github.com/${username}.png`}
                          alt={username}
                        />
                        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {username}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    placeholder={
                      values.length > 0 ? undefined : "Select a item..."
                    }
                  />
                </React.Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No users found.</ComboboxEmpty>
            <ComboboxList>
              {(username: string) => (
                <ComboboxItem key={username} value={username}>
                  <Avatar sx={styles.avatar2}>
                    <AvatarImage
                      src={`https://github.com/${username}.png`}
                      alt={username}
                    />
                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {username}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </CardContent>
    </Card>
  )
}
