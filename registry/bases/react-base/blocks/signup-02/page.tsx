"use client"

import { SignupForm } from "./components/signup-form"
import { IconPlaceholder } from "../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { DARK_SCHEME, axes } from "../../../../core/axes"
import { radius, theme } from "../../../../core/tokens"
import {
  breakpoint,
  containerSize,
  fontWeight,
  space,
} from "../../../../core/scales"

const styles = {
  signupPageDiv: css({
    display: "grid",
    minHeight: "100svh",
    gridTemplateColumns: { [breakpoint.lg]: "repeat(2, minmax(0, 1fr))" },
  }),
  signupPageDiv2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  signupPageDiv3: css({
    display: "flex",
    justifyContent: { base: "center", [breakpoint.md]: "flex-start" },
    gap: space[2],
  }),
  signupPageA: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    fontWeight: fontWeight.medium,
  }),
  signupPageDiv4: css({
    display: "flex",
    width: space[6],
    height: space[6],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: theme.primary,
    color: theme.primaryForeground,
  }),
  signupPageIconPlaceholder: css({
    width: space[4],
    height: space[4],
  }),
  signupPageDiv5: css({
    display: "flex",
    flex: "1 1 0%",
    alignItems: "center",
    justifyContent: "center",
  }),
  signupPageDiv6: css({
    width: "100%",
    maxWidth: containerSize.xs,
  }),
  signupPageDiv7: css({
    position: "relative",
    display: { base: "none", [breakpoint.lg]: "block" },
    backgroundColor: theme.muted,
  }),
  signupPageImg: css({
    position: "absolute",
    inset: space["0"],
    height: "100%",
    width: "100%",
    objectFit: "cover",

    filter: {
      base: "none",
      [DARK_SCHEME]: {
        base: "brightness(0.2) grayscale(100%)",
        [axes.mode.light]: "none",
      },
      [axes.mode.dark]: "brightness(0.2) grayscale(100%)",
    },
  }),
}

export default function SignupPage() {
  return (
    <div sx={styles.signupPageDiv}>
      <div sx={styles.signupPageDiv2}>
        <div sx={styles.signupPageDiv3}>
          <a href="#" sx={styles.signupPageA}>
            <div sx={styles.signupPageDiv4}>
              <IconPlaceholder
                lucide="GalleryVerticalEndIcon"
                tabler="IconLayoutRows"
                hugeicons="LayoutBottomIcon"
                phosphor="RowsIcon"
                remixicon="RiGalleryLine"
                {...styleProps(styles.signupPageIconPlaceholder)}
              />
            </div>
            Acme Inc.
          </a>
        </div>
        <div sx={styles.signupPageDiv5}>
          <div sx={styles.signupPageDiv6}>
            <SignupForm />
          </div>
        </div>
      </div>
      <div sx={styles.signupPageDiv7}>
        <img src="/placeholder.svg" alt="Image" sx={styles.signupPageImg} />
      </div>
    </div>
  )
}
