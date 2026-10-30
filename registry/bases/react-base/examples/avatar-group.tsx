import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"

const styles = {
  exampleAvatarGroup: css({
    filter: "grayscale(100%)",
  }),
}

export default function AvatarGroupExample() {
  return (
    <div sx={page.example}>
      <AvatarGroup sx={styles.exampleAvatarGroup}>
        <Avatar>
          <AvatarImage src="/avatars/kirana.png" alt="@kirana" />
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
      </AvatarGroup>
    </div>
  )
}
