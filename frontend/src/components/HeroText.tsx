import { useTranslation } from "react-i18next";
import { TypewriterEffectSmooth } from "./ui/TypeWriter";

export function TypewriterEffectSmoothDemo() {
  const { t } = useTranslation();

  const words = [
    {
      text: t("hero.h1"),
      className: "md:text-3xl lg:text-5xl text-3xl  text-white"
    },
    {
      text: t("hero.h2"),
      className: "text-white lg:text-5xl md:text-3xl text-3xl"
    },
    {
      text: t("hero.h3"),
      className: "text-blue-500 lg:text-5xl md:text-3xl text-3xl"
    },
    {
      text: t("hero.h4"),
      className: "text-blue-500 lg:text-5xl md:text-3xl text-3xl"
    }
  ];

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="mx-autofont-bold mb-4">
        <TypewriterEffectSmooth words={words} />
      </div>
    </div>
  );
}
