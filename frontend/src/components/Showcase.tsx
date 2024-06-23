import React from 'react';
// import bgHero from "../assets/bgHero.png";
import editor from "../assets/editor.png"; // Import the image

const Showcase: React.FC = () => {
  // Array of features
  const features = [
    {
      title: "Live Preview",
      description: "Instantly see the results of your code changes with our live preview feature. Perfect for rapid prototyping and debugging."
    },
    {
      title: "Syntax Highlighting",
      description: "Enjoy a rich editing experience with syntax highlighting for HTML, CSS, and JavaScript. Easily identify code elements and errors."
    },
    {
      title: "Auto-Completion",
      description: "Speed up your coding with intelligent auto-completion suggestions for tags, attributes, and more."
    }
  ];

  return (
    <section className=" text-[#000435] bg-white dark:text-white dark:bg-[#000435]" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
        <h2 className="text-3xl md:text-4xl mb-14 font-extrabold text-center  text-[#000435] bg-white dark:text-white dark:bg-[#000435]">🚀  Our Code Editor 🚀</h2>
        <div className="flex flex-col md:flex-row md:space-x-6 items-center">
          <div className="md:w-1/2 space-y-5">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg shadow-md border-2 animated-border1">
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-lg font-mono">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 md:mt-0  md:w-1/2 flex justify-center">
            <img src={editor} alt="Code Editor" className="max-w-full  mx-20 h-auto rounded-lg shadow-md" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;