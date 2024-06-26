import React from 'react';
import editor from "../assets/editor.png"; 

const Showcase: React.FC = () => {
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
    <section className="text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-2xl l lg:text-4xl xl:text-4xl 2xl:text-4xl  mb-6 lg:mb-14  font-extrabold text-center text-[#b752fa]  dark:text-white ">🚀  Our Code Editor 🚀</p>
        <div className="flex flex-col md:flex-row md:space-x-6 items-center">
          <div className="md:w-1/2 space-y-5">
            {features.map((feature, index) => (
              <div key={index} className="p-4 sm:p-4 md:p-6 lg:p-8 rounded-lg shadow-md border-2 border-grey-500 transition-transform duration-300 hover:-translate-y-2">
                <h3 className="text-md  md:text-xl lg:text-2xl font-bold mb-2 text-[#b752fa]  dark:text-white">{feature.title}</h3>
                <p className="text-md   lg:text-lg font-mono">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
            <img src={editor} alt="Code Editor" className="max-w-full mx-20 h-auto rounded-lg shadow-md" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
