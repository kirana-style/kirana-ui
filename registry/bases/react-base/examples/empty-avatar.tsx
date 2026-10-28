import { css } from "@kirana-style/core"

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

const styles = {
  size12: css({
    width: { "*": null, base: space[12] },
    height: { "*": null, base: space[12] },
  }),
  grayscale: css({ filter: "grayscale(100%)" }),
}

export default function EmptyAvatar() {
  return (
    <div sx={page.example}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="default">
            <Avatar sx={styles.size12}>
              <AvatarImage
                src="https://github.com/shadcn.png"
                sx={styles.grayscale}
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </EmptyMedia>
          <EmptyTitle>User Offline</EmptyTitle>
          <EmptyDescription>
            This user is currently offline. You can leave a message to notify
            them or try again later.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">Leave Message</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
