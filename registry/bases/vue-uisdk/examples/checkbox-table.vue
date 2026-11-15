<script setup lang="ts">
import { computed, ref } from "vue"
import { css } from "@kirana-style/core"
import { Checkbox } from "../ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  check: css({ width: space[8] }),
  medium: css({ fontWeight: fontWeight.medium }),
}

const tableData = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "Admin",
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    email: "marcus.rodriguez@example.com",
    role: "User",
  },
  {
    id: "3",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    role: "User",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    role: "Editor",
  },
]

const selectedRows = ref(new Set(["1"]))
const selectAll = computed(() => selectedRows.value.size === tableData.length)

// Ark reports `{ checked }`, `true`, `false` or `"indeterminate"`.
const handleSelectAll = ({
  checked,
}: {
  checked: boolean | "indeterminate"
}) => {
  selectedRows.value =
    checked === true ? new Set(tableData.map((row) => row.id)) : new Set()
}

const handleSelectRow = (id: string, checked: boolean) => {
  const next = new Set(selectedRows.value)
  if (checked) next.add(id)
  else next.delete(id)
  selectedRows.value = next
}
</script>

<template>
  <div :sx="page.example">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead :sx="styles.check">
            <Checkbox
              id="select-all-checkbox"
              name="select-all-checkbox"
              :checked="selectAll"
              @checked-change="handleSelectAll"
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="row in tableData"
          :key="row.id"
          :data-state="selectedRows.has(row.id) ? 'selected' : undefined"
        >
          <TableCell>
            <Checkbox
              :id="`row-${row.id}-checkbox`"
              :name="`row-${row.id}-checkbox`"
              :checked="selectedRows.has(row.id)"
              @checked-change="
                ({ checked }: { checked: boolean | 'indeterminate' }) =>
                  handleSelectRow(row.id, checked === true)
              "
            />
          </TableCell>
          <TableCell :sx="styles.medium">{{ row.name }}</TableCell>
          <TableCell>{{ row.email }}</TableCell>
          <TableCell>{{ row.role }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
