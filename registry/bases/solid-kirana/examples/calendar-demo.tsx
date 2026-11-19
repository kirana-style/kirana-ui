import { createSignal } from "solid-js"
import { css } from "@kirana-style/core"
import { Calendar } from "../ui/calendar"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

export default function CalendarDemo() {
  const styles = {
    bordered: css({
      borderRadius: radius.lg,
      borderWidth: "1px",
      borderColor: theme.border,
    }),
  }

  const [date, setDate] = createSignal<Date | undefined>(new Date())

  return (
    <div sx={page.example}>
      <Calendar
        mode="single"
        selected={date()}
        onSelectedChange={(details: { selected: ReturnType<typeof date> }) =>
          setDate(details.selected)
        }
        sx={styles.bordered}
        captionLayout="dropdown"
      />
    </div>
  )
}
