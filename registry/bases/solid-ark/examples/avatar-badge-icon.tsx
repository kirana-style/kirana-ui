import { IconPlaceholder } from "../ui/icon-placeholder"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"

export default function AvatarBadgeIcon() {
  const styles = {
    exampleAvatar: css({
      filter: "grayscale(100%)",
    }),
  }

  return (
    <div sx={page.example}>
      <Avatar sx={styles.exampleAvatar}>
        <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
        <AvatarFallback>PP</AvatarFallback>
        <AvatarBadge>
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          />
        </AvatarBadge>
      </Avatar>
    </div>
  )
}
