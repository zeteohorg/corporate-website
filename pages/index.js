import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Homepage = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div>
      <main>
        <Hero />
        <div className="flex-auto m-5 ">
          <Link href="/" locale={router.locale === "en-US" ? "ja-JP" : "en-US"}>
            <button className="rounded-md bg-cyan-500 shadow-lg shadow-cyan-500/50">
              <p className="mx-px">{t("change-locale")}</p>
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "hero"])),
  },
});

export default Homepage;
