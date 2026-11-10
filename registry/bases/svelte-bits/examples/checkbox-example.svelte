<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Example, ExampleWrapper } from "../components/example"
  import { Checkbox } from "../ui/checkbox"
  import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
  } from "../ui/field"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"
  import { fontWeight, space } from "../../../core/scales"

  const styles = {
    check: css({ width: space[8] }),
    medium: css({ fontWeight: fontWeight.medium }),
    normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
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

  let selectedRows = $state(new Set(["1"]))
  const selectAll = $derived.by(() => selectedRows.size === tableData.length)

  // Ark reports `{ checked }`, `true`, `false` or `"indeterminate"`.
  const handleSelectAll = ({
    checked,
  }: {
    checked: boolean | "indeterminate"
  }) => {
    selectedRows =
      checked === true ? new Set(tableData.map((row) => row.id)) : new Set()
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const next = new Set(selectedRows)
    if (checked) next.add(id)
    else next.delete(id)
    selectedRows = next
  }
</script>

<ExampleWrapper>
  <!-- CheckboxBasic -->
  <Example title="Basic">
    <Field orientation="horizontal">
      <Checkbox id="terms" />
      <FieldLabel for="terms">
        Accept terms and conditions
      </FieldLabel>
    </Field>
  </Example>
  <!-- CheckboxWithDescription -->
  <Example title="With Description">
    <Field orientation="horizontal">
      <Checkbox id="terms-2" defaultChecked />
      <FieldContent>
        <FieldLabel for="terms-2">
          Accept terms and conditions
        </FieldLabel>
        <FieldDescription>
          By clicking this checkbox, you agree to the terms and conditions.
        </FieldDescription>
      </FieldContent>
    </Field>
  </Example>
  <!-- CheckboxInvalid -->
  <Example title="Invalid">
    <Field orientation="horizontal" data-invalid="true">
      <Checkbox id="terms-3" aria-invalid="true" />
      <FieldLabel for="terms-3">
        Accept terms and conditions
      </FieldLabel>
    </Field>
  </Example>
  <!-- CheckboxDisabled -->
  <Example title="Disabled">
    <Field orientation="horizontal">
      <Checkbox id="toggle" disabled />
      <FieldLabel for="toggle">
        Enable notifications
      </FieldLabel>
    </Field>
  </Example>
  <!-- CheckboxWithTitle -->
  <Example title="With Title">
    <FieldGroup>
      <FieldLabel for="toggle-2">
        <Field orientation="horizontal">
          <Checkbox id="toggle-2" defaultChecked />
          <FieldContent>
            <FieldTitle>
              Enable notifications
            </FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
      <FieldLabel for="toggle-4">
        <Field orientation="horizontal" data-disabled="true">
          <Checkbox id="toggle-4" disabled />
          <FieldContent>
            <FieldTitle>
              Enable notifications
            </FieldTitle>
            <FieldDescription>
              You can enable or disable notifications at any time.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  </Example>
  <!-- CheckboxInTable -->
  <Example title="In Table">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead sx={styles.check}>
            <Checkbox id="select-all" checked={selectAll} onCheckedChange={handleSelectAll} />
          </TableHead>
          <TableHead>
            Name
          </TableHead>
          <TableHead>
            Email
          </TableHead>
          <TableHead>
            Role
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each tableData as row (row.id)}
          <TableRow data-state={selectedRows.has(row.id) ? 'selected' : undefined}>
            <TableCell>
              <Checkbox id={`row-${row.id}`} checked={selectedRows.has(row.id)} onCheckedChange={
                  ({ checked }: { checked: boolean | 'indeterminate' }) =>
                    handleSelectRow(row.id, checked === true)
                } />
            </TableCell>
            <TableCell sx={styles.medium}>
              {row.name}
            </TableCell>
            <TableCell>
              {row.email}
            </TableCell>
            <TableCell>
              {row.role}
            </TableCell>
          </TableRow>
        {/each}
      </TableBody>
    </Table>
  </Example>
  <!-- CheckboxGroup -->
  <Example title="Group">
    <Field>
      <FieldLabel>
        Show these items on the desktop:
      </FieldLabel>
      <Field orientation="horizontal">
        <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
        <FieldLabel for="finder-pref-9k2-hard-disks-ljj" sx={styles.normal}>
          Hard disks
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="finder-pref-9k2-external-disks-1yg" />
        <FieldLabel for="finder-pref-9k2-external-disks-1yg" sx={styles.normal}>
          External disks
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="finder-pref-9k2-cds-dvds-fzt" />
        <FieldLabel for="finder-pref-9k2-cds-dvds-fzt" sx={styles.normal}>
          CDs, DVDs, and iPods
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="finder-pref-9k2-connected-servers-6l2" />
        <FieldLabel for="finder-pref-9k2-connected-servers-6l2" sx={styles.normal}>
          Connected servers
        </FieldLabel>
      </Field>
    </Field>
  </Example>
</ExampleWrapper>
