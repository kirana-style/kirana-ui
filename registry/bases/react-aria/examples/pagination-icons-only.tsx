import { css } from "@kirana-style/core"

import { Field, FieldLabel } from "../ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  flexItemsCenterJustifyBe: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: { "*": null, base: space[4] },
  }),
  fit: css({ width: "fit-content" }),
  w20: css({ width: { "*": null, base: space[20] } }),
  mx0WAuto: css({ marginInline: space[0], width: "auto" }),
}

export default function PaginationIconsOnly() {
  return (
    <div sx={page.example}>
      <div sx={styles.flexItemsCenterJustifyBe}>
        <Field orientation="horizontal" sx={styles.fit}>
          <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
          <Select defaultValue="25">
            <SelectTrigger sx={styles.w20} id="select-rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent placement="bottom start">
              <SelectGroup>
                <SelectItem id="10">10</SelectItem>
                <SelectItem id="25">25</SelectItem>
                <SelectItem id="50">50</SelectItem>
                <SelectItem id="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Pagination sx={styles.mx0WAuto}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
