// import { useEffect, useState, useRef } from "react";
// import Loader from "../components/Loader";
// import PostCard from "../components/PostCard";
// import { userState } from "../store/atoms/auth";
// import { useRecoilValue } from "recoil";
// import { useTranslation } from "react-i18next";
// import usePosts from "../hooks/usePosts";
// import bgHero from "../assets/bgHero.png";
// import TrendingPosts from "./TrendingPosts";

// const Posts = () => {
//   const [showFilterDialog, setShowFilterDialog] = useState(false);
//   const [tagInput, setTagInput] = useState("");
//   const [filterTags, setFilterTags] = useState<string[]>([]);
//   const filterRef = useRef<HTMLDivElement>(null);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   const { t } = useTranslation();

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         filterRef.current &&
//         !filterRef.current.contains(event.target as Node)
//       ) {
//         setShowFilterDialog(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleFilterDialog = () => {
//     setShowFilterDialog(!showFilterDialog);
//   };

//   const addTag = () => {
//     if (tagInput && !filterTags.includes(tagInput.toLowerCase())) {
//       setFilterTags([...filterTags, tagInput.toLowerCase()]);
//       setTagInput("");
//     }
//   };

//   const removeTag = (tagToRemove: string) => {
//     setFilterTags(filterTags.filter((tag) => tag !== tagToRemove));
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       addTag();
//     }
//   };

//   return (
//     <div className="-mt-7 min-h-screen  text-[#000435] bg-white dark:text-white dark:bg-[#000435]"  style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
//       <div className="max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4"style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//         <h1 className="text-2xl font-semibold mb-4 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435]">
//           {t("allPosts.Posts")}
//         </h1>
//         <div className="w-full flex justify-between mb-4 relative">
//           <button
//             onClick={toggleFilterDialog}
//             className="flex items-center text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] hover:text-blue-400"
//           >
//             {t("allPosts.filter")}
//             <svg
//               className="w-4 h-4 ml-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               ></path>
//             </svg>
//           </button>
//           {showFilterDialog && (
//             <div
//               ref={filterRef}
//               className="absolute top-full mt-2 bg-gray-800 p-4 rounded shadow-lg w-full max-w-md"
//             >
//               <div className="mb-2">
//                 <input
//                   type="text"
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   placeholder={t("allPosts.tag")}
//                   className="p-2 w-full rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 />
//               </div>
//               <button
//                 onClick={addTag}
//                 className="px-4 py-2 text-white border border-gray-600 rounded hover:bg-gray-700"
//               >
//                 {t("allPosts.tag")}
//               </button>
//               <div className="mt-2 flex flex-wrap">
//                 {filterTags.map((tag, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center bg-gray-700 text-white px-2 py-1 rounded mr-2 mb-2"
//                   >
//                     <span>{tag}</span>
//                     <button
//                       onClick={() => removeTag(tag)}
//                       className="ml-2 focus:outline-none"
//                     >
//                       <svg
//                         className="w-4 h-4 fill-current text-red-500"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm5 13.586-1.414 1.414-3.586-3.586-3.586 3.586-1.414-1.414 3.586-3.586-3.586-3.586 1.414-1.414 3.586 3.586 3.586-3.586 1.414 1.414-3.586 3.586 3.586 3.586z" />
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//             }}
//             placeholder={t("allPosts.search")}
//             className="p-2 w-full max-w-xs rounded-md text-[#000435] bg-white dark:text-white dark:bg-[#000435] border border-sky-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <PostListWithPagination searchQuery={searchQuery} tags={filterTags} />
//         <TrendingPosts/>
//       </div>
//     </div>
//   );
// };

// function PostListWithPagination({searchQuery = "",tags = []}: {
//   searchQuery: string,
//   tags: string[]
// }) {
//   const currentUser = useRecoilValue(userState);
//   const {
//     posts,
//     loading,
//     error,
//     page,
//     totalPages,
//     handleNextPage,
//     handlePreviousPage,
//     handlePageClick,
//     handleDelete,
//   } = usePosts({
//     initialPage: 1,
//     pageSize: 12,
//     searchQuery: searchQuery,
//     tags
//   });

//   const { t } = useTranslation();

//   const filteredPosts = posts;

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 font-semibold text-lg text-center">
//         {error}
//       </div>
//     );
//   }

//   return <><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
//   {filteredPosts.map((post, index) => (
//     <PostCard
//       key={index}
//       post={post}
//       onDelete={handleDelete}
//       currentUser={currentUser}
//     />
//   ))}
// </div>
// <div className="flex justify-center items-center mt-4 w-full space-x-2">
//   <button
//     onClick={handlePreviousPage}
//     disabled={page === 1}
//     className={`text-white px-4 py-2 rounded ${
//       page === 1
//         ? "bg-gray-600 cursor-not-allowed"
//         : "bg-blue-600 hover:bg-blue-700"
//     }`}
//   >
//     {t("allPosts.pre")}
//   </button>
//   {Array.from({ length: totalPages }, (_, i) => (
//     <button
//       key={i}
//       onClick={() => handlePageClick(i + 1)}
//       className={`text-white px-4 py-2 rounded ${
//         page === i + 1
//           ? "bg-blue-500 text-white"
//           : "bg-blue-600 hover:bg-blue-700"
//       }`}
//     >
//       {i + 1}
//     </button>
//   ))}
//   <button
//     onClick={handleNextPage}
//     disabled={page === totalPages}
//     className={`text-white px-6 py-2 rounded ${
//       page === totalPages
//         ? "bg-gray-600 cursor-not-allowed"
//         : "bg-blue-600 hover:bg-blue-700"
//     }`}
//   >
//     {t("allPosts.next")}
//   </button>
// </div>
// </>;
// }

// export default Posts;

// import React, { useState, useEffect, useRef } from "react";
// import Loader from "../components/Loader";
// import PostCard from "../components/PostCard";
// import { userState } from "../store/atoms/auth";
// import { useRecoilValue } from "recoil";
// import { useTranslation } from "react-i18next";
// import usePosts from "../hooks/usePosts";
// import TrendingPosts from "./TrendingPosts";
// import bgHero from "../assets/bgHero.png";

// const Posts = () => {
//   const [showFilterDialog, setShowFilterDialog] = useState(false);
//   const [tagInput, setTagInput] = useState("");
//   const [filterTags, setFilterTags] = useState<string[]>([]);
//   const filterRef = useRef<HTMLDivElement>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showTrendingPosts, setShowTrendingPosts] = useState(false); // State for toggling TrendingPosts visibility

//   const { t } = useTranslation();
//   const currentUser = useRecoilValue(userState);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         filterRef.current &&
//         !filterRef.current.contains(event.target as Node)
//       ) {
//         setShowFilterDialog(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleFilterDialog = () => {
//     setShowFilterDialog(!showFilterDialog);
//   };

//   const addTag = () => {
//     if (tagInput && !filterTags.includes(tagInput.toLowerCase())) {
//       setFilterTags([...filterTags, tagInput.toLowerCase()]);
//       setTagInput("");
//     }
//   };

//   const removeTag = (tagToRemove: string) => {
//     setFilterTags(filterTags.filter((tag) => tag !== tagToRemove));
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       addTag();
//     }
//   };

//   const toggleTrendingPosts = () => {
//     setShowTrendingPosts(!showTrendingPosts); // Toggle the state for TrendingPosts visibility
//   };

//   return (
//     <div className="-mt-7 min-h-screen text-[#000435] bg-white dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <div className="max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4">
//         <h1 className="text-2xl font-semibold mb-4 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435]">
//           {t("allPosts.Posts")}
//         </h1>
//         <div className="w-full flex justify-between mb-4 relative">
//           {/* Toggle button for TrendingPosts */}
//           <button
//             onClick={toggleTrendingPosts}
//             className="flex items-center text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] hover:text-blue-400"
//           >
//             {showTrendingPosts ? "Hide Trending Posts" : "Show Trending Posts"}
//           </button>
//           {/* Filter dialog toggle button */}
//           <button
//             onClick={toggleFilterDialog}
//             className="flex items-center text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] hover:text-blue-400"
//           >
//             {t("allPosts.filter")}
//             <svg
//               className="w-4 h-4 ml-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M19 9l-7 7-7-7"
//               ></path>
//             </svg>
//           </button>
//           {/* Filter dialog content */}
//           {showFilterDialog && (
//             <div
//               ref={filterRef}
//               className="absolute top-full mt-2 bg-gray-800 p-4 rounded shadow-lg w-full max-w-md"
//             >
//               <div className="mb-2">
//                 <input
//                   type="text"
//                   value={tagInput}
//                   onChange={(e) => setTagInput(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   placeholder={t("allPosts.tag")}
//                   className="p-2 w-full rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 />
//               </div>
//               <button
//                 onClick={addTag}
//                 className="px-4 py-2 text-white border border-gray-600 rounded hover:bg-gray-700"
//               >
//                 {t("allPosts.tag")}
//               </button>
//               <div className="mt-2 flex flex-wrap">
//                 {filterTags.map((tag, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center bg-gray-700 text-white px-2 py-1 rounded mr-2 mb-2"
//                   >
//                     <span>{tag}</span>
//                     <button
//                       onClick={() => removeTag(tag)}
//                       className="ml-2 focus:outline-none"
//                     >
//                       <svg
//                         className="w-4 h-4 fill-current text-red-500"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm5 13.586-1.414 1.414-3.586-3.586-3.586 3.586-1.414-1.414 3.586-3.586-3.586-3.586 1.414-1.414 3.586 3.586 3.586-3.586 1.414 1.414-3.586 3.586 3.586 3.586z" />
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//           {/* Search input field */}
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder={t("allPosts.search")}
//             className="p-2 w-full max-w-xs rounded-md text-[#000435] bg-white dark:text-white dark:bg-[#000435] border border-sky-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         {/* Conditionally render TrendingPosts based on showTrendingPosts state */}
//         {showTrendingPosts && <TrendingPosts />}
//         {/* Post list with pagination */}
//         <PostListWithPagination searchQuery={searchQuery} tags={filterTags} />
//       </div>
//     </div>
//   );
// };

// function PostListWithPagination({ searchQuery = "", tags = [] }: {
//   searchQuery: string,
//   tags: string[]
// }) {
//   const currentUser = useRecoilValue(userState);
//   const {
//     posts,
//     loading,
//     error,
//     page,
//     totalPages,
//     handleNextPage,
//     handlePreviousPage,
//     handlePageClick,
//     handleDelete,
//   } = usePosts({
//     initialPage: 1,
//     pageSize: 12,
//     searchQuery: searchQuery,
//     tags
//   });

//   const { t } = useTranslation();

//   const filteredPosts = posts;

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 font-semibold text-lg text-center">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
//         {filteredPosts.map((post, index) => (
//           <PostCard
//             key={index}
//             post={post}
//             onDelete={handleDelete}
//             currentUser={currentUser}
//           />
//         ))}
//       </div>
//       <div className="flex justify-center items-center mt-4 w-full space-x-2">
//         <button
//           onClick={handlePreviousPage}
//           disabled={page === 1}
//           className={`text-white px-4 py-2 rounded ${
//             page === 1
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {t("allPosts.pre")}
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => handlePageClick(i + 1)}
//             className={`text-white px-4 py-2 rounded ${
//               page === i + 1
//                 ? "bg-blue-500 text-white"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           onClick={handleNextPage}
//           disabled={page === totalPages}
//           className={`text-white px-6 py-2 rounded ${
//             page === totalPages
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {t("allPosts.next")}
//         </button>
//       </div>
//     </>
//   );
// }

// export default Posts;


import React, { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import { userState } from "../store/atoms/auth";
import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import usePosts from "../hooks/usePosts";
import TrendingPosts from "./TrendingPosts";
import bgHero from "../assets/bgHero.png";

const Posts = () => {
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTrendingPosts, setShowTrendingPosts] = useState(false); // State for toggling TrendingPosts visibility

  const { t } = useTranslation();
  const currentUser = useRecoilValue(userState);

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

  const toggleTrendingPosts = () => {
    setShowTrendingPosts(!showTrendingPosts); // Toggle the state for TrendingPosts visibility
  };

  return (
    <div className="-mt-7 min-h-screen text-[#000435] bg-white dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435]">
          {t("allPosts.Posts")}
        </h1>
        <div className="w-full flex justify-between mb-4 relative">
          {/* Toggle button for TrendingPosts */}
          <button
            onClick={toggleTrendingPosts}
            className="flex items-center text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] hover:text-blue-400"
          >
            {showTrendingPosts ? "Hide Trending Posts" : "Show Trending Posts"}
          </button>
          {/* Filter dialog toggle button */}
          <button
            onClick={toggleFilterDialog}
            className="flex items-center text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] hover:text-blue-400"
          >
            {t("allPosts.filter")}
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
          {/* Filter dialog content */}
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
          {/* Search input field */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("allPosts.search")}
            className="p-2 w-full max-w-xs rounded-md text-[#000435] bg-white dark:text-white dark:bg-[#000435] border border-sky-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Conditionally render TrendingPosts or normal posts based on showTrendingPosts state */}
        {showTrendingPosts ? (
          <TrendingPosts />
        ) : (
          <PostListWithPagination searchQuery={searchQuery} tags={filterTags} />
        )}
      </div>
    </div>
  );
};

function PostListWithPagination({ searchQuery = "", tags = [] }: {
  searchQuery: string,
  tags: string[]
}) {
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
  } = usePosts({
    initialPage: 1,
    pageSize: 12,
    searchQuery: searchQuery,
    tags
  });

  const { t } = useTranslation();

  const filteredPosts = posts;

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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {filteredPosts.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            onDelete={handleDelete}
            currentUser={currentUser}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 w-full space-x-2">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`text-white px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {t("allPosts.pre")}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={`text-white px-4 py-2 rounded ${
              page === i + 1
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
          className={`text-white px-6 py-2 rounded ${
            page === totalPages
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {t("allPosts.next")}
        </button>
      </div>
    </>
  );
}

export default Posts;

