import React, { useState } from 'react';
import bgHero from "../assets/bgHero.png";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqQuestions: FAQItem[] = t("faq.questions", { returnObjects: true }) as FAQItem[];

  const handleToggle = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="text-[#000435] bg-white dark:text-white dark:bg-[#000435]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-[#000435] bg-white dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2 className="text-3xl md:text-4xl mb-14 font-extrabold text-center text-[#000435] bg-white dark:text-white dark:bg-[#000435]">{t("faq.title")}</h2>
        <dl className="space-y-5">
          {faqQuestions.map((faq: FAQItem, index: number) => (
            <div key={index} className="space-y-2">
              <div className={`rounded-lg ${activeIndex === index ? 'animated-border' : 'border-2 border-transparent text-[#000435] bg-white dark:text-white dark:bg-[#000435]'}`}>
                <button
                  onClick={() => handleToggle(index)}
                  className={`animated-border-inner w-full focus:outline-none transition duration-100 ease-in-out text-[#000435] bg-white dark:text-white dark:bg-[#000435]`}
                >
                  <span className="text-lg md:text-2xl leading-6 font-medium text-[#000435] bg-white dark:text-white dark:bg-[#000435] hover:text-purple-600 dark:hover:text-purple-600">{faq.question}</span>
                  {activeIndex === index ? <BiChevronUp className="h-5 w-5" /> : <BiChevronDown className="h-5 w-5" />}
                </button>
              </div>
              <div
                className={`transition-all duration-1000 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-full' : 'max-h-0'}`}
                style={{ maxHeight: activeIndex === index ? '200px' : '0px' }} // Adjust maxHeight as needed
              >
                <div className="mt-2 ml-4 text-xl font-mono">{faq.answer}</div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FAQ;
