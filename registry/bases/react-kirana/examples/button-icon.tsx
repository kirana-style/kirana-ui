import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import { page } from "../../../styles/page.styles"

export default function ButtonIcon() {
  return (
    <div sx={page.example}>
      <Button variant="outline" size="icon">
        <IconPlaceholder
          lucide="CircleFadingArrowUpIcon"
          tabler="IconCircleArrowUp"
          hugeicons="CircleArrowUp02Icon"
          phosphor="ArrowCircleUpIcon"
          remixicon="RiArrowUpCircleLine"
        />
      </Button>
    </div>
  )
}
