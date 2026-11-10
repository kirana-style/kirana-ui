<script setup lang="ts">
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { css } from "@kirana-style/core"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { space, spacing } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  w48: css({ width: { "*": null, base: space[48] } }),
  wFullP2: css({ width: { "*": null, base: "100%" }, padding: space[2] }),
  sizeSpacing65: css({ width: spacing(6.5), height: spacing(6.5) }),
  grayscale: css({ filter: "grayscale(100%)" }),
  gap0: css({ gap: { "*": null, base: space[0] } }),
  leadingNone: css({ lineHeight: "1" }),
}

const people = [
  {
    username: "kirana",
    avatar: "/avatars/kirana.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
]
</script>

<template>
  <div :sx="page.example">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline">
          Select
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent :sx="styles.w48" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem v-for="person in people" :key="person.username">
            <Item size="xs" :sx="styles.wFullP2">
              <ItemMedia>
                <Avatar :sx="styles.sizeSpacing65">
                  <AvatarImage :src="person.avatar" :sx="styles.grayscale" />
                  <AvatarFallback>
                    {{ person.username.charAt(0) }}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent :sx="styles.gap0">
                <ItemTitle>
                  {{ person.username }}
                </ItemTitle>
                <ItemDescription :sx="styles.leadingNone">
                  {{ person.email }}
                </ItemDescription>
              </ItemContent>
            </Item>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
