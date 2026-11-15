import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css, select } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  h1: css({
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["4xl"],
    fontWeight: fontWeight.extrabold,
    letterSpacing: letterSpacing.tight,
    textWrap: "balance",
  }),
  p: css({
    fontSize: fontSize.xl,
    lineHeight: "1.75rem",
    color: theme.mutedForeground,
    marginTop: { ":not(:first-child)": space[6] },
  }),
  h2: css({
    marginTop: { base: space[10], ":first-child": space["0"] },
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    borderBottomWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    paddingBottom: space[2],
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
    transitionDuration: "0.15s",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }),
  p2: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  a: css({
    fontWeight: fontWeight.medium,
    color: theme.primary,
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
  }),
  blockquote: css({
    marginTop: space[6],
    borderInlineStartWidth: "2px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderInlineStartColor: theme.border,
    paddingInlineStart: space[6],
    fontStyle: "italic",
  }),
  h3: css({
    marginTop: space[8],
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  }),
  p3: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  ul: css({
    marginBlock: space[6],
    marginInlineStart: space[6],
    listStyleType: "disc",
    [select.child("li")]: {
      marginTop: space[2],
    },
  }),
  p4: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  h32: css({
    marginTop: space[8],
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  }),
  p5: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  p6: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  h33: css({
    marginTop: space[8],
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  }),
  p7: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  div: css({
    marginBlock: space[6],
    width: "100%",
    overflowY: "auto",
  }),
  table: css({
    width: "100%",
  }),
  tr: css({
    margin: space["0"],
    borderTopWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    padding: space["0"],
    backgroundColor: { ":nth-child(even)": theme.muted },
  }),
  th: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: "start",
    fontWeight: fontWeight.bold,
  }),
  th2: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: "start",
    fontWeight: fontWeight.bold,
  }),
  tr2: css({
    margin: space["0"],
    borderTopWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    padding: space["0"],
    backgroundColor: { ":nth-child(even)": theme.muted },
  }),
  td: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: "start",
  }),
  td2: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: "start",
  }),
  tr3: css({
    margin: space["0"],
    borderTopWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    padding: space["0"],
    backgroundColor: { ":nth-child(even)": theme.muted },
  }),
  td3: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: "start",
  }),
  td4: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: "start",
  }),
  tr4: css({
    margin: space["0"],
    borderTopWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    padding: space["0"],
    backgroundColor: { ":nth-child(even)": theme.muted },
  }),
  td5: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: "start",
  }),
  td6: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: "start",
  }),
  p8: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  p9: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      title: "Taxing Laughter: The Joke Tax Chronicles",
      leadParagraph:
        "Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.",
      kingsPlan: "The King's Plan",
      kingThought: "The king thought long and hard, and finally came up with",
      brilliantPlan: "a brilliant plan",
      taxJokes: ": he would tax the jokes in the kingdom.",
      blockquote:
        '"After all," he said, "everyone enjoys a good joke, so it\'s only fair that they should pay for the privilege."',
      jokeTax: "The Joke Tax",
      subjectsNotAmused:
        "The king's subjects were not amused. They grumbled and complained, but the king was firm:",
      level1: "1st level of puns: 5 gold coins",
      level2: "2nd level of jokes: 10 gold coins",
      level3: "3rd level of one-liners: 20 gold coins",
      stoppedTelling:
        "As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused to let the king's foolishness get him down: a court jester named Jokester.",
      jokestersRevolt: "Jokester's Revolt",
      sneaking:
        "Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.",
      discovered:
        "And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.",
      peoplesRebellion: "The People's Rebellion",
      uplifted:
        "The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the entire kingdom was in on the joke.",
      kingsTreasury: "King's Treasury",
      peoplesHappiness: "People's happiness",
      empty: "Empty",
      overflowing: "Overflowing",
      modest: "Modest",
      satisfied: "Satisfied",
      full: "Full",
      ecstatic: "Ecstatic",
      realized:
        "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after.",
      moral:
        "The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas.",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      title: "فرض الضرائب على الضحك: سجلات ضريبة النكتة",
      leadParagraph:
        "في قديم الزمان، في أرض بعيدة، كان هناك ملك كسول جداً يقضي يومه كله مستلقياً على عرشه. في أحد الأيام، جاءه مستشاروه بمشكلة: المملكة كانت تنفد من المال.",
      kingsPlan: "خطة الملك",
      kingThought: "فكر الملك طويلاً وبجد، وأخيراً توصل إلى",
      brilliantPlan: "خطة عبقرية",
      taxJokes: ": سيفرض ضريبة على النكات في المملكة.",
      blockquote:
        '"في النهاية،" قال، "الجميع يستمتع بنكتة جيدة، لذا من العدل أن يدفعوا مقابل هذا الامتياز."',
      jokeTax: "ضريبة النكتة",
      subjectsNotAmused:
        "لم يكن رعايا الملك سعداء. تذمروا واشتكوا، لكن الملك كان حازماً:",
      level1: "المستوى الأول من التورية: 5 قطع ذهبية",
      level2: "المستوى الثاني من النكات: 10 قطع ذهبية",
      level3: "المستوى الثالث من النكات القصيرة: 20 قطعة ذهبية",
      stoppedTelling:
        "نتيجة لذلك، توقف الناس عن رواية النكات، وغرقت المملكة في الكآبة. لكن كان هناك شخص واحد رفض أن تحبطه حماقة الملك: مهرج البلاط المسمى المازح.",
      jokestersRevolt: "ثورة المازح",
      sneaking:
        "بدأ المازح يتسلل إلى القلعة في منتصف الليل ويترك النكات في كل مكان: تحت وسادة الملك، في حسائه، حتى في المرحاض الملكي. كان الملك غاضباً، لكنه لم يستطع إيقاف المازح.",
      discovered:
        "وبعد ذلك، في يوم من الأيام، اكتشف سكان المملكة أن النكات التي تركها المازح كانت مضحكة جداً لدرجة أنهم لم يستطيعوا منع أنفسهم من الضحك. وبمجرد أن بدأوا بالضحك، لم يستطيعوا التوقف.",
      peoplesRebellion: "ثورة الشعب",
      uplifted:
        "شعر سكان المملكة بالبهجة من الضحك، وبدأوا في رواية النكات والتورية مرة أخرى، وسرعان ما أصبحت المملكة بأكملها جزءاً من النكتة.",
      kingsTreasury: "خزينة الملك",
      peoplesHappiness: "سعادة الشعب",
      empty: "فارغة",
      overflowing: "فائضة",
      modest: "متواضعة",
      satisfied: "راضٍ",
      full: "ممتلئة",
      ecstatic: "منتشٍ",
      realized:
        "الملك، عندما رأى مدى سعادة رعاياه، أدرك خطأ طرقه وألغى ضريبة النكتة. أُعلن المازح بطلاً، وعاشت المملكة في سعادة دائمة.",
      moral:
        "مغزى القصة هو: لا تستهن أبداً بقوة الضحك الجيد وكن دائماً حذراً من الأفكار السيئة.",
    },
  },
  he: {
    dir: "rtl",
    values: {
      title: "מיסוי הצחוק: כרוניקות מס הבדיחה",
      leadParagraph:
        "היה היה פעם, בארץ רחוקה, מלך עצלן מאוד שבילה את כל היום בהתרווחות על כס מלכותו. יום אחד, יועציו באו אליו עם בעיה: הממלכה נגמר לה הכסף.",
      kingsPlan: "התוכנית של המלך",
      kingThought: "המלך חשב ארוכות וקשות, ולבסוף העלה",
      brilliantPlan: "תוכנית גאונית",
      taxJokes: ": הוא ימסה את הבדיחות בממלכה.",
      blockquote:
        '"אחרי הכל," אמר, "כולם נהנים מבדיחה טובה, אז זה רק הוגן שישלמו על הזכות הזו."',
      jokeTax: "מס הבדיחה",
      subjectsNotAmused:
        "נתיני המלך לא היו מרוצים. הם התלוננו והתרעמו, אבל המלך היה נחוש:",
      level1: "רמה ראשונה של משחקי מילים: 5 מטבעות זהב",
      level2: "רמה שנייה של בדיחות: 10 מטבעות זהב",
      level3: "רמה שלישית של חידודים: 20 מטבעות זהב",
      stoppedTelling:
        "כתוצאה מכך, אנשים הפסיקו לספר בדיחות, והממלכה שקעה בעצב. אבל היה אדם אחד שסירב לתת לטיפשות המלך להפיל אותו: ליצן חצר בשם הבדחן.",
      jokestersRevolt: "המרד של הבדחן",
      sneaking:
        "הבדחן התחיל להתגנב לטירה באמצע הלילה ולהשאיר בדיחות בכל מקום: מתחת לכרית המלך, במרק שלו, אפילו בשירותים המלכותיים. המלך היה זועם, אבל הוא לא הצליח לעצור את הבדחן.",
      discovered:
        "ואז, יום אחד, תושבי הממלכה גילו שהבדיחות שהבדחן השאיר היו כל כך מצחיקות שהם לא יכלו להתאפק מלצחוק. וברגע שהתחילו לצחוק, הם לא יכלו להפסיק.",
      peoplesRebellion: "המרד של העם",
      uplifted:
        "תושבי הממלכה, שהרגישו מרוממים מהצחוק, התחילו לספר בדיחות ומשחקי מילים שוב, ובקרוב כל הממלכה הייתה חלק מהבדיחה.",
      kingsTreasury: "אוצר המלך",
      peoplesHappiness: "אושר העם",
      empty: "ריק",
      overflowing: "גדוש",
      modest: "צנוע",
      satisfied: "מרוצה",
      full: "מלא",
      ecstatic: "אקסטטי",
      realized:
        "המלך, כשראה כמה מאושרים נתיניו, הבין את טעותו וביטל את מס הבדיחה. הבדחן הוכרז כגיבור, והממלכה חיה באושר לנצח.",
      moral:
        "המוסר של הסיפור הוא: לעולם אל תזלזל בכוח של צחוק טוב ותמיד היזהר מרעיונות רעים.",
    },
  },
}

export default function TypographyRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <div dir={dir}>
        <h1 sx={styles.h1}>{t.title}</h1>
        <p sx={styles.p}>{t.leadParagraph}</p>
        <h2 sx={styles.h2}>{t.kingsPlan}</h2>
        <p sx={styles.p2}>
          {t.kingThought}{" "}
          <a href="#" sx={styles.a}>
            {t.brilliantPlan}
          </a>
          {t.taxJokes}
        </p>
        <blockquote sx={styles.blockquote}>{t.blockquote}</blockquote>
        <h3 sx={styles.h3}>{t.jokeTax}</h3>
        <p sx={styles.p3}>{t.subjectsNotAmused}</p>
        <ul sx={styles.ul}>
          <li>{t.level1}</li>
          <li>{t.level2}</li>
          <li>{t.level3}</li>
        </ul>
        <p sx={styles.p4}>{t.stoppedTelling}</p>
        <h3 sx={styles.h32}>{t.jokestersRevolt}</h3>
        <p sx={styles.p5}>{t.sneaking}</p>
        <p sx={styles.p6}>{t.discovered}</p>
        <h3 sx={styles.h33}>{t.peoplesRebellion}</h3>
        <p sx={styles.p7}>{t.uplifted}</p>
        <div sx={styles.div}>
          <table sx={styles.table}>
            <thead>
              <tr sx={styles.tr}>
                <th sx={styles.th}>{t.kingsTreasury}</th>
                <th sx={styles.th2}>{t.peoplesHappiness}</th>
              </tr>
            </thead>
            <tbody>
              <tr sx={styles.tr2}>
                <td sx={styles.td}>{t.empty}</td>
                <td sx={styles.td2}>{t.overflowing}</td>
              </tr>
              <tr sx={styles.tr3}>
                <td sx={styles.td3}>{t.modest}</td>
                <td sx={styles.td4}>{t.satisfied}</td>
              </tr>
              <tr sx={styles.tr4}>
                <td sx={styles.td5}>{t.full}</td>
                <td sx={styles.td6}>{t.ecstatic}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p sx={styles.p8}>{t.realized}</p>
        <p sx={styles.p9}>{t.moral}</p>
      </div>
    </div>
  )
}
