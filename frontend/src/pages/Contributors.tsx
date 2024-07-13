import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bgHero from "../assets/bgHero.png";
import { FaGithub } from 'react-icons/fa';

interface Contributor {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
  contributions: number;
}

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await axios.get<Contributor[]>(
          'https://api.github.com/repos/VaibhavArora314/StyleShare/contributors'
        );
        setContributors(response.data);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      }
    }
    fetchContributors();
  }, []);

  return (
    <div className="-mt-7 bg-white dark:bg-[#000435] text-black dark:text-gray-200 min-h-screen" style={{
      backgroundImage: `url(${bgHero})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="container mx-auto py-8">
        <h1 className="text-center text-3xl font-semibold mb-8">🤝 Contributors</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {contributors.map((contributor) => (
            <a
              key={contributor.id}
              href={contributor.html_url}
              className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {contributor.login}
              </h2>
              <p className="text-gray-700 dark:text-gray-400">
                Contributions: {contributor.contributions}
              </p>
              <p className="text-gray-700 dark:text-gray-400 flex items-center">
                <FaGithub className="mr-1" /> GitHub Profile
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contributors;
