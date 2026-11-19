import { IconPlaceholder } from "../ui/icon-placeholder"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../ui/avatar"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"

export default function AvatarGroupCountIcon() {
  const styles = {
    exampleAvatarGroup: css({
      filter: "grayscale(100%)",
    }),
  }

  return (
    <div sx={page.example}>
      <AvatarGroup sx={styles.exampleAvatarGroup}>
        <Avatar>
          <AvatarImage src={"/avatars/kirana.png"} alt="@kirana" />
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
        <AvatarGroupCount>
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          />
        </AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
