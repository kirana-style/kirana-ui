import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { Button } from "../ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"
import { page } from "../../../styles/page.styles"

export default function ButtonGroupSplit() {
  return (
    <div sx={page.example}>
      <ButtonGroup>
        <Button variant="secondary">Button</Button>
        <ButtonGroupSeparator />
        <Button size="icon" variant="secondary">
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          />
        </Button>
      </ButtonGroup>
    </div>
  )
}
