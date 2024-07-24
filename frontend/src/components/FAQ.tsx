import React, { useState } from 'react';
import bgHero from "../assets/bgHero.png";
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import "../styles/faq.css";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
    {
      question: "Can I use Style Share for commercial projects?",
      answer: "Yes, you can use the components shared on Style Share for both personal and commercial projects without any restrictions.",
    },
    {
      question: "How do I get started with Tailwind CSS?",
      answer: "To get started with Tailwind CSS, visit the official Tailwind CSS documentation. You can also explore the components on Style Share for inspiration and examples.",
    },
    {
      question: "Can I request specific components on Style Share?",
      answer: "Yes, you can request specific components by posting in the 'Requests' section. The community can then create and share the requested components.",
    },
    {
      question: "Are there any guidelines for contributing components?",
      answer: "Yes, please follow the contribution guidelines provided on the platform. This ensures that all components meet the quality standards and are consistent with the platform's design principles.",
    },
    {
      question: "How can I give feedback or suggest improvements?",
      answer: "You can provide feedback or suggest improvements by using the 'Feedback' section on the platform. We value your input and strive to continuously improve Style Share.",
    }
  ];

  const handleToggle = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <section className="faq-section">
      <div className="faq-container" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2 className="faq-title">Frequently Asked Questions ! </h2>
        
        <dl className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className={`faq-question-container ${activeIndex === index ? 'active' : ''}`}>
                <button
                  onClick={() => handleToggle(index)}
                  className="faq-question"
                >
                  <span className="faq-question-text">{faq.question}</span>
                  {activeIndex === index ? <BiChevronUp className="icon" /> : <BiChevronDown className="icon" />}
                </button>
              </div>
              <div
                className={`faq-answer ${activeIndex === index ? 'open' : ''}`}
                style={{ maxHeight: activeIndex === index ? '200px' : '0px' }} // Adjust maxHeight as needed
              >
                 <div className="faq-answer-text">{faq.answer}</div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default FAQ;


