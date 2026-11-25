import { Editable } from "@kirana-ui/react/editable"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<"root" | "preview" | "input" | "edit" | "icon" | "save" | "cancel">
}) {
  return (
    <Editable.Root
      defaultValue="Moonlight garden"
      placeholder="Name your project"
      activation="click"
      {...s.root}
    >
      <Editable.Preview {...s.preview} />
      <Editable.Input aria-label="Project name" {...s.input} />
      <Editable.EditTrigger aria-label="Rename project" {...s.edit}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          {...s.icon}
        >
          <path d="M4 20h4L19 9l-4-4L4 16v4z" />
        </svg>
      </Editable.EditTrigger>
      <Editable.SubmitTrigger {...s.save}>Save</Editable.SubmitTrigger>
      <Editable.CancelTrigger {...s.cancel}>Cancel</Editable.CancelTrigger>
    </Editable.Root>
  )
}
