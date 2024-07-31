import React, { useState, useEffect } from 'react';
import bgHero from '../assets/bgHero.png';

interface Testimonial {
  quote: string;
  author: string;
  image: string;
}


const testimonials: Testimonial[] = [
  {
    quote: "StyleShare's Tailwind CSS platform has revolutionized my workflow! With its intuitive utility-first approach, I can create stylish and responsive designs in a fraction of the time.",
    author: "Ravi Kiran, Front-end Developer",
    image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain" 
  },
  {
    quote: "I've been using StyleShare's Tailwind CSS platform for my personal projects, and I'm amazed by its flexibility and efficiency. It's truly a game-changer in the world of web development!",
    author: "Yash Goyal, Front-end Developer",
    image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
  },
  {
    quote: "Thanks to StyleShare's Tailwind CSS platform, I've been able to speed up my design process significantly. Its modular approach and customizable components have made styling a breeze!",
    author: "Manoj Kumar,Front-end Developer",
    image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
  },
  {
    quote: "StyleShare's Tailwind CSS platform has transformed the way I collaborate with my team. Its consistent and scalable design system ensures seamless integration across projects, fostering productivity and creativity",
    author: "Surya Teja, Front-end Developer",
    image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain" 
  },
  {
    quote: "I can't imagine working on web projects without StyleShare's Tailwind CSS platform. Its simplicity and power have elevated my skills as a developer and enabled me to deliver top-notch designs to my clients.",
    author: "Sivaram, Front-end Developer",
    image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
  },
  {
    quote: "StyleShare's Tailwind CSS platform has transformed the way I collaborate with my team. Its consistent and scalable design system ensures seamless integration across projects, fostering productivity and creativity.",
    author: "Bharath, Front-end Developer",
    image: "https://th.bing.com/th/id/OIP.MnOHsqmDK0x6eSduQ6UjdwHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
  },
];

const TestimonialSlider: React.FC = () => {
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
        setCurrentIndex((prevIndex) => (prevIndex + slidesToShow) % testimonials.length);
      }, 2000); // Change slide every 3 seconds
    }

    return () => clearInterval(intervalId);
  }, [slidesToShow, isHovered]);
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
          &#9664;
        </button>
        <div className="flex overflow-hidden max-w-full">
          {testimonials.slice(currentIndex, currentIndex + slidesToShow).map((testimonial, index) => (
            <div key={index} className="testimonial border border-blue-400 dark:border-gray-00 px-2 py-4 md:py-24 rounded-md mx-2 p-6 md:p-10 rounded-lg shadow-lg bg-white dark:bg-[#000435] text-[#000435] dark:text-white flex flex-col items-center justify-center min-w-[260px] md:min-w-[350px] lg:min-w-[400px]">
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
          className="next-arrow text-4xl cursor-pointer transform hover:scale-125 transition-transform duration-300"
          onClick={goToNext}
        >
          &#9654;
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