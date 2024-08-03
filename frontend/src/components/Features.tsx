import bgHero from "../assets/bgHero.png";
import responsiveDesignGif from "../assets/Responsive.gif";
import leaderboardGif from "../assets/Leaderboard.gif";
import personalizationGif from "../assets/Personalization.gif";
import customizableCodeSnippetsGif from "../assets/code_snipppet.gif";

const Features = () => {
  return (
    <div className={`w-full`} style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <section className="text-[#000435] bg-white dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
              🫴 What we offer to developers 📦
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="border border-sky-500 border-opacity-75 p-6 rounded-lg hover:bg-blue-300 dark:hover:bg-blue-950 hover:border-sky-700 backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                <img src={responsiveDesignGif} alt="Responsive Design" className="w-full mb-4 transition-transform duration-300 ease-in-out hover:scale-[1.02]" loading="lazy" />
                <h2 className="text-lg text-[#000435] dark:text-white font-medium title-font mb-2">Responsive Design</h2>
                <p className="leading-relaxed text-base">All components are from best sources and designed to be fully responsive 📝 ensuring they look great on any device📱</p>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="border border-sky-500 border-opacity-75 p-6 rounded-lg hover:bg-blue-300 dark:hover:bg-blue-950 hover:border-sky-700 backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                <img src={leaderboardGif} alt="Leaderboard" className="w-full mb-4 transition-transform duration-300 ease-in-out hover:scale-[1.02]" loading="lazy" />
                <h2 className="text-lg text-[#000435] dark:text-white font-medium title-font mb-2">Leaderboard</h2>
                <p className="leading-relaxed text-base">Compete with other developers and 🪜 climb the leaderboard by sharing your best components and get recognized 🥇</p>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="border border-sky-500 border-opacity-75 p-6 rounded-lg hover:bg-blue-300 dark:hover:bg-blue-950 hover:border-sky-700 backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                <img src={personalizationGif} alt="Personalization" className="w-full mb-4 transition-transform duration-300 ease-in-out hover:scale-[1.02]" loading="lazy" />
                <h2 className="text-lg text-[#000435] dark:text-white font-medium title-font mb-2">Personalization</h2>
                <p className="leading-relaxed text-base">Engage with the community by 👍/👎 components. Save your 💖 components for quick access in your future projects.</p>
              </div>
            </div>
            <div className="xl:w-1/4 md:w-1/2 p-4">
              <div className="border border-sky-500 border-opacity-75 p-6 rounded-lg hover:bg-blue-300 dark:hover:bg-blue-950 hover:border-sky-700 backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                <img src={customizableCodeSnippetsGif} alt="Customizable Code Snippets" className="w-full mb-4 transition-transform duration-300 ease-in-out hover:scale-[1.02]" loading="lazy" />
                <h2 className="text-lg text-[#000435] dark:text-white font-medium title-font mb-2">Customizable Code Snippets</h2>
                <p className="leading-relaxed text-base">Easily customize and preview code 👀 snippets with our built-in editor and A.I tailored specifically for Tailwind CSS 💅</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
