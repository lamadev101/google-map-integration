import { CATEGORY_COLORS } from '@/constant';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';

const MarkerSymboleColors = () => {
  const t = useTranslations("categories");
  const locale = useLocale();

  return (
    <>
      <h3 className={clsx(locale === "he" ? "text-right" : "text-left", " font-bold text-xl")}>{t("markerSymbols")}</h3>
      {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
        <div
          key={color}
          className={clsx("flex items-center gap-2 mt-2", locale === "he" ? "flex-row-reverse" : "")}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span>{t(category.toLowerCase())}</span>
        </div>
      ))}
    </>
  )
}

export default MarkerSymboleColors