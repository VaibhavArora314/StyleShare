// import React, { useState } from 'react';
// import bgHero from "../assets/bgHero.png";
// import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

// interface FAQItem {
//   question: string;
//   answer: string;
// }

// const faqs: FAQItem[] = [
//   {
//     question: "What is Style Share ?",
//     answer: "Style Share is a simple web-based platform where users can contribute, create, explore, and share web design components, focusing on Tailwind CSS.",
//   },
//   {
//     question: "How does it work ?",
//     answer: "Users can search any component with search bar from various developers, contribute to open source for more Tailwind components, create their own component to help other developers, and create posts from the 'New Posts' section.",
//   },
//   {
//     question: "Who can use Style Share ?",
//     answer: "Whether you are a seasoned developer looking for inspiration or a beginner taking your first steps into the world of web design, Style Share offers a wealth of resources tailored to your needs.",
//   },
//   {
//     question: "Is there a cost to use Style Share ?",
//     answer: "No, Style Share is completely free to use.",
//   },
//   {
//     question: "How do I contribute to Style Share ?",
//     answer: "You can contribute by creating your own components and sharing them on the platform. You can also help improve existing components.",
//   },
// ];

// const FAQ: React.FC = () => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);

//   const handleToggle = (index: number) => {
//     if (activeIndex === index) {
//       setActiveIndex(null);
//     } else {
//       setActiveIndex(index);
//     }
//   };

//   return (
//     <section className="bg-[#000435] mb-20 text-white" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
//         <h2 className="text-3xl md:text-4xl mb-14 font-extrabold text-center text-white">🤔 Frequently Asked Questions 🤔</h2>
//         <dl className="space-y-5">
//           {faqs.map((faq, index) => (
//             <div key={index} className="space-y-2">
//               <div className={`rounded-lg ${activeIndex === index ? 'animated-border' : 'border-2 border-transparent'}`}>
//                 <button
//                   onClick={() => handleToggle(index)}
//                   className={`animated-border-inner w-full focus:outline-none transition duration-100 ease-in-out`}
//                 >
//                   <span className="text-lg md:text-2xl leading-6 font-medium">{faq.question}</span>
//                   {activeIndex === index ? <BiChevronUp className="h-5 w-5" /> : <BiChevronDown className="h-5 w-5" />}
//                 </button>
//               </div>
//               <div
//                 className={`transition-all duration-1000 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-full' : 'max-h-0'}`}
//                 style={{ maxHeight: activeIndex === index ? '200px' : '0px' }} // Adjust maxHeight as needed
//               >
//                 <div className="mt-2 ml-4 text-xl font-mono">{faq.answer}</div>
//               </div>
//             </div>
//           ))}
//         </dl>
//       </div>
//     </section>
//   );
// };

// export default FAQ;

import React, { useState } from 'react';
import bgHero from "../assets/bgHero.png";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Style Share ?",
    answer: "Style Share is a simple web-based platform where users can contribute, create, explore, and share web design components, focusing on Tailwind CSS.",
  },
  {
    question: "How does it work ?",
    answer: "Users can search any component with search bar from various developers, contribute to open source for more Tailwind components, create their own component to help other developers, and create posts from the 'New Posts' section.",
  },
  {
    question: "Who can use Style Share ?",
    answer: "Whether you are a seasoned developer looking for inspiration or a beginner taking your first steps into the world of web design, Style Share offers a wealth of resources tailored to your needs.",
  },
  {
    question: "Is there a cost to use Style Share ?",
    answer: "No, Style Share is completely free to use.",
  },
  {
    question: "How do I contribute to Style Share ?",
    answer: "You can contribute by creating your own components and sharing them on the platform. You can also help improve existing components.",
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className=" text-[#000435] bg-white dark:text-white dark:bg-[#000435]" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  text-[#000435] bg-white dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2 className="text-3xl md:text-4xl mb-14 font-extrabold text-center  text-[#000435] bg-white dark:text-white dark:bg-[#000435]">🤔 Frequently Asked Questions 🤔</h2>
        <dl className="space-y-5">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <div className={`rounded-lg ${activeIndex === index ? 'animated-border' : 'border-2 border-transparent  text-[#000435] bg-white dark:text-white dark:bg-[#000435]'}`}>
                <button
                  onClick={() => handleToggle(index)}
                  className={`animated-border-inner w-full focus:outline-none transition duration-100 ease-in-out  text-[#000435] bg-white dark:text-white dark:bg-[#000435]`}
                >
                  <span className="text-lg md:text-2xl leading-6 font-medium  text-[#000435] bg-white dark:text-white dark:bg-[#000435]">{faq.question}</span>
                  {activeIndex === index ? <BiChevronUp className="h-5 w-5" /> : <BiChevronDown className="h-5 w-5" />}
                </button>
              </div>
              <div
                className={`transition-all duration-1000 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-full' : 'max-h-0'}`}
                style={{ maxHeight: activeIndex === index ? '200px' : '0px' }} // Adjust maxHeight as needed
              >
                <div className="mt-2 ml-4 text-xl font-mono ">{faq.answer}</div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FAQ;

