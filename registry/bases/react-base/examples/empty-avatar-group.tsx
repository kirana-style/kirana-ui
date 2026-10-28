import { css, select } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { theme } from "../../../core/tokens"

const styles = {
  flexSpaceX2DataSlotAvata: css({
    display: "flex",
    [select.child(":not(:last-child)")]: {
      marginInlineEnd: `calc(${space[2]} * -1)`,
    },
    [select.child('[data-slot="avatar"]')]: {
      boxShadow: `0 0 0 2px ${theme.background}`,
      filter: "grayscale(100%)",
      width: space[12],
      height: space[12],
    },
  }),
}

export default function EmptyAvatarGroup() {
  return (
    <div sx={page.example}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <div sx={styles.flexSpaceX2DataSlotAvata}>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </EmptyMedia>
          <EmptyTitle>No Team Members</EmptyTitle>
          <EmptyDescription>
            Invite your team to collaborate on this project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
            Invite Members
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
