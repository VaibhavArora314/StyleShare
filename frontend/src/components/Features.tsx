import { RiTailwindCssFill } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";
import bgHero from "../assets/bgHero.png";
import { BiSolidCustomize } from "react-icons/bi";
import { FaLaptopFile } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();
  return (
    <div  className={`w-full`}style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <section className="text-[#000435] bg-white dark:text-white dark:bg-[#000435]"style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}  >
        <div className="container px-5 py-24 mx-auto"  >
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2  text-[#000435] dark:text-white ">
            {t("offer.title")}
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
          <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="border border-sky-500 border-opacity-75 p-6 rounded-lg hover:bg-blue-300 dark:hover:bg-blue-950 hover:border-sky-700 backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-sky-500 text-white mb-4">
                <RiTailwindCssFill size={23}/>
                </div>
                <h2 className="text-lg text-[#000435] dark:text-white  font-medium title-font mb-2">{t("offer.responsiveDesign.title")}</h2>
                <p className="leading-relaxed text-base">{t("offer.responsiveDesign.description")}</p>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="border border-sky-500 border-opacity-75 p-6 rounded-lg hover:bg-blue-300 dark:hover:bg-blue-950 hover:border-sky-700 backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-sky-500 text-white mb-4">
                <MdLeaderboard size={23}/>
                </div>
                <h2 className="text-lg text-[#000435] dark:text-white font-medium title-font mb-2">{t("offer.leaderboard.title")}</h2>
                <p className="leading-relaxed text-base">{t("offer.leaderboard.description")}</p>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="border border-sky-500 border-opacity-75 p-6 rounded-lg hover:bg-blue-300 dark:hover:bg-blue-950 hover:border-sky-700 backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-sky-500 text-white mb-4">
                <FaLaptopFile size={23}/>
                </div>
                <h2 className="text-lg text-[#000435] dark:text-white font-medium title-font mb-2">{t("offer.personalization.title")}</h2>
                <p className="leading-relaxed text-base">{t("offer.personalization.description")}</p>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="border border-sky-500 border-opacity-75 p-6 rounded-lg hover:bg-blue-300 dark:hover:bg-blue-950 hover:border-sky-700 backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-sky-500 text-white mb-4">
                <BiSolidCustomize size={23}/>
                </div>
                <h2 className="text-lg text-[#000435] dark:text-white font-medium title-font mb-2">{t("offer.customizableCodeSnippets.title")}</h2>
                <p className="leading-relaxed text-base">{t("offer.customizableCodeSnippets.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;