import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  w64: css({ width: { "*": null, base: space[64] } }),
  gap4: css({ gap: { "*": null, base: space[4] } }),
  w12: css({ width: "50%" }),
}

export default function PopoverForm() {
  return (
    <div sx={page.example}>
      <>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Open Popover
          </PopoverTrigger>
          <PopoverContent sx={styles.w64} align="start">
            <PopoverHeader>
              <PopoverTitle>Dimensions</PopoverTitle>
              <PopoverDescription>
                Set the dimensions for the layer.
              </PopoverDescription>
            </PopoverHeader>
            <FieldGroup sx={styles.gap4}>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="width" sx={styles.w12}>
                  Width
                </FieldLabel>
                <Input id="width" defaultValue="100%" />
              </Field>
              <Field orientation="horizontal">
                <FieldLabel htmlFor="height" sx={styles.w12}>
                  Height
                </FieldLabel>
                <Input id="height" defaultValue="25px" />
              </Field>
            </FieldGroup>
          </PopoverContent>
        </Popover>
      </>
    </div>
  )
}
