import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { IPost } from '../types';
import Loader from '../components/Loader';
import PostCard from '../components/PostCard';
import { userState } from '../store/atoms/auth';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t } = useTranslation();

  const currentUser = useRecoilValue(userState);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/posts?page=${page}&pageSize=12`);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDialog(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleFilterDialog = () => {
    setShowFilterDialog(!showFilterDialog);
  };

  const addTag = () => {
    if (tagInput && !filterTags.includes(tagInput.toLowerCase())) {
      setFilterTags([...filterTags, tagInput.toLowerCase()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFilterTags(filterTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  };

  const filteredPosts = posts.filter(post =>
    filterTags.every(tag => post.tags.map(t => t.toLowerCase()).includes(tag)) &&
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className='text-red-500 font-semibold text-lg text-center'>{error}</div>;
  }

  const handleDelete = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <div className='max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4'>
      <h1 className="text-2xl font-semibold mb-4 text-white">{t("allPosts.Posts")}</h1>
      <div className="w-full flex justify-between mb-4 relative">
        <button
          onClick={toggleFilterDialog}
          className="flex items-center text-white hover:text-gray-400"
        >
          {t("allPosts.filter")}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {showFilterDialog && (
          <div
            ref={filterRef}
            className="absolute top-full mt-2 bg-gray-800 p-4 rounded shadow-lg w-full max-w-md"
          >
            <div className="mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("allPosts.tag")}
                className="p-2 w-full rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <button
              onClick={addTag}
              className="px-4 py-2 text-white border border-gray-600 rounded hover:bg-gray-700"
            >
              {t("allPosts.tag")}
            </button>
            <div className="mt-2 flex flex-wrap">
              {filterTags.map((tag, index) => (
                <div key={index} className="flex items-center bg-gray-700 text-white px-2 py-1 rounded mr-2 mb-2">
                  <span>{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 focus:outline-none"
                  >
                    <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm5 13.586-1.414 1.414-3.586-3.586-3.586 3.586-1.414-1.414 3.586-3.586-3.586-3.586 1.414-1.414 3.586 3.586 3.586-3.586 1.414 1.414-3.586 3.586 3.586 3.586z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("allPosts.search")}
          className="p-2 w-full max-w-xs rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {filteredPosts.map((post, index) => (
          <PostCard key={index} post={post} onDelete={handleDelete} currentUser={currentUser} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 w-full space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`text-white px-4 py-2 rounded ${page === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}        >
          {t("allPosts.pre")}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={`text-white px-4 py-2 rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-blue-600 hover:bg-blue-700'}`}          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`text-white px-6 py-2 rounded ${page === totalPages ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}        >
          {t("allPosts.next")}
        </button>
      </div>
    </div>
  );
};

export default Posts;
