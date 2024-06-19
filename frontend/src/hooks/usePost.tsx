import { useEffect, useState } from "react";
import { IPost } from "../types";
import axios, { AxiosError } from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../store/atoms/auth";

const usePost = (id: string) => {
  const user = useRecoilValue(userState);
  const [post, setPost] = useState<IPost>({
    id: "",
    title: "",
    description: "",
    codeSnippet: "",
    tags: [],
    author: {
      id: "",
      username: "",
      email: "",
    },
    comments: [],
    favoritePosts: [],
    userReaction: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/v1/posts/${id}`);
        setPost(response.data.post);
        if (user && user.id === response.data.post.author.id) {
          setIsOwner(true);
        }
        setLoading(false);
      } catch (error) {
        const axiosError = error as AxiosError<{ error: string }>;
        setError(axiosError.response?.data.error || "Failed to fetch the post");
        setLoading(false);
      }
    };

    fetchPost();
  }, [user,id]);

  return { post, setPost, loading, error, isOwner };
};

export default usePost;
