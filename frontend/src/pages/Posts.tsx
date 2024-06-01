import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PostData } from "../types";
import Loader from "../components/Loader";

const Posts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/v1/posts");
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilterDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleFilterDialog = () => {
    setShowFilterDialog(!showFilterDialog);
  };

  const addTag = () => {
    if (tagInput && !filterTags.includes(tagInput.toLowerCase())) {
      setFilterTags([...filterTags, tagInput.toLowerCase()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFilterTags(filterTags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
    }
  };

  const filteredPosts = posts.filter((post) =>
    filterTags.every((tag) =>
      post.tags.map((t) => t.toLowerCase()).includes(tag)
    )
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 font-semibold text-lg text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-white">Posts</h1>
      <div className="w-full flex justify-between mb-4 relative">
        <button
          onClick={toggleFilterDialog}
          className="flex items-center text-white hover:text-gray-400"
        >
          Filter
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
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
                placeholder="Add tag"
                className="p-2 w-full rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <button
              onClick={addTag}
              className="px-4 py-2 text-white border border-gray-600 rounded hover:bg-gray-700"
            >
              Add Tag
            </button>
            <div className="mt-2 flex flex-wrap">
              {filterTags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-700 text-white px-2 py-1 rounded mr-2 mb-2"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 focus:outline-none"
                  >
                    <svg
                      className="w-4 h-4 fill-current text-red-500"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm5 13.586-1.414 1.414-3.586-3.586-3.586 3.586-1.414-1.414 3.586-3.586-3.586-3.586 1.414-1.414 3.586 3.586 3.586-3.586 1.414 1.414-3.586 3.586 3.586 3.586z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-800 border border-gray-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-lg font-semibold mb-2 text-white">
              {post.title}
            </h2>
            <p className="text-gray-400 mb-2">
              {post.description.length > 100
                ? `${post.description.slice(0, 100)}...`
                : post.description}
            </p>
            <p className="text-gray-500">By: {post.author.username}</p>
            <div className="mt-2 flex flex-wrap">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm bg-gray-700 text-white px-2 py-1 rounded-full mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              to={`/app/posts/${post.id}`}
              className="text-blue-400 hover:text-blue-300 mt-2 inline-block"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
