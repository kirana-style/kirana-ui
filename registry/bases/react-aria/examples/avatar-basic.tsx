import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"

const styles = {
  avatarDemoAvatarImage: css({
    filter: "grayscale(100%)",
  }),
}

export default function AvatarDemo() {
  return (
    <div sx={page.example}>
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          sx={styles.avatarDemoAvatarImage}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
