"use client"

import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Field, FieldLabel } from "../../../ui/field"
import { Input } from "../../../ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../../ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { Separator } from "../../../ui/separator"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css } from "@kirana-style/core"
import { space } from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  input: css({
    flex: "1 1 0%",
  }),
  selectTrigger: css({
    width: { "*": null, base: space[24] },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

export function InviteTeam() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Team</CardTitle>
        <CardDescription>Add members to your workspace</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.div}>
          {[
            { email: "alex@example.com", role: "Editor" },
            { email: "sam@example.com", role: "Viewer" },
          ].map((invite) => (
            <div key={invite.email} sx={styles.div2}>
              <Input defaultValue={invite.email} sx={styles.input} />
              <Select
                items={[
                  { label: "Admin", value: "admin" },
                  { label: "Editor", value: "editor" },
                  { label: "Viewer", value: "viewer" },
                ]}
                defaultValue={invite.role.toLowerCase()}
              >
                <SelectTrigger sx={styles.selectTrigger}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} align="end">
                  <SelectGroup>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <Button variant="outline">
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
            data-icon="inline-start"
          />
          Add another
        </Button>
        <Separator />
        <Field>
          <FieldLabel htmlFor="invite-link">Or share invite link</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="invite-link"
              defaultValue="https://app.co/invite/x8f2k"
              readOnly
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Copy link">
                <IconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button}>Send Invites</Button>
      </CardFooter>
    </Card>
  )
}
