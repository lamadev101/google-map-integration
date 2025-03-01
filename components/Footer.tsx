import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const locale = useLocale();

  const footerLinks = {
    [t("sections.product")]: [
      { label: t("links.features"), href: "#" },
      { label: t("links.pricing"), href: "#" },
      { label: t("links.api"), href: "#" },
      { label: t("links.integration"), href: "#" },
    ],
    [t("sections.company")]: [
      { label: t("links.about"), href: "#" },
      { label: t("links.blog"), href: "#" },
      { label: t("links.careers"), href: "#" },
      { label: t("links.press"), href: "#" },
    ],
    [t("sections.resources")]: [
      { label: t("links.documentation"), href: "#" },
      { label: t("links.support"), href: "#" },
      { label: t("links.terms"), href: "#" },
      { label: t("links.privacy"), href: "#" },
    ],
  };

  return (
    <footer className="bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        <div className={`flex flex-wrap ${locale === "he" ? "flex-row-reverse text-right" : ""}`}>
          <div className="w-full md:w-[25%]">
            <Link href="/">
              <span className="text-xl font-bold">{t("brand")}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{t("description")}</p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="w-full md:w-[25%]">
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
