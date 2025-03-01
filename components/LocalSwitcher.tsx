import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import LocalSwitchSelect from './LocalSwitchSelect'
import { locales } from '@/next-intl.config'

const LocalSwitcher = () => {
  const t = useTranslations("localSwitcher")
  const locale = useLocale()


  return (
    <LocalSwitchSelect
      label={t("label")}
      defaultValue={locale}
    >
      {locales.map((cur) => (
        <option key={cur} value={cur}>
          {t("locale", { locale: cur })}
        </option>
      ))}
    </LocalSwitchSelect>
  )
}

export default LocalSwitcher