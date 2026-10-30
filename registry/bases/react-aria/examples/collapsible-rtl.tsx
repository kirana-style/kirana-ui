import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Button } from "../ui/button"
import { Collapsible, CollapsibleContent } from "../ui/collapsible"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  collapsible: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: "350px" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[2] },
  }),
  div: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space[4],
    paddingInline: space[4],
  }),
  h4: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
  }),
  button: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
  span: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radius.md,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  span2: css({
    color: theme.mutedForeground,
  }),
  span3: css({
    fontWeight: fontWeight.medium,
  }),
  div3: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
  }),
  div4: css({
    borderRadius: radius.md,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  p: css({
    fontWeight: fontWeight.medium,
  }),
  p2: css({
    color: theme.mutedForeground,
  }),
  div5: css({
    borderRadius: radius.md,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  p3: css({
    fontWeight: fontWeight.medium,
  }),
  p4: css({
    color: theme.mutedForeground,
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      orderNumber: "Order #4189",
      status: "Status",
      shipped: "Shipped",
      shippingAddress: "Shipping address",
      address: "100 Market St, San Francisco",
      items: "Items",
      itemsDescription: "2x Studio Headphones",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      orderNumber: "الطلب #4189",
      status: "الحالة",
      shipped: "تم الشحن",
      shippingAddress: "عنوان الشحن",
      address: "100 Market St, San Francisco",
      items: "العناصر",
      itemsDescription: "2x سماعات الاستوديو",
    },
  },
  he: {
    dir: "rtl",
    values: {
      orderNumber: "הזמנה #4189",
      status: "סטטוס",
      shipped: "נשלח",
      shippingAddress: "כתובת משלוח",
      address: "100 Market St, San Francisco",
      items: "פריטים",
      itemsDescription: "2x אוזניות סטודיו",
    },
  },
}

export default function CollapsibleRtl() {
  const { dir, t } = useTranslation(translations, "ar")
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div sx={page.example}>
      <Collapsible
        isExpanded={isOpen}
        onExpandedChange={setIsOpen}
        sx={styles.collapsible}
        dir={dir}
      >
        <div sx={styles.div}>
          <h4 sx={styles.h4}>{t.orderNumber}</h4>
          <Button slot="trigger" variant="ghost" size="icon" sx={styles.button}>
            <IconPlaceholder
              lucide="ChevronsUpDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              phosphor="CaretUpDownIcon"
              remixicon="RiArrowUpDownLine"
            />
            <span sx={styles.span}>Toggle details</span>
          </Button>
        </div>
        <div sx={styles.div2}>
          <span sx={styles.span2}>{t.status}</span>
          <span sx={styles.span3}>{t.shipped}</span>
        </div>
        <CollapsibleContent>
          <div sx={styles.div3}>
            <div sx={styles.div4}>
              <p sx={styles.p}>{t.shippingAddress}</p>
              <p sx={styles.p2}>{t.address}</p>
            </div>
            <div sx={styles.div5}>
              <p sx={styles.p3}>{t.items}</p>
              <p sx={styles.p4}>{t.itemsDescription}</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
