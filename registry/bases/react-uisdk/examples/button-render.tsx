import { buttonVariants } from "../ui/button"
import { page } from "../../../styles/page.styles"

export default function ButtonRender() {
  return (
    <div sx={page.example}>
      <a href="#" sx={buttonVariants({ variant: "secondary", size: "sm" })}>
        Login
      </a>
    </div>
  )
}
