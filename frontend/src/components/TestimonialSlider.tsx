import React, { useState, useEffect } from 'react';
import bgHero from '../assets/bgHero.png';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  quote: string;
  author: string;
  image: string;
}

interface TestimonialsData {
  title: string;
  users: Testimonial[];
}

const TestimonialSlider: React.FC = () => {
  const { t } = useTranslation();

  const testimonialsData = t('testimonials', { returnObjects: true }) as TestimonialsData;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState<number>(3);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(1);
      }
    };

    window.addEventListener('resize', updateSlidesToShow);
    updateSlidesToShow();

    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (!isHovered) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + slidesToShow) % testimonialsData.users.length);
      }, 2000); // Change slide every 2 seconds
    }

    return () => clearInterval(intervalId);
  }, [slidesToShow, isHovered, testimonialsData.users.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slidesToShow) % testimonialsData.users.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - slidesToShow + testimonialsData.users.length) % testimonialsData.users.length);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="testimonial-slider-container w-full flex flex-col text-center py-10 bg-cover bg-center text-[#000435] dark:text-white"
      style={{ backgroundImage: `url(${bgHero})` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8">{testimonialsData.title}</h2>
      <div className="testimonial-slider flex items-center justify-center w-full my-auto mx-auto">
        <button
          className="prev-arrow text-4xl cursor-pointer transform hover:scale-125 transition-transform duration-300 mx-4"
          onClick={goToPrevious}
        >
          &#9664;
        </button>
        <div className="flex overflow-hidden max-w-full">
          {testimonialsData.users.slice(currentIndex, currentIndex + slidesToShow).map((testimonial, index) => (
            <div key={index} className="testimonial mx-2 p-6 md:p-10 rounded-lg shadow-lg bg-white dark:bg-[#000435] text-[#000435] dark:text-white flex flex-col items-center justify-center min-w-[260px] md:min-w-[350px] lg:min-w-[400px]">
              <img
                src={testimonial.image}
                alt={`${testimonial.author}'s picture`}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-6 border-4 p-1 border-[#a238ff] dark:border-white"
              />
              <p className="text-lg md:text-2xl italic mb-4 text-center">"{testimonial.quote}"</p>
              <h4 className="text-base md:text-xl font-semibold text-center">- {testimonial.author}</h4>
            </div>
          ))}
        </div>
        <button
          className="next-arrow text-4xl cursor-pointer transform hover:scale-125 transition-transform duration-300 mx-4"
          onClick={goToNext}
        >
          &#9654;
        </button>
      </div>
      <div className="dots flex justify-center mt-4">
        {testimonialsData.users.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${index === currentIndex ? 'bg-[#a238ff]' : 'bg-gray-400'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
