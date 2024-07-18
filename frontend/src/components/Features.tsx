import { RiTailwindCssFill } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";
import { BiSolidCustomize } from "react-icons/bi";
import { FaLaptopFile } from "react-icons/fa6";

import { useTranslation } from "react-i18next";
import bgHero from "../assets/bgHero.png";
import responsiveGif from "../assets/Responsive.gif";
import leaderboardGif from "../assets/Leaderboard.gif";
import personalizationGif from "../assets/Personalization.gif";
import customizableGif from "../assets/code_snipppet.gif";


const Features = () => {
  return (
    <div className={`w-full`} style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <section className="text-[#000435] bg-white dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">

            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-[#000435] dark:text-white">
              {t("offer.title")}
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <FeatureCard
              icon={<RiTailwindCssFill size={23} />}
              gif={responsiveGif}
              title={t("offer.responsiveDesign.title")}
              description={t("offer.responsiveDesign.description")}
            />
            <FeatureCard
              icon={<MdLeaderboard size={23} />}
              gif={leaderboardGif}
              title={t("offer.leaderboard.title")}
              description={t("offer.leaderboard.description")}
            />
            <FeatureCard
              icon={<FaLaptopFile size={23} />}
              gif={personalizationGif}
              title={t("offer.personalization.title")}
              description={t("offer.personalization.description")}
            />
            <FeatureCard
              icon={<BiSolidCustomize size={23} />}
              gif={customizableGif}
              title={t("offer.customizableCodeSnippets.title")}
              description={t("offer.customizableCodeSnippets.description")}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  gif: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, gif, title, description }) => {
  return (
    <div className="xl:w-1/4 md:w-1/2 p-4">
      <div className="border border-sky-500 border-opacity-75 p-6 rounded-lg hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={gif} alt={title} className="w-full h-auto object-cover rounded-lg" />

            </div>
            <div className="flip-card-back bg-white dark:bg-[#000435] p-6 rounded-lg">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-sky-500 text-white mb-4">

                {icon}

              </div>
              <h2 className="text-lg text-[#000435] dark:text-white font-medium title-font mb-2">{title}</h2>
              <p className="leading-relaxed text-base">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
