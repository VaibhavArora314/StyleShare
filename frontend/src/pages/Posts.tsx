import { useEffect, useState, useRef } from "react";
import PostCard from "../components/PostCard";
import { userState } from "../store/atoms/auth";
import { useRecoilValue } from "recoil";
import usePosts from "../hooks/usePosts";
import bgHero from "../assets/bgHero.png";
import { IoIosArrowDown } from "react-icons/io";
import PostsPageSkeleton from "../components/PostsSkeleton";

const Posts = () => {
  const currentUser = useRecoilValue(userState);
  const {
    posts,
    loading,
    error,
    page,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    handlePageClick,
    handleDelete,
    addTag: insertTag,
    removeTag: deleteTag,
    searchQuery,
    setSearchQuery,
    fetchPosts,
  } = usePosts({
    initialPage: 1,
    pageSize: 12,
  });

  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);
  const filteredPosts = posts;
  const allTags = filteredPosts.map(post => post.tags).flat();
  const uniqueTags = [...new Set(allTags)];
  const tagsToDisplay = uniqueTags.slice(0, 3);
  var placeholderTags = tagsToDisplay.length > 0 ? tagsToDisplay.join(", ") : "";
  placeholderTags = placeholderTags + (uniqueTags.length > 3 ? " ..." : "");
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDialog(false);
      }
    };

    document.title = "Style Share | Our Posts 📃";
    
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
      insertTag(tagInput);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFilterTags(filterTags.filter((tag) => tag !== tagToRemove));
    deleteTag(tagToRemove);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
    }
  };

  const handleSearch = () => {
    fetchPosts(page, 12, searchQuery, filterTags);
  };

  if (loading) {
    return <PostsPageSkeleton />;
  }

  if (error) {
    return (
      <div className="text-red-500 font-semibold text-lg text-center">
        {error}
      </div>
    );
  }

  return (
    <div
      className="-mt-7 min-h-screen text-[#000435] bg-white dark:text-white dark:bg-[#000435]"
      style={{
        backgroundImage: `url(${bgHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4"
        style={{
          backgroundImage: `url(${bgHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-2xl font-semibold mb-4 text-black dark:text-white">Posts</h1>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-4 relative space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex space-x-4">
            <button
              onClick={toggleFilterDialog}
              className="flex items-center text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] hover:text-blue-400"
            >
              Filter
              <IoIosArrowDown size={20} className="items-center pt-1" />
            </button>
          </div>
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
                  placeholder={`Add tag${placeholderTags ? ` like ${placeholderTags}` : ""}`}
                  className="p-2 w-full rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <button
                onClick={addTag}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Add Tag
              </button>
              <div className="flex flex-wrap mt-2">
                {filterTags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-red-300 hover:text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center w-full sm:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Search anything"
              className="p-2 w-full max-w-xs rounded-md text-[#000435] bg-white dark:text-white dark:bg-[#000435] border border-sky-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(event)=>{
                if(event.key == "Enter"){
                  handleSearch()
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </div>
        {filteredPosts.length === 0 ? (
          <div className="text-center text-black dark:text-white">No Posts</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUser={currentUser}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            <div className="flex justify-center items-center mt-4 w-full space-x-2">
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className={`text-white px-4 py-2 rounded ${page === 1
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
                  className={`text-white px-4 py-2 rounded ${page === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className={`text-white px-6 py-2 rounded ${page === totalPages
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
