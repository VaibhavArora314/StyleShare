import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import bgHero from "../assets/bgHero.png";
import Tilt from "react-parallax-tilt";
import Lottie from "lottie-react";
import animationData from "../assets/lottieabout.json";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/about.css";

function About() {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [showButton, setShowButton] = useState(false);
  const listItems = [
    "✅ Search any component with search bar from various developers.",
    "✅ Contribute to open source for more Tailwind components.",
    "✅ Create your own component to help other developers.",
    "✅ Create posts from the New Posts section.",
    "✅ And that's it you are ready to go.",
    "✅ Other features coming soon.",
  ];
  const [isVisible, setIsVisible] = useState(false);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.1 }
    );

    if (howItWorksRef.current) {
      observer.observe(howItWorksRef.current);
    }

    return () => {
      if (howItWorksRef.current) {
        observer.unobserve(howItWorksRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
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
    }
  }, [isVisible, listItems]);

  return (
    <div
      className="w-full text-[#000435] bg-white dark:text-white dark:bg-[#000435] py-16 px-4"
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <Tilt>
          <Lottie
            animationData={animationData}
            className="w-full max-w-[550px] mx-auto"
          />
        </Tilt>
        <div className="flex flex-col justify-center">
          <p className="bg-gradient-to-r sm:mt-30 from-blue-600 via-blue-500 to-white inline-block text-transparent bg-clip-text text-4xl md:text-5xl lg:text-6xl font-bold py-1 focus-in-expand">
            👨‍💻 About Style Share
          </p>
          <h1 className="md:text-2xl text-xl lg:text-3xl font-bold py-4 dark:text-white text-gray-400 mt-10 mb-5 fade-in">
            Unleashing Creativity - Tailwind CSS
          </h1>
          <p className="text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] text-justify font-semibold">
            💁‍♂ Our mission is to make the design process more accessible and efficient for everyone.
            Whether you are a seasoned developer looking for inspiration or a beginner taking your first steps into the world of web design, our platform offers a wealth of resources tailored to your needs.
          </p>
        </div>
      </div>
      <div className="flex mt-20 flex-col items-center">
        <p className="md:text-4xl lg:text-5xl mb-20 sm:text-3xl text-2xl font-bold text-[#000435] bg-white mt-54 py-auto dark:text-white dark:bg-[#000435] vibrate-1">
          🤔 How it Works !
        </p>
        <div ref={howItWorksRef} className="text-lg text-[#000435] bg-white dark:text-white dark:bg-[#000435] grid grid-cols-1" style={{ minHeight: '240px' }}>
          <AnimatePresence>
            {visibleItems.map((item, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className="mb-2"
              >
                {item}
                <br />
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        <div className="h-28 mt-10">
          {showButton && (
            <Link
              to="/app/posts"
              className="bg-gradient-to-r mt-10 from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white py-3 px-6 rounded-md shadow-md transition-transform transform hover:-translate-y-1 mb-10 hover:shadow-lg w-[170px] text-center font-medium"
            >
              Explore Now
            </Link>
          )}
        </div>
        </div>
      </div>
  );
}

export default About;
