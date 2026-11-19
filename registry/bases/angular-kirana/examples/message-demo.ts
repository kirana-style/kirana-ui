import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { shimmer } from "../../../styles/shimmer.styles"
import { page } from "../../../styles/page.styles"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "../ui/bubble"
import { Marker, MarkerContent } from "../ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "../ui/message"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[6] },
    paddingBlock: { "*": null, base: space[12] },
  }),
  medium: css({ fontWeight: fontWeight.medium }),
}

@Component({
  selector: "message-demo",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Bubble,
    BubbleContent,
    BubbleGroup,
    BubbleReactions,
    Marker,
    MarkerContent,
    Message,
    MessageAvatar,
    MessageContent,
    MessageFooter,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiMessage align="end">
          <div kuiMessageAvatar>
            <span kuiAvatar>
              <img kuiAvatarImage [attr.src]="'/avatars/10.png'" alt="@me" />
              <span kuiAvatarFallback>ME</span>
            </span>
          </div>
          <div kuiMessageContent>
            <div kuiBubble>
              <div kuiBubbleContent>Deploying to prod real quick.</div>
            </div>
          </div>
        </div>
        <div kuiMessage>
          <div kuiMessageAvatar>
            <span kuiAvatar>
              <img
                kuiAvatarImage
                [attr.src]="'/avatars/02.png'"
                alt="@rabbit"
              />
              <span kuiAvatarFallback>R</span>
            </span>
          </div>
          <div kuiMessageContent>
            <div kuiBubble variant="muted">
              <div kuiBubbleContent>It's 4:55 PM. On a Friday.</div>
            </div>
          </div>
        </div>
        <div kuiMessage align="end">
          <div kuiMessageAvatar>
            <span kuiAvatar>
              <img kuiAvatarImage [attr.src]="'/avatars/10.png'" alt="@me" />
              <span kuiAvatarFallback>ME</span>
            </span>
          </div>
          <div kuiMessageContent>
            <div kuiBubble>
              <div kuiBubbleContent>It's a one-line change.</div>
            </div>
            <div kuiMessageFooter>Delivered</div>
          </div>
        </div>
        <div kuiMessage>
          <div kuiMessageAvatar>
            <span kuiAvatar>
              <img
                kuiAvatarImage
                [attr.src]="'/avatars/02.png'"
                alt="@rabbit"
              />
              <span kuiAvatarFallback>R</span>
            </span>
          </div>
          <div kuiMessageContent>
            <div kuiBubbleGroup>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>It's always a one-line change 😭.</div>
              </div>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>Alright, let me take a look.</div>
                <div kuiBubbleReactions aria-label="Reactions: thumbs up">
                  <span>👍</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div kuiMarker role="status">
          <span kuiMarkerContent [sx]="shimmer">
            <span [sx]="styles.medium">Oliver</span>
            is typing...
          </span>
        </div>
      </div>
    </div>
  `,
})
export default class MessageDemo {
  protected readonly styles = styles
  protected readonly shimmer = shimmer
  protected readonly page = page
}
