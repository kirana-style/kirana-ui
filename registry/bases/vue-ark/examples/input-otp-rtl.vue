<script setup lang="ts">
import { DirectionProvider } from "../ui/direction"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Field, FieldLabel } from "../ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  inputOTPRtlField: css({
    marginInline: { "*": null, base: "auto" },
    maxWidth: { "*": null, base: containerSize.xs },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      verificationCode: "Verification code",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      verificationCode: "رمز التحقق",
    },
  },
  he: {
    dir: "rtl",
    values: {
      verificationCode: "קוד אימות",
    },
  },
}

const { dir, t, locale } = useTranslation(translations, "ar")
</script>

<template>
  <DirectionProvider :locale="locale">
    <div :sx="page.example">
      <Field :sx="styles.inputOTPRtlField">
        <FieldLabel for="input-otp-rtl">{{ t.verificationCode }}</FieldLabel>
        <InputOTP
          :max-length="6"
          default-value="123456"
          :dir="dir"
          id="input-otp-rtl"
        >
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
            <InputOTPSlot :index="4" />
            <InputOTPSlot :index="5" />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </div>
  </DirectionProvider>
</template>
