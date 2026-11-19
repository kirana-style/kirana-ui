<script lang="ts">

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
  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
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
</script>

<Card sx={styles.card} size="sm">
  <CardHeader sx={styles.cardHeader}>
    <CardTitle sx={styles.cardTitle}>
      Assign Issue
    </CardTitle>
    <CardDescription sx={styles.cardDescription}>
      Select users to assign to this issue.
    </CardDescription>
    <CardAction>
      <Tooltip>
        <TooltipTrigger>
          {#snippet asChild(props)}
            <Button {...props()} variant="outline" size="icon-xs">
              <IconPlaceholder lucide="PlusIcon" tabler="IconPlus" hugeicons="PlusSignIcon" phosphor="PlusIcon" remixicon="RiAddLine" />
            </Button>
          {/snippet}
        </TooltipTrigger>
        <TooltipContent>
          Add user
        </TooltipContent>
      </Tooltip>
    </CardAction>
  </CardHeader>
  <CardContent>
    <Combobox multiple autoHighlight items={users} defaultValue={[users[0]]}>
      <ComboboxChips>
        <ComboboxValue>
          {#snippet children(values)}
            {#each values as username (username)}
              <ComboboxChip>
                <Avatar sx={styles.avatar}>
                  <AvatarImage src={`https://github.com/${username}.png`} alt={username} />
                  <AvatarFallback>
                    {username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {username}
              </ComboboxChip>
            {/each}
            <ComboboxChipsInput placeholder={values.length > 0 ? undefined : 'Select a item...'} />
          {/snippet}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>
          No users found.
        </ComboboxEmpty>
        <ComboboxList>
          {#snippet children({ item: username })}
            <ComboboxItem value={username}>
              <Avatar sx={styles.avatar2}>
                <AvatarImage src={`https://github.com/${username}.png`} alt={username} />
                <AvatarFallback>
                  {username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {username}
            </ComboboxItem>
          {/snippet}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  </CardContent>
</Card>
