"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "../../../ui/avatar"
import { Button } from "../../../ui/button"
import { Card, CardContent } from "../../../ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../../ui/empty"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"

const styles = {
  empty: css({
    height: { "*": null, base: space[56] },
    borderWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  avatarGroup: css({
    filter: { "*": null, base: "grayscale(100%)" },
  }),
}

export function NoTeamMembers() {
  return (
    <Card>
      <CardContent>
        <Empty sx={styles.empty}>
          <EmptyHeader>
            <EmptyMedia>
              <AvatarGroup sx={styles.avatarGroup}>
                <Avatar size="lg">
                  <AvatarImage src="/avatars/kirana.png" alt="@kirana" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </EmptyMedia>
            <EmptyTitle>No Team Members</EmptyTitle>
            <EmptyDescription>
              Invite your team to collaborate on this project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">Invite Members</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
