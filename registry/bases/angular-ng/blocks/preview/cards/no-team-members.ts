import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { space } from "../../../../../core/scales"
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

@Component({
  selector: "kui-no-team-members",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarImage,
    Button,
    Card,
    CardContent,
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardContent>
        <div kuiEmpty [sx]="styles.empty">
          <div kuiEmptyHeader>
            <div kuiEmptyMedia>
              <div kuiAvatarGroup [sx]="styles.avatarGroup">
                <span kuiAvatar size="lg">
                  <img
                    kuiAvatarImage
                    [attr.src]="'/avatars/kirana.png'"
                    alt="@kirana"
                  />
                  <span kuiAvatarFallback>CN</span>
                </span>
                <span kuiAvatar size="lg">
                  <img
                    kuiAvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                  />
                  <span kuiAvatarFallback>LR</span>
                </span>
                <span kuiAvatar size="lg">
                  <img
                    kuiAvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <span kuiAvatarFallback>ER</span>
                </span>
              </div>
            </div>
            <div kuiEmptyTitle>No Team Members</div>
            <div kuiEmptyDescription>
              Invite your team to collaborate on this project.
            </div>
          </div>
          <div kuiEmptyContent>
            <button kuiButton size="sm">Invite Members</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NoTeamMembers {
  protected readonly styles = styles
}
