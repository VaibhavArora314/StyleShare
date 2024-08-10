import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { IPost } from "../types";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState("reactions");
  const [sortDirection, setSortDirection] = useState("desc");

  const fetchPosts = async (
    page: number,
    pageSize: number,
    searchQuery: string,
    tags: string[],
    sortOrder: string,
    sortDirection: string
  ) => {
  
    setSortOrder(sortOrder);
    setSortDirection(sortDirection);
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/v1/posts?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}&tags=${tags.join(
          ","
        )}&sortOrder=${sortOrder}&sortDirection=${sortDirection}`
      );
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const tagsFromParams = searchParams.get("tags");
    const initialTags = tagsFromParams ? tagsFromParams.split(",") : [];
    setTags(initialTags);
    fetchPosts(page, pageSize, searchQuery, initialTags, sortOrder, sortDirection);
  }, [page, searchParams]);

const fetchSearchSuggestions = async (query: string) => {
  try {
    const response = await axios.get(`/api/v1/posts/search/suggestions?searchQuery=${query}`);
    return response.data.suggestions;
  } catch (error) {
    console.error("Failed to fetch search suggestions");
    return [];
  }
};

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
    fetchPosts(page, pageSize, searchQuery, tags, sortOrder, sortDirection);
  };

  const addTag = (tagInput: string) => {
    if (tagInput && !tags.includes(tagInput.toLowerCase())) {
      const newTags = [...tags, tagInput.toLowerCase()];
      setTags(newTags);
      setSearchParams({ tags: newTags.join(",") });
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setSearchParams({ tags: newTags.join(",") });
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
    setSearchQuery,
    tags,
    fetchPosts ,
    fetchSearchSuggestions
  };
};

export default usePosts;
