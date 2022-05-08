import { useTranslation } from "next-i18next";

export default function Hero() {
  const { t } = useTranslation("hero");
  return (
    <div className="">
      <h1 className="text-5xl font-bold underline">{t("hero-main")}</h1>
    </div>
  );
}
