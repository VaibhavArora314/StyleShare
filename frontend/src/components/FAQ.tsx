import React, { useState } from "react";
import bgHero from "../assets/bgHero.png";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What is Style Share?",
      answer:
        "Style Share is a simple web-based platform where users can contribute, create, explore, and share web design components, focusing on Tailwind CSS.",
    },
    {
      question: "How does it work?",
      answer:
        "Users can search any component with search bar from various developers, contribute to open source for more Tailwind components, create their own component to help other developers, and create posts from the 'New Posts' section.",
    },
    {
      question: "Who can use Style Share?",
      answer:
        "Whether you are a seasoned developer looking for inspiration or a beginner taking your first steps into the world of web design, Style Share offers a wealth of resources tailored to your needs.",
    },
    {
      question: "Is there a cost to use Style Share?",
      answer: "No, Style Share is completely free to use.",
    },
    {
      question: "How do I contribute to Style Share?",
      answer:
        "You can contribute by creating your own components and sharing them on the platform. You can also help improve existing components.",
    },
    {
      question: "Can I use Style Share for commercial projects?",
      answer:
        "Yes, you can use the components shared on Style Share for both personal and commercial projects without any restrictions.",
    },
    {
      question: "How do I get started with Tailwind CSS?",
      answer:
        "To get started with Tailwind CSS, visit the official Tailwind CSS documentation. You can also explore the components on Style Share for inspiration and examples.",
    },
    {
      question: "Can I request specific components on Style Share?",
      answer:
        "Yes, you can request specific components by posting in the 'Requests' section. The community can then create and share the requested components.",
    },
    {
      question: "Are there any guidelines for contributing components?",
      answer:
        "Yes, please follow the contribution guidelines provided on the platform. This ensures that all components meet the quality standards and are consistent with the platform's design principles.",
    },
    {
      question: "How can I give feedback or suggest improvements?",
      answer:
        "You can provide feedback or suggest improvements by using the 'Feedback' section on the platform. We value your input and strive to continuously improve Style Share.",
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="text-center text-[#000435]">
      <div
        className="max-w-[70%] mx-auto p-8 text-[#000435]"
        style={{
          backgroundImage: `url(${bgHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-[37px] mb-14 font-bold text-white transition-shadow duration-300 hover:shadow-[1px_1px_5px_rgb(0,255,208),_0_0_1em_rgb(238,71,224),_0_0_0.2em_rgb(255,0,200)]">
          Frequently Asked Questions!
        </h2>
        <dl className="flex flex-col items-center">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="w-[83%] mb-2 transition-transform duration-300  group"
            >
              <div
                className={`rounded-lg border-2 border-transparent transition-all duration-300 ${"border-[#000435]"}`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="rounded-lg bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] w-full flex justify-between items-center p-4 text-[1.25rem] font-medium text-white border-none cursor-pointer text-left transition-shadow duration-300 hover:shadow-[1px_1px_2px_rgb(255,0,225),_0_0_1em_rgb(0,255,251),_0_0_0.2em_rgb(0,255,242)]"
                >
                  <span>{faq.question}</span>
                  <BiChevronUp className="w-5 h-5 group-hover:rotate-180 transition-all ease-in-out duration-500" />
                </button>
              </div>
              <div
                className={`overflow-hidden transition-max-height duration-1000 group-hover:max-h-[200px] max-h-0`}
              >
                <div className="mt-1 ml-1 rounded-lg text-[17px] text-white p-2 bg-gradient-to-r from-[#8d2de23d] to-[#b700e07f] hover:bg-gradient-to-r hover:from-[#8d2de257] hover:to-[#b700e0b3]">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FAQ;
