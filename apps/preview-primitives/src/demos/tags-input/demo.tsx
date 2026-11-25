import { TagsInput } from "@kirana-ui/react/tags-input"

import type { Styles } from "../../styled.ts"

export default function Demo({
  s,
}: {
  s: Styles<
    | "field"
    | "label"
    | "root"
    | "list"
    | "tag"
    | "tagInput"
    | "remove"
    | "icon"
    | "input"
    | "hint"
  >
}) {
  return (
    <div {...s.field}>
      <span aria-hidden="true" {...s.label}>
        Skills
      </span>
      <TagsInput.Root defaultValue={["Design", "Writing"]} {...s.root}>
        <TagsInput.List aria-label="Skills" {...s.list}>
          <TagsInput.Items>
            {(entry) => (
              <TagsInput.Item entry={entry} {...s.tag}>
                <TagsInput.ItemText />
                <TagsInput.ItemInput {...s.tagInput} />
                <TagsInput.ItemRemove {...s.remove}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                    {...s.icon}
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </TagsInput.ItemRemove>
              </TagsInput.Item>
            )}
          </TagsInput.Items>
        </TagsInput.List>
        <TagsInput.Input
          aria-label="Add a skill"
          placeholder="Add a skill"
          {...s.input}
        />
      </TagsInput.Root>
      <p {...s.hint}>Enter or a comma adds it.</p>
    </div>
  )
}
