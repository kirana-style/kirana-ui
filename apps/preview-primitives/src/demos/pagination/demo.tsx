import { Pagination } from "@kirana-ui/react/pagination"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"root" | "step" | "item" | "ellipsis">
}) {
  return (
    <Pagination.Root count={120} pageSize={10} defaultPage={3} {...s.root}>
      <Pagination.Previous {...s.step}>Previous</Pagination.Previous>
      <Pagination.Items>
        {(entry) =>
          entry.type === "page" ? (
            <Pagination.Item page={entry.page} {...s.item}>
              {entry.page}
            </Pagination.Item>
          ) : (
            <Pagination.Ellipsis {...s.ellipsis}>…</Pagination.Ellipsis>
          )
        }
      </Pagination.Items>
      <Pagination.Next {...s.step}>Next</Pagination.Next>
    </Pagination.Root>
  )
}
