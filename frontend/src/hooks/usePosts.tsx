import { useCallback, useEffect, useState } from "react";
import { IPost } from "../types";
import axios from "axios";

type Props = {
  initialPage: number;
  pageSize: number;
  searchQuery: string;
  tags: string[]
}

const usePosts = ({initialPage = 1,pageSize=12,searchQuery="",tags=[]}:Props) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [timeoutValue,setTimeoutValue] = useState<number | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      // setLoading(true);
      const response = await axios.get(
        `/api/v1/posts?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&tags=${tags.join(",")}`
      );
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch posts");
      setLoading(false);
    }
  },[page,pageSize,tags,searchQuery]);

  useEffect(() => {
    if (timeoutValue) clearTimeout(timeoutValue);

    const timeout = setTimeout(fetchPosts,300);
    setTimeoutValue(timeout);
    // fetchPosts();
  }, [page,pageSize,tags,searchQuery,fetchPosts]);

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
  }
};

export default usePosts;
