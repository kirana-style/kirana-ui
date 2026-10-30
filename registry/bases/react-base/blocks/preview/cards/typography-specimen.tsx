"use client"

import { Button } from "../../../ui/button"
import { Card, CardContent, CardFooter } from "../../../ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog"
import { Field, FieldGroup, FieldLabel } from "../../../ui/field"
import { Input } from "../../../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { Textarea } from "../../../ui/textarea"
import { FONT_INFO } from "../../../../../core/config"
import { useDesign } from "../../../../../lib/use-design"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { font, theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  div: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  p: css({
    fontFamily: font.heading,
    fontSize: {
      base: fontSize["2xl"],
      [axes.style.sera]: fontSize.lg,
    },
    lineHeight: {
      base: lineHeight["2xl"],
      [axes.style.sera]: lineHeight.lg,
    },
    fontWeight: {
      base: fontWeight.medium,
      [axes.style.sera]: fontWeight.semibold,
    },
    letterSpacing: { [axes.style.sera]: letterSpacing.wider },
    textTransform: { [axes.style.sera]: "uppercase" },
  }),
  p2: css({
    fontSize: fontSize.sm,
    lineHeight: leading.relaxed,
    color: theme.mutedForeground,
  }),
  p3: css({
    fontSize: fontSize.sm,
    lineHeight: leading.relaxed,
    color: theme.mutedForeground,
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
  div2: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[3],
  }),
  selectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  textarea: css({
    minHeight: { "*": null, base: space[24] },
    resize: { "*": null, base: "none" },
  }),
}

export function TypographySpecimen() {
  const bodyFont = useDesign("font")
  const fontHeading = useDesign("fontHeading")
  const headingLabel =
    fontHeading !== "inherit" && fontHeading !== bodyFont
      ? FONT_INFO[fontHeading].title
      : "Inherit"
  const bodyLabel = FONT_INFO[bodyFont].title

  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.div}>
          {headingLabel} - {bodyLabel}
        </div>
        <p sx={styles.p}>Designing with rhythm and hierarchy.</p>
        <p sx={styles.p2}>
          A strong body style keeps long-form content readable and balances the
          visual weight of headings.
        </p>
        <p sx={styles.p3}>
          Thoughtful spacing and cadence help paragraphs scan quickly without
          feeling dense.
        </p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger
            render={<Button variant="outline" sx={styles.button} />}
          >
            Share Feedback
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Feedback</DialogTitle>
              <DialogDescription>
                Let us know how we can improve your experience.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <div sx={styles.div2}>
                <Field>
                  <FieldLabel htmlFor="feedback-name">Name</FieldLabel>
                  <Input id="feedback-name" placeholder="Your name" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="feedback-email">Email</FieldLabel>
                  <Input
                    id="feedback-email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="feedback-category">Category</FieldLabel>
                <Select
                  items={[
                    { label: "General", value: "general" },
                    { label: "Bug Report", value: "bug" },
                    { label: "Feature Request", value: "feature" },
                    { label: "Improvement", value: "improvement" },
                  ]}
                  defaultValue="general"
                >
                  <SelectTrigger
                    id="feedback-category"
                    sx={styles.selectTrigger}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="improvement">Improvement</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="feedback-message">Message</FieldLabel>
                <Textarea
                  id="feedback-message"
                  placeholder="Tell us what's on your mind..."
                  sx={styles.textarea}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Cancel
              </DialogClose>
              <Button>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
