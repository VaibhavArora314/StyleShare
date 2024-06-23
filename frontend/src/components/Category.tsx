import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Categories</h1>
      <div className="flex flex-wrap gap-2 justify-center">
        {tags.map((tag, index) => (
          <Link
            to={`/app/posts/tag/${tag}`}
            key={index}
            className="inline-flex items-center px-4 py-2 border-2 border-[#5f67de] text-[#5f67de] font-semibold dark:border-white dark:text-white dark:bg-transparent text-sm rounded-full transition-colors duration-300 hover:bg-[#5f67de] hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;