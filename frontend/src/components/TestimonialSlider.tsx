import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoCaretForwardOutline, IoCaretBackOutline } from "react-icons/io5";
import { MdOutlineStarOutline, MdOutlineStar } from "react-icons/md";
import bgHero from '../assets/bgHero.png';
import { IUserFeedback } from '../types';
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [testimonials, setTestimonials] = useState<IUserFeedback[]>([]);

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
    axios.get('/api/v1/user/getfeedback')
      .then(response => setTestimonials(response.data))
      .catch(error => console.error('Error fetching testimonials:', error));
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (!isHovered) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + slidesToShow) % testimonials.length);
      }, 2000); // Change slide every 2 seconds
    }

    return () => clearInterval(intervalId);
  }, [slidesToShow, isHovered, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slidesToShow) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - slidesToShow + testimonials.length) % testimonials.length);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          index < rating ? <MdOutlineStar key={index} size={20} className="text-yellow-500"/> : <MdOutlineStarOutline key={index} size={20} className="text-gray-300"/>
        ))}
      </div>
    );
  };

  return (
    <div
      className="testimonial-slider-container w-full flex flex-col text-center py-10 text-[#000435] bg-white dark:text-white dark:bg-[#000435]"
      style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8">⭐ What Our Users Say ⭐</h2>
      <div className="testimonial-slider flex items-center justify-center w-full my-auto mx-auto">
        <button
          className="prev-arrow text-4xl cursor-pointer transform hover:scale-125 transition-transform duration-300"
          onClick={goToPrevious}
        >
          <IoCaretBackOutline/>
        </button>
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
    {testimonials.slice(currentIndex, currentIndex + slidesToShow).map((testimonial, index) => (
        <figure key={index} className="max-w-screen-md mx-auto">
            <div className='flex justify-start mb-5'>
                <ImQuotesLeft size={30} />
            </div>
            <blockquote>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">{testimonial.comment}</p>
            </blockquote>
            <div className='flex justify-end mt-5'>
                <ImQuotesRight size={30} />
            </div>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img className="w-12 h-12 rounded-full" src={testimonial.user.avatar || `https://ui-avatars.com/api/?name=${testimonial.user.username}&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile picture" />
                <div className="flex flex-col items-center divide-y-2 divide-gray-500 dark:divide-gray-700">
                    <div className="pb-1 text-sm font-light text-gray-500 dark:text-gray-400">{renderStars(testimonial.rating)}</div>
                    <div className="pt-1 font-medium text-gray-900 dark:text-white">{testimonial.user.username}</div>
                </div>
            </figcaption>
        </figure>
    ))}
</div>

        <button
          className="next-arrow text-4xl cursor-pointer transform hover:scale-125 transition-transform duration-300"
          onClick={goToNext}
        >
          <IoCaretForwardOutline/>
        </button>
      </div>
      <div className="dots flex justify-center mt-4">
        {testimonials.map((_, index) => (
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
