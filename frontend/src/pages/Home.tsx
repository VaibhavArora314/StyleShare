import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import bgHero from "../assets/bgHero.png";
import '../styles/hero.css'
import About from "./About";
import HomePagePost from "./HomePagePosts";
import { TypewriterEffectSmoothDemo } from "../components/HeroText";
import MagicButton from "../components/ui/MagicButton";
import { useTranslation } from 'react-i18next';
import TestimonialSlider from "../components/TestimonialSlider";
import FAQ from "../components/FAQ";
import Showcase from "../components/Showcase";
import Features from "../components/Features";
import Category from "./Category";

function Home() {
  console.log("Home page rerendered");
  const { t } = useTranslation();

  document.title='Style Share | Welcome 🙏'
  
  return (      
  <div className="-mt-7 min-h-screen  text-[#000435] dark:text-white dark:bg-[#000435]"  style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
        <div className="w-full  text-[#000435] bg-white dark:text-white dark:bg-[#000435] py-16 px-4"  style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1>
                <TypewriterEffectSmoothDemo />
              </h1>
              <h1 className='md:text-3xl sm:text-3xl font-medium py-2'>{t("hero.subheading")}</h1>
              <p className="text-lg  text-[#000435] bg-white dark:text-white dark:bg-[#000435] font-semibold">
                <span> ✅ {t("hero.list.first")}</span><br />
                <span> ✅ {t("hero.list.second")}</span><br />
                <span> ✅ {t("hero.list.third")}</span><br />
                <span> ✅ {t("hero.list.fourth")}</span><br />
              </p>
              <Link
                to="/app/posts"
                className=' text-[#000435] bg-white dark:text-white dark:bg-[#000435] mt-9'>
                <MagicButton title={t("hero.button")} />
              </Link>
            </div>
            <img className="w-[600px] imgAnimate" src={hero} alt="About Us" />
          </div>
        </div>
        <Features/>
        <About />
        <Showcase/>
        <Category/>
        <HomePagePost />
        <TestimonialSlider/>
        <FAQ/>
      </div>
  );
}

export default Home;
