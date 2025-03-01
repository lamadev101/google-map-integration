import React from "react";
import { Popover, PopoverContent } from "./ui/popover";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useLocale, useTranslations } from "next-intl";
import { clsx } from "clsx";
import CategorySelector from "./CategorySelector";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category: string;
  setCategory: (category: string) => void;
  title: string;
  setTitle: (title: string) => void;
  desc: string;
  setDesc: (desc: string) => void;
  onSubmit: () => void;
  position: { x: number; y: number } | null;
}

const AddMarkerDetailsModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  category,
  setCategory,
  title,
  setTitle,
  desc,
  setDesc,
  onSubmit,
  position
}) => {
  const t = useTranslations("addMarkerModal");
  const locale = useLocale();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverContent
        className="absolute bg-white"
        style={{
          top: position?.y,
          left: position?.x,
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      >
        <h3 className={clsx(locale === "he" ? "text-right" : "text-left", "text-lg font-semibold mb-4")}>{t("header")}</h3>
        <Input
          type="text"
          placeholder={t("titlePlaceholder")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          dir={locale === "he" ? "rtl" : "ltr"}
          className="mb-3 focus:ring-0 focus:outline-none focus:border-0"
        />

       <CategorySelector value={category} setValue={setCategory} hideAllOption />

        <Textarea
          placeholder={t("descPlaceholder")}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          dir={locale === "he" ? "rtl" : "ltr"}
          className="mb-3 focus:ring-0 focus:outline-none focus:border-0"
        />

        <div className={clsx(locale === "he" ? "flex-row-reverse" : "", "flex justify-center gap-2")}>
          <Button
            onClick={onSubmit}
            className="mt-3 bg-amber-600 cursor-pointer text-white"
          >
            {t("addMarkerButton")}
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setIsOpen(false)}
            className="mt-3 border-red-500 cursor-pointer text-red-500"
          >
            {t("closeButton")}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddMarkerDetailsModal;
