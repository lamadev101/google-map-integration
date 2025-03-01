import { useLocale, useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
  value: string;
  setValue: (value: string) => void;
  hideAllOption?: boolean;
}

const CategorySelector = ({ value, setValue, hideAllOption = false }: Props) => {
  const t = useTranslations("categories");
  const locale = useLocale();

  return (
    <Select
      value={value}
      onValueChange={setValue}
      dir={locale === "he" ? "rtl" : "ltr"}
    >
      <SelectTrigger className="mb-3 focus:ring-0 focus:outline-none">
        <SelectValue placeholder={t("categoryPlaceholder")} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {!hideAllOption && <SelectItem value="All">{t("all")}</SelectItem>}
        <SelectItem value="Cafe">{t("cafe")}</SelectItem>
        <SelectItem value="Restaurant">{t("restaurant")}</SelectItem>
        <SelectItem value="Park">{t("park")}</SelectItem>
        <SelectItem value="Shopping">{t("shopping")}</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default CategorySelector