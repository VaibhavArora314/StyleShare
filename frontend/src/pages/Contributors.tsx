import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bgHero from "../assets/bgHero.png";

interface Contributor {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
  contributions: number;
}

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const contributorsPerPage = 9;

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

  const indexOfLastContributor = currentPage * contributorsPerPage;
  const indexOfFirstContributor = indexOfLastContributor - contributorsPerPage;
  const currentContributors = contributors.slice(indexOfFirstContributor, indexOfLastContributor);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(contributors.length / contributorsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    paginate(pageNumber);
  };

  return (
    <div className="-mt-7 bg-white dark:bg-[#000435] text-black dark:text-gray-200 min-h-screen" style={{
      backgroundImage: `url(${bgHero})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="container mx-auto py-8">
        <h1 className="text-center text-3xl font-semibold mb-8 mt-16">Our Contributors</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {currentContributors.map((contributor) => (
            <a
              key={contributor.id}
              href={contributor.html_url}
              className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center bg-white dark:bg-[#001f3f] border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderColor: '#800080', borderWidth: 2 }}
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-24 h-24 rounded-full object-cover mb-4"
                style={{ borderColor: '#800080', borderWidth: 2, borderStyle: 'solid' }}
              />
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {contributor.login}
              </h2>
              <p className="text-gray-700 dark:text-gray-400">
                Contributions: {contributor.contributions}
              </p>
            </a>
          ))}
        </div>
        <div className="flex justify-center items-center mt-4 w-full flex-wrap gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`text-white px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageClick(i + 1)}
              className={`text-white px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`text-white px-6 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contributors;
