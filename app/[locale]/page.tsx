import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation2, Compass, Map } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { clsx } from "clsx";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";

export default function Home() {
  const t = useTranslations("home");
  const locale = useLocale();

  // Enable static rendering
  setRequestLocale(locale);


  const features = [
    {
      icon: Navigation2,
      title: t("features.0.title"),
      description: t("features.0.description")
    },
    {
      icon: Compass,
      title: t("features.1.title"),
      description: t("features.1.description")
    },
    {
      icon: Map,
      title: t("features.2.title"),
      description: t("features.2.description")
    }
  ];

  return (
    <>
      <section className={clsx(locale === "he" ? "flex-row-reverse" : "", "flex items-center justify-center py-16  ")}>
        <div className="py-16 px-4 md:px-8">
          <div className={clsx(locale === "he" ? "text-right" : "text-left")}>
            <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
            <p className="text-muted-foreground max-w-2xl mb-20">{t("description")}</p>
            <Link
              href={"/google-map"}
              className="border border-gray-400 px-4 py-2 rounded-md mt-4"
            >
              {t("getStarted")}
            </Link>
          </div>
        </div>
        <Image
          width={400}
          height={400}
          alt="Map View"
          src={"/google-map.png"}
          unoptimized
        />
      </section>

      <section className="py-16 px-4 md:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("exploreTitle")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("exploreDescription")}
            </p>
          </div>

          <div className={clsx(locale === "he" ? "flex-row-reverse" : "", "flex flex-wrap justify-center gap-8")}>
            {features.map((feature) => (
              <Card key={feature.title} className="w-full md:w-[30%]">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

