import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Bubble, BubbleContent } from "../ui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
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
}

@Component({
  selector: "message-group",
  imports: [
    Avatar,
    AvatarFallback,
    AvatarImage,
    Bubble,
    BubbleContent,
    Message,
    MessageAvatar,
    MessageContent,
    MessageGroup,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiMessageGroup>
          <div kuiMessage>
            <div kuiMessageAvatar></div>
            <div kuiMessageContent>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>I checked the registry addresses.</div>
              </div>
            </div>
          </div>
          <div kuiMessage>
            <div kuiMessageAvatar>
              <span kuiAvatar>
                <img
                  kuiAvatarImage
                  [attr.src]="'/avatars/02.png'"
                  alt="@avatar"
                />
                <span kuiAvatarFallback>CN</span>
              </span>
            </div>
            <div kuiMessageContent>
              <div kuiBubble variant="muted">
                <div kuiBubbleContent>
                  The component and example JSON now live under the UI registry.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class MessageGroupExample {
  protected readonly styles = styles
  protected readonly page = page
}
