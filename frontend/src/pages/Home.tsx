import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import bgHero from "../assets/bgHero.png";
import '../styles/hero.css';
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
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  console.log("Home page rerendered");
  const { t } = useTranslation();

  document.title = 'Style Share | Welcome 🙏';

  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [showButton, setShowButton] = useState(false);
  const listItems = [
    t("hero.list.first"),
    t("hero.list.second"),
    t("hero.list.third"),
    t("hero.list.fourth"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleItems((prevItems) => {
        if (prevItems.length < listItems.length) {
          return [...prevItems, listItems[prevItems.length]];
        }
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 1000); 
        return prevItems;
      });
    }, 673);
    return () => clearInterval(interval);
  }, [listItems]);

  return (      
    <div className="-mt-7 min-h-screen text-[#000435] dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <style>
        {`
          .tick-container {
            position: relative;
            overflow: hidden;
            height: 120px; 
          }
          .tick-item {
            position: relative;
            height: 24px; 
            margin-bottom: 8px; 
          }
        `}
      </style>
      <div className="w-full text-[#000435] bg-white dark:text-white dark:bg-[#000435] py-16 px-4" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1>
              <TypewriterEffectSmoothDemo />
            </h1>
            <h1 className='md:text-3xl sm:text-3xl font-medium py-2'>{t("hero.subheading")}</h1>
            <div className="tick-container text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] font-semibold">
              <AnimatePresence>
                {visibleItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="tick-item"
                  >
                    ✅ {item}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {showButton && (
              <Link to="/app/posts" className='text-[#000435] bg-white dark:text-white dark:bg-[#000435] mt-9'>
                <motion.div
                  animate={{ opacity: 1, rotate: [1, 2, -2, 0] }}
                  transition={{ duration: 0.5, repeat: 3, repeatType: "loop" }}
                >
                  <MagicButton title={t("hero.button")} />
                </motion.div>
              </Link>
            )}
          </div>
          <img className="w-[600px] imgAnimate" src={hero} alt="About Us" />
        </div>
      </div>
      <Features />
      <About />
      <Showcase />
      <Category />
      <HomePagePost />
      <TestimonialSlider />
      <FAQ />
    </div>
  );
}

export default Home;
