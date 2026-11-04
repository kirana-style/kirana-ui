import { Button } from "../ui/button"
import { page } from "../../../styles/page.styles"

export default function ButtonGhost() {
  return (
    <div sx={page.example}>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}
