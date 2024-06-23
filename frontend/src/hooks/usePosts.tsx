// import { useCallback, useEffect, useState } from "react";
// import { IPost } from "../types";
// import axios from "axios";

// type Props = {
//   initialPage: number;
//   pageSize: number;
//   searchQuery: string;
//   tags: string[]
// }

// const usePosts = ({initialPage = 1,pageSize=12,searchQuery="",tags=[]}:Props) => {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(initialPage);
//   const [totalPages, setTotalPages] = useState(1);
//   const [timeoutValue,setTimeoutValue] = useState<number | null>(null);

//   const fetchPosts = useCallback(async () => {
//     try {
//       // setLoading(true);
//       const response = await axios.get(
//         `/api/v1/posts?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&tags=${tags.join(",")}`
//       );
//       setPosts(response.data.posts);
//       setTotalPages(response.data.totalPages);
//       setLoading(false);
//     } catch (error) {
//       setError("Failed to fetch posts");
//       setLoading(false);
//     }
//   },[page,pageSize,tags,searchQuery]);

//   useEffect(() => {
//     if (timeoutValue) clearTimeout(timeoutValue);

//     const timeout = setTimeout(fetchPosts,300);
//     setTimeoutValue(timeout);
//     // fetchPosts();
//   }, [page,pageSize,tags,searchQuery,fetchPosts]);

//   const handlePreviousPage = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) {
//       setPage(page + 1);
//     }
//   };

//   const handlePageClick = (pageNumber: number) => {
//     setPage(pageNumber);
//   };

//   const handleDelete = () => {
//     fetchPosts();
//   };

//   return {
//     posts,
//     loading,
//     error,
//     page,
//     totalPages,
//     handleNextPage,
//     handlePreviousPage,
//     handlePageClick,
//     handleDelete,
//   }
// };

// export default usePosts;

// import { useCallback, useEffect, useState, useRef } from "react";
// import { IPost } from "../types";
// import axios from "axios";

// type Props = {
//   initialPage: number;
//   pageSize: number;
//   searchQuery: string;
//   tags: string[];
// }

// const usePosts = ({ initialPage = 1, pageSize = 12, searchQuery = "", tags = [] }: Props) => {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(initialPage);
//   const [totalPages, setTotalPages] = useState(1);
//   const timeoutRef = useRef<number | null>(null);

//   const fetchPosts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `/api/v1/posts?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&tags=${tags.join(",")}`
//       );
//       setPosts(response.data.posts);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       setError("Failed to fetch posts");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, pageSize, tags, searchQuery]);

//   useEffect(() => {
//     if (timeoutRef.current !== null) {
//       clearTimeout(timeoutRef.current);
//     }

//     timeoutRef.current = window.setTimeout(() => {
//       fetchPosts();
//     }, 300);

//     return () => {
//       if (timeoutRef.current !== null) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [page, pageSize, tags, searchQuery, fetchPosts]);

//   const handlePreviousPage = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) {
//       setPage(page + 1);
//     }
//   };

//   const handlePageClick = (pageNumber: number) => {
//     setPage(pageNumber);
//   };

//   const handleDelete = () => {
//     fetchPosts();
//   };

//   return {
//     posts,
//     loading,
//     error,
//     page,
//     totalPages,
//     handleNextPage,
//     handlePreviousPage,
//     handlePageClick,
//     handleDelete,
//   }
// };

// export default usePosts;


// import { useCallback, useEffect, useState, useRef } from "react";
// import { IPost } from "../types";
// import axios from "axios";

// type Props = {
//   initialPage: number;
//   pageSize: number;
//   searchQuery: string;
//   tags: string[];
//   debounceDelay?: number;
// }

// const usePosts = ({ initialPage = 1, pageSize = 12, searchQuery = "", tags = [], debounceDelay = 300 }: Props) => {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(initialPage);
//   const [totalPages, setTotalPages] = useState(1);
//   const timeoutRef = useRef<number | null>(null);
//   const isFirstLoad = useRef(true);

//   const fetchPosts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `/api/v1/posts?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&tags=${tags.join(",")}`
//       );
//       setPosts(response.data.posts);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       setError("Failed to fetch posts");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, pageSize, tags, searchQuery]);

//   useEffect(() => {
//     if (isFirstLoad.current) {
//       fetchPosts();
//       isFirstLoad.current = false;
//     } else {
//       if (timeoutRef.current !== null) {
//         clearTimeout(timeoutRef.current);
//       }

//       timeoutRef.current = window.setTimeout(() => {
//         fetchPosts();
//       }, debounceDelay);

//       return () => {
//         if (timeoutRef.current !== null) {
//           clearTimeout(timeoutRef.current);
//         }
//       };
//     }
//   }, [page, pageSize, tags, searchQuery, fetchPosts, debounceDelay]);

//   const handlePreviousPage = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) {
//       setPage(page + 1);
//     }
//   };

//   const handlePageClick = (pageNumber: number) => {
//     setPage(pageNumber);
//   };

//   const handleDelete = () => {
//     fetchPosts();
//   };

//   return {
//     posts,
//     loading,
//     error,
//     page,
//     totalPages,
//     handleNextPage,
//     handlePreviousPage,
//     handlePageClick,
//     handleDelete,
//   }
// };

// export default usePosts;

// import { useCallback, useEffect, useState, useRef } from "react";
// import { IPost } from "../types";
// import axios from "axios";

// type Props = {
//   initialPage: number;
//   pageSize: number;
//   searchQuery: string;
//   tags: string[];
//   debounceDelay?: number;
// }

// const usePosts = ({ initialPage = 1, pageSize = 12, searchQuery = "", tags = [], debounceDelay = 300 }: Props) => {
//   const [posts, setPosts] = useState<IPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(initialPage);
//   const [totalPages, setTotalPages] = useState(1);
//   const [sortBy, setSortBy] = useState<string | null>(null); // State to manage sorting

//   const fetchPosts = useCallback(async () => {
//     setLoading(true);
//     try {
//       let url = `/api/v1/posts?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&tags=${tags.join(",")}`;
      
//       if (sortBy) {
//         url += `&sortBy=${sortBy}`;
//       }

//       const response = await axios.get(url);
//       setPosts(response.data.posts);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       setError("Failed to fetch posts");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, pageSize, tags, searchQuery, sortBy]);

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   const handlePreviousPage = () => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (page < totalPages) {
//       setPage(page + 1);
//     }
//   };

//   const handlePageClick = (pageNumber: number) => {
//     setPage(pageNumber);
//   };

//   const handleDelete = () => {
//     fetchPosts();
//   };

//   const handleSortByReactionCount = () => {
//     setSortBy("reactions"); // Set sort by reactions
//   };

//   return {
//     posts,
//     loading,
//     error,
//     page,
//     totalPages,
//     handleNextPage,
//     handlePreviousPage,
//     handlePageClick,
//     handleDelete,
//     handleSortByReactionCount,
//   }
// };

// export default usePosts;

import { useCallback, useEffect, useState, useRef } from "react";
import { IPost } from "../types";
import axios from "axios";

type Props = {
  initialPage: number;
  pageSize: number;
  searchQuery: string;
  tags: string[];
  debounceDelay?: number;
};

const usePosts = ({ initialPage = 1, pageSize = 12, searchQuery = "", tags = [], debounceDelay = 300 }: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      let url = `/api/v1/posts?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&tags=${tags.join(",")}`;
      
      if (sortBy === "reactions") {
        url += `&sortBy=reactions`;
      }

      const response = await axios.get(url);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, tags, searchQuery, sortBy]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

  const handleDelete = () => {
    fetchPosts();
  };

  const handleSortByReactionCount = () => {
    setSortBy("reactions");
  };

  return {
    posts,
    loading,
    error,
    page,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    handlePageClick,
    handleDelete,
    handleSortByReactionCount,
  };
};

export default usePosts;
