import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"

export default function AvatarBasic() {
  const styles = {
    avatarDemoAvatarImage: css({
      filter: "grayscale(100%)",
    }),
  }

  return (
    <div sx={page.example}>
      <Avatar>
        <AvatarImage
          src={"/avatars/kirana.png"}
          alt="@kirana"
          sx={styles.avatarDemoAvatarImage}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
