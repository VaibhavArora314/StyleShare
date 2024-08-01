import React, { useState, useEffect } from 'react';
import bgHero from '../assets/bgHero.png';
import { IoCaretForwardOutline } from "react-icons/io5";
import { IoCaretBackOutline } from "react-icons/io5";
import axios from 'axios';

interface Testimonial {
  quote: string;
  author: string;
  image: string;
}

interface Feedback {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
}

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

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
        setCurrentIndex((prevIndex) => (prevIndex + slidesToShow) % testimonials.length);
      }, 2000); // Change slide every 2 seconds
    }

    return () => clearInterval(intervalId);
  }, [slidesToShow, isHovered, testimonials.length]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('/api/v1/user/getfeedback');
        const data: Feedback[] = response.data;
        const formattedTestimonials = data.map((feedback) => ({
          quote: feedback.comment,
          author: feedback.user.username,
          image: feedback.user.avatar,
        }));
        setTestimonials(formattedTestimonials);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

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
        <div className="flex overflow-hidden max-w-full">
          {testimonials.slice(currentIndex, currentIndex + slidesToShow).map((testimonial, index) => (
            <div key={index} className="testimonial mx-2 p-6 md:p-10 rounded-lg shadow-lg bg-white dark:bg-[#000435] text-[#000435] dark:text-white flex flex-col items-center justify-center min-w-[260px] md:min-w-[350px] lg:min-w-[400px]">
              <img
                src={testimonial.image|| `https://ui-avatars.com/api/?name=${testimonial.author}&background=0ea5e9&color=fff&rounded=true&bold=true`}
                alt={`${testimonial.author}'s picture`}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-6 border-4 p-1 border-[#a238ff] dark:border-white"
              />
              <p className="text-lg md:text-2xl italic mb-4 text-center">"{testimonial.quote}"</p>
              <h4 className="text-base md:text-xl font-semibold text-center">- {testimonial.author}</h4>
            </div>
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
