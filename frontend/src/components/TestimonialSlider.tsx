import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bgHero from "../assets/bgHero.png";

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
    author: "Yash Goyal ,     Front-end Developer",
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

const NextArrow: React.FC<{ className?: string; style?: React.CSSProperties; onClick?: () => void }> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className}  text-[#000435] bg-white dark:text-white dark:bg-[#000435] rounded-full  transform scale-125 hover:scale-150 transition-transform duration-300`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      &#9654;
    </div>
  );
};

const PrevArrow: React.FC<{ className?: string; style?: React.CSSProperties; onClick?: () => void }> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className}  text-[#000435] bg-white dark:text-white dark:bg-[#000435] rounded-full  transform scale-125 hover:scale-150 transition-transform duration-300`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      &#9664;
    </div>
  );
};

const TestimonialSlider: React.FC = () => {
  const settings = {
    dots:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true, 
    pauseOnFocus: true, 
    draggable: true, 
    swipeToSlide: true, 
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480, // For mobile view
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true, 
            arrows: false, 
          },
        },
      ],


  };

  return (
    <div className="  text-[#000435] bg-white dark:text-white dark:bg-[#000435] testimonial-slider py-10  max-w-70 px-4 md:px-10"style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#000435] bg-white dark:text-white dark:bg-[#000435] mb-8 " >⭐ What Our Users Say ⭐</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="  testimonial  p-6 md:p-20 rounded-lg shadow-lg     text-[#000435] bg-white dark:text-white dark:bg-[#000435] flex flex-col items-center justify-center" >
            <img
              src={testimonial.image}
              alt={`${testimonial.author}'s picture`}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mb-8 border-4 border-[#000435] dark:border-white mx-auto mt-0 p-2  text-[#000435] bg-white dark:text-white dark:bg-[#000435]"
            />
            <p className="text-lg md:text-2xl italic mb-4 md:mb-6 text-center  text-[#000435] bg-white dark:text-white dark:bg-[#000435]">"{testimonial.quote}"</p>
            <h4 className="text-base mt-4 md:mt-6 md:text-xl font-semibold text-center text-white-700  text-[#000435] bg-white dark:text-white dark:bg-[#000435]">- {testimonial.author}</h4>

          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;