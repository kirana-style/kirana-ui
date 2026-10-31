import * as React from "react"

import { Example, ExampleWrapper } from "../components/example"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import { css, select } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import { radius, theme } from "../../../core/tokens"
import {
  containerSize,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  space,
} from "../../../core/scales"
import { cardCtx } from "../../../core/context"

const styles = {
  root: css({ [cardCtx.spacing]: { "*": null, base: space[4] } }),
  root2: css({ [cardCtx.spacing]: { "*": null, base: space[5] } }),
  root3: css({ [cardCtx.spacing]: { "*": null, base: space[6] } }),
  root4: css({ [cardCtx.spacing]: { "*": null, base: space[8] } }),
  cardContentEdgeToEdgeCard: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardContentEdgeToEdgeCardContent: css({
    marginBottom: { "*": null, base: `calc(${cardCtx.spacing} * -1)` },
    paddingInline: { "*": null, base: space["0"] },
  }),
  cardContentEdgeToEdgeDiv: css({
    maxHeight: space[48],
    overflowY: "scroll",
    borderTopWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
    paddingInline: cardCtx.spacing,
    paddingBlock: space[4],
    fontSize: fontSize.sm,
    lineHeight: leading.relaxed,
    [select.child(":not(:last-child)")]: {
      marginBlockStart: "0px",
      marginBottom: space[4],
    },
  }),
  cardContentEdgeToEdgeCardFooter: css({
    justifyContent: { "*": null, base: "flex-end" },
    gap: { "*": null, base: space[2] },
  }),
  cardCustomSpacingDiv: css({
    marginInline: "auto",
    display: "grid",
    width: "100%",
    maxWidth: containerSize.sm,
    gap: space[4],
  }),
  cardCustomSpacingToggleGroup: css({
    justifyContent: "center",
  }),
  cardCustomSpacingDiv2: css({
    display: "grid",
    gap: space[2],
    borderRadius: {
      base: radius.lg,
      [axes.style.lyra]: "0",
      [axes.style.sera]: "0",
    },
    backgroundColor: `color-mix(in oklab, ${theme.muted} 50%, transparent)`,
    padding: space[3],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  cardCustomSpacingDiv3: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[2],
  }),
  cardCustomSpacingSpan: css({
    color: theme.mutedForeground,
  }),
  cardCustomSpacingSpan2: css({
    fontWeight: fontWeight.medium,
  }),
  cardCustomSpacingDiv4: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[2],
  }),
  cardCustomSpacingSpan3: css({
    color: theme.mutedForeground,
  }),
  cardCustomSpacingSpan4: css({
    fontWeight: fontWeight.medium,
  }),
  cardLoginCard: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardLoginDiv: css({
    display: "flex",
    alignItems: "center",
  }),
  cardLoginA: css({
    marginLeft: "auto",
    display: "inline-block",
    textUnderlineOffset: "4px",
    textDecorationLine: { ":hover": "underline" },
  }),
  cardLoginCardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  cardLoginButton: css({
    width: { "*": null, base: "100%" },
  }),
  cardLoginButton2: css({
    width: { "*": null, base: "100%" },
  }),
  cardLoginDiv2: css({
    marginTop: space[4],
    textAlign: "center",
  }),
  cardLoginA2: css({
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
  }),
  cardMeetingNotesCard: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardMeetingNotesOl: css({
    marginTop: space[4],
    display: "flex",
    listStyleType: "decimal",
    flexDirection: "column",
    gap: space[2],
    paddingLeft: space[6],
  }),
  cardWithImageCard: css({
    position: { "*": null, base: "relative" },
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
    paddingTop: { "*": null, base: space["0"] },
  }),
  cardWithImageDiv: css({
    position: "absolute",
    inset: space["0"],
    zIndex: 30,
    aspectRatio: "16 / 9",
    backgroundColor: theme.primary,
    opacity: "50%",
    mixBlendMode: "color",
  }),
  cardWithImageImg: css({
    position: "relative",
    zIndex: 20,
    aspectRatio: "16 / 9",
    width: "100%",
    objectFit: "cover",
    filter: "brightness(60%) grayscale(100%)",
  }),
  cardWithImageButton: css({
    width: { "*": null, base: "100%" },
  }),
  cardWithImageSmallCard: css({
    position: { "*": null, base: "relative" },
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
    paddingTop: { "*": null, base: space["0"] },
  }),
  cardWithImageSmallDiv: css({
    position: "absolute",
    inset: space["0"],
    zIndex: 30,
    aspectRatio: "16 / 9",
    backgroundColor: theme.primary,
    opacity: "50%",
    mixBlendMode: "color",
  }),
  cardWithImageSmallImg: css({
    position: "relative",
    zIndex: 20,
    aspectRatio: "16 / 9",
    width: "100%",
    objectFit: "cover",
    filter: "brightness(60%) grayscale(100%)",
  }),
  cardWithImageSmallButton: css({
    width: { "*": null, base: "100%" },
  }),
  cardHeaderWithBorderCard: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardHeaderWithBorderCardHeader: css({
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    borderStyle: { "*": null, base: "solid" },
    // The header's `[.border-b]:pb-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockEnd: cardCtx.spacing,
  }),
  cardFooterWithBorderCard: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardFooterWithBorderCardFooter: css({
    borderStyle: { "*": null, base: "solid" },
    borderTopWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    // The footer's `[.border-t]:pt-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockStart: cardCtx.spacing,
  }),
  cardFooterWithBorderButton: css({
    width: { "*": null, base: "100%" },
  }),
  cardDefaultCard: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardDefaultButton: css({
    width: { "*": null, base: "100%" },
  }),
  cardSmallCard: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardSmallButton: css({
    width: { "*": null, base: "100%" },
  }),
  cardHeaderWithBorderSmallCard: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardHeaderWithBorderSmallCardHeader: css({
    borderBottomWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    borderStyle: { "*": null, base: "solid" },
    // The header's `[.border-b]:pb-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockEnd: cardCtx.spacing,
  }),
  cardFooterWithBorderSmallCard: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
  }),
  cardFooterWithBorderSmallCardFooter: css({
    borderStyle: { "*": null, base: "solid" },
    borderTopWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    // The footer's `[.border-t]:pt-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockStart: cardCtx.spacing,
  }),
  cardFooterWithBorderSmallButton: css({
    width: { "*": null, base: "100%" },
  }),
}

const spacingOptions = [
  {
    sx: styles.root,
    label: "16px",
    value: "4",
  },
  {
    sx: styles.root2,
    label: "20px",
    value: "5",
  },
  {
    sx: styles.root3,
    label: "24px",
    value: "6",
  },
  {
    sx: styles.root4,
    label: "32px",
    value: "8",
  },
]

export default function CardExample() {
  return (
    <ExampleWrapper>
      <CardDefault />
      <CardSmall />
      <CardContentEdgeToEdge />
      <CardCustomSpacing />
      <CardHeaderWithBorder />
      <CardFooterWithBorder />
      <CardHeaderWithBorderSmall />
      <CardFooterWithBorderSmall />
      <CardWithImage />
      <CardWithImageSmall />
      <CardLogin />
      <CardMeetingNotes />
    </ExampleWrapper>
  )
}

function CardContentEdgeToEdge() {
  return (
    <Example title="Content Edge to Edge">
      <Card sx={styles.cardContentEdgeToEdgeCard}>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
          <CardDescription>
            Review the terms before accepting the agreement.
          </CardDescription>
        </CardHeader>
        <CardContent sx={styles.cardContentEdgeToEdgeCardContent}>
          <div sx={styles.cardContentEdgeToEdgeDiv}>
            <p>
              These terms govern your use of the workspace, including access to
              shared documents, project files, and collaboration tools.
            </p>
            <p>
              You are responsible for the content you upload and for ensuring
              that your team has the appropriate permissions to view or edit it.
            </p>
            <p>
              We may update features or limits as the service evolves. When
              those changes materially affect your workflow, we will notify your
              workspace administrators.
            </p>
            <p>
              By continuing, you agree to keep your account credentials secure
              and to follow your organization&apos;s acceptable use policies.
            </p>
          </div>
        </CardContent>
        <CardFooter sx={styles.cardContentEdgeToEdgeCardFooter}>
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardCustomSpacing() {
  const [spacing, setSpacing] = React.useState("4")
  const selectedSpacing = spacingOptions.find(
    (option) => option.value === spacing
  )

  return (
    <Example title="Custom Spacing">
      <div sx={styles.cardCustomSpacingDiv}>
        <ToggleGroup
          selectedKeys={[spacing]}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0]
            if (key) {
              setSpacing(String(key))
            }
          }}
          variant="outline"
          size="sm"
          sx={styles.cardCustomSpacingToggleGroup}
        >
          {spacingOptions.map((option) => (
            <ToggleGroupItem key={option.value} id={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Card sx={selectedSpacing?.sx}>
          <CardHeader>
            <CardTitle>Release Health</CardTitle>
            <CardDescription>
              Track readiness across launch signals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div sx={styles.cardCustomSpacingDiv2}>
              <div sx={styles.cardCustomSpacingDiv3}>
                <span sx={styles.cardCustomSpacingSpan}>Checks passed</span>
                <span sx={styles.cardCustomSpacingSpan2}>24 / 26</span>
              </div>
              <div sx={styles.cardCustomSpacingDiv4}>
                <span sx={styles.cardCustomSpacingSpan3}>Open blockers</span>
                <span sx={styles.cardCustomSpacingSpan4}>2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Example>
  )
}

function CardLogin() {
  return (
    <Example title="Login">
      <Card sx={styles.cardLoginCard}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div sx={styles.cardLoginDiv}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" sx={styles.cardLoginA}>
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter sx={styles.cardLoginCardFooter}>
          <Button type="submit" sx={styles.cardLoginButton}>
            Login
          </Button>
          <Button variant="outline" sx={styles.cardLoginButton2}>
            Login with Google
          </Button>
          <div sx={styles.cardLoginDiv2}>
            Don&apos;t have an account?{" "}
            <a href="#" sx={styles.cardLoginA2}>
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardMeetingNotes() {
  return (
    <Example title="Meeting Notes">
      <Card sx={styles.cardMeetingNotesCard}>
        <CardHeader>
          <CardTitle>Meeting Notes</CardTitle>
          <CardDescription>
            Transcript from the meeting with the client.
          </CardDescription>
          <CardAction>
            <Button variant="outline" size="sm">
              <IconPlaceholder
                lucide="CaptionsIcon"
                tabler="IconTextCaption"
                hugeicons="TextCheckIcon"
                phosphor="TextTIcon"
                remixicon="RiTextWrap"
                data-icon="inline-start"
              />
              Transcribe
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>
            Client requested dashboard redesign with focus on mobile
            responsiveness.
          </p>
          <ol sx={styles.cardMeetingNotesOl}>
            <li>New analytics widgets for daily/weekly metrics</li>
            <li>Simplified navigation menu</li>
            <li>Dark mode support</li>
            <li>Timeline: 6 weeks</li>
            <li>Follow-up meeting scheduled for next Tuesday</li>
          </ol>
        </CardContent>
        <CardFooter>
          <AvatarGroup>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+8</AvatarGroupCount>
          </AvatarGroup>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardWithImage() {
  return (
    <Example title="With Image">
      <Card size="default" sx={styles.cardWithImageCard}>
        <div sx={styles.cardWithImageDiv} />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          sx={styles.cardWithImageImg}
        />
        <CardHeader>
          <CardTitle>Beautiful Landscape</CardTitle>
          <CardDescription>
            A stunning view that captures the essence of natural beauty.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button sx={styles.cardWithImageButton}>
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="Add01Icon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
              data-icon="inline-start"
            />
            Button
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardWithImageSmall() {
  return (
    <Example title="With Image (Small)">
      <Card size="sm" sx={styles.cardWithImageSmallCard}>
        <div sx={styles.cardWithImageSmallDiv} />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          sx={styles.cardWithImageSmallImg}
        />
        <CardHeader>
          <CardTitle>Beautiful Landscape</CardTitle>
          <CardDescription>
            A stunning view that captures the essence of natural beauty.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button size="sm" sx={styles.cardWithImageSmallButton}>
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="Add01Icon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
              data-icon="inline-start"
            />
            Button
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardHeaderWithBorder() {
  return (
    <Example title="Header with Border">
      <Card sx={styles.cardHeaderWithBorderCard}>
        <CardHeader sx={styles.cardHeaderWithBorderCardHeader}>
          <CardTitle>Header with Border</CardTitle>
          <CardDescription>
            This is a card with a header that has a bottom border.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The header has a border-b class applied, creating a visual
            separation between the header and content sections.
          </p>
        </CardContent>
      </Card>
    </Example>
  )
}

function CardFooterWithBorder() {
  return (
    <Example title="Footer with Border">
      <Card sx={styles.cardFooterWithBorderCard}>
        <CardContent>
          <p>
            The footer has a border-t class applied, creating a visual
            separation between the content and footer sections.
          </p>
        </CardContent>
        <CardFooter sx={styles.cardFooterWithBorderCardFooter}>
          <Button variant="outline" sx={styles.cardFooterWithBorderButton}>
            Footer with Border
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardDefault() {
  return (
    <Example title="Default Size">
      <Card size="default" sx={styles.cardDefaultCard}>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>
            This card uses the default size variant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The card component supports a size prop that defaults to
            &quot;default&quot; for standard spacing and sizing.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" sx={styles.cardDefaultButton}>
            Action
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardSmall() {
  return (
    <Example title="Small Size">
      <Card size="sm" sx={styles.cardSmallCard}>
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>
            This card uses the small size variant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The card component supports a size prop that can be set to
            &quot;sm&quot; for a more compact appearance.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" sx={styles.cardSmallButton}>
            Action
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardHeaderWithBorderSmall() {
  return (
    <Example title="Header with Border (Small)">
      <Card size="sm" sx={styles.cardHeaderWithBorderSmallCard}>
        <CardHeader sx={styles.cardHeaderWithBorderSmallCardHeader}>
          <CardTitle>Header with Border</CardTitle>
          <CardDescription>
            This is a small card with a header that has a bottom border.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The header has a border-b class applied, creating a visual
            separation between the header and content sections.
          </p>
        </CardContent>
      </Card>
    </Example>
  )
}

function CardFooterWithBorderSmall() {
  return (
    <Example title="Footer with Border (Small)">
      <Card size="sm" sx={styles.cardFooterWithBorderSmallCard}>
        <CardContent>
          <p>
            The footer has a border-t class applied, creating a visual
            separation between the content and footer sections.
          </p>
        </CardContent>
        <CardFooter sx={styles.cardFooterWithBorderSmallCardFooter}>
          <Button
            variant="outline"
            size="sm"
            sx={styles.cardFooterWithBorderSmallButton}
          >
            Footer with Border
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}
