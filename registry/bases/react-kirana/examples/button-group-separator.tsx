import { Button } from "../ui/button"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"
import { page } from "../../../styles/page.styles"

export default function ButtonGroupSeparatorDemo() {
  return (
    <div sx={page.example}>
      <ButtonGroup>
        <Button variant="secondary" size="sm">
          Copy
        </Button>
        <ButtonGroupSeparator />
        <Button variant="secondary" size="sm">
          Paste
        </Button>
      </ButtonGroup>
    </div>
  )
}
