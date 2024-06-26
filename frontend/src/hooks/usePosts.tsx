import { useEffect, useState } from "react";
import { IPost } from "../types";
import axios from "axios";

type Props = {
  initialPage?: number;
  pageSize?: number;
};

const usePosts = ({ initialPage = 1, pageSize = 12 }: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const fetchPosts = async (
    page: number,
    pageSize: number,
    searchQuery: string,
    tags: string[]
  ) => {
    try {
      const response = await axios.get(
        `/api/v1/posts?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&tags=${tags.join(
          ","
        )}`
      );
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  // const loadPosts = useCallback(() => {
  //   if (timeoutRef.current) clearTimeout(timeoutRef.current);

  //   timeoutRef.current = window.setTimeout(fetchPosts, 300);
  // }, [fetchPosts]);

  useEffect(() => {
    fetchPosts(page, pageSize, searchQuery, tags);
  }, [page, searchQuery, tags]);

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
    fetchPosts(page, pageSize, searchQuery, tags);
  };

  const addTag = (tagInput: string) => {
    if (tagInput && !tags.includes(tagInput.toLowerCase())) {
      setTags((filterTags) => [...filterTags, tagInput.toLowerCase()]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((filterTags) => filterTags.filter((tag) => tag !== tagToRemove));
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
    addTag,
    removeTag,
    searchQuery,
    setSearchQuery
  };
};

export default usePosts;