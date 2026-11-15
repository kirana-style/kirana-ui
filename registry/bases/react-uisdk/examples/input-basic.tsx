import { Input } from "../ui/input"
import { page } from "../../../styles/page.styles"

export default function InputBasic() {
  return (
    <div sx={page.example}>
      <Input placeholder="Enter text" />
    </div>
  )
}
