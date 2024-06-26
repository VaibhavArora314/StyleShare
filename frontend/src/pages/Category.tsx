import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import { HiOutlineCollection } from "react-icons/hi";

const Category = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get('/api/v1/posts/all/tags');
        setTags(response.data.tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  return (
      <div className="max-w-screen-xl flex flex-col items-center justify-center mx-auto mt-4">
        <span className="flex text-3xl font-semibold my-4  text-[#000435] dark:text-white">
        <HiOutlineCollection size={40} className='mr-3' /> Our Categories
        </span>
        <div
          className="flex flex-wrap gap-2 justify-center relative">
          <Marquee
            pauseOnHover={true}
            speed={75}
            direction="right"
            gradient={false}
            className="relative"
            style={{ zIndex: 2 }}
          >
            {tags.map((tag, index) => (
              <Link
                to={`/app/posts?tags=${tag}`}
                key={index}
                className="inline-flex items-center px-5 py-3 m-2 border-2 border-[#5f67de] text-[#5f67de] font-bold dark:border-white dark:text-white dark:bg-transparent text-2xl rounded-lg transition-colors duration-300 hover:bg-[#5f67de] hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                {tag}
              </Link>
            ))}
          </Marquee>
        </div>
        <div
          className="flex flex-wrap gap-2 justify-center relative">
          <Marquee
            pauseOnHover={true}
            speed={60}
            direction="left"
            gradient={false}
            className="relative"
            style={{ zIndex: 2 }}
          >
            {tags.map((tag, index) => (
              <Link
                to={`/app/posts/tag/${tag}`}
                key={index}
                className="inline-flex items-center px-5 py-3 m-2 border-2 border-[#5f67de] text-[#5f67de] font-bold dark:border-white dark:text-white dark:bg-transparent text-2xl rounded-lg transition-colors duration-300 hover:bg-[#5f67de] hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                {tag}
              </Link>
            ))}
          </Marquee>
        </div>
      </div>
  );
}

export default Category;
