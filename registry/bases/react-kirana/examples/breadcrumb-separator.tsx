import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { page } from "../../../styles/page.styles"

export default function BreadcrumbSeparatorDemo() {
  return (
    <div sx={page.example}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<a href="/" />}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <IconPlaceholder
              lucide="DotIcon"
              tabler="IconPoint"
              hugeicons="DotIcon"
              phosphor="DotIcon"
              remixicon="RiCheckboxBlankCircleFill"
            />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink render={<a href="/components" />}>
              Components
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <IconPlaceholder
              lucide="DotIcon"
              tabler="IconPoint"
              hugeicons="DotIcon"
              phosphor="DotIcon"
              remixicon="RiCheckboxBlankCircleFill"
            />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
