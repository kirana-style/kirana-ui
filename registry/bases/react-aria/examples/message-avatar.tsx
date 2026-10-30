import { css } from "@kirana-style/core"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Bubble, BubbleContent, BubbleGroup } from "../ui/bubble"
import { Message, MessageAvatar, MessageContent } from "../ui/message"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function MessageAvatarDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexWFullMaxWSmFlexColGa}>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="/avatars/03.png" alt="@avatar" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                The build failed during dependency installation.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="/avatars/10.png" alt="@avatar" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble>
              <BubbleContent>Can you share the exact error?</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="/avatars/03.png" alt="@avatar" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <BubbleGroup>
              <Bubble variant="muted">
                <BubbleContent>
                  Here&apos;s the error from the logs
                </BubbleContent>
              </Bubble>
              <Bubble variant="muted">
                <BubbleContent>
                  Something went wrong with the build. The libraries are not
                  installed correctly. Try running the build again.
                </BubbleContent>
              </Bubble>
            </BubbleGroup>
          </MessageContent>
        </Message>
      </div>
    </div>
  )
}
