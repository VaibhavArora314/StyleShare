// @ts-nocheck
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { IPost } from '../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost>({
    id: "",
    title: "",
    description: "",
    codeSnippet: "",
    tags: [],
    author: {
      id: "",
      username: "",
      email: ""
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/v1/posts/${id}`);
        setPost(response.data.post);
        setLoading(false);
      } catch (error) {
        const axiosError = error as AxiosError<{
          error: string;
        }>;

        setError(axiosError.response?.data.error || 'Failed to fetch the post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(post.codeSnippet);
    alert('Code snippet copied to clipboard');
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-lg w-full text-center mt-5">{error}</div>;
  }

  return (
    <div className="p-6 text-white max-w-screen-xl mx-auto">
      {post && (
        <>
          <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
          <p className="mb-4">{post.description}</p>
          <div className="relative mb-4">
            <SyntaxHighlighter language="html" style={a11yDark} className="bg-black">
              {post.codeSnippet}
            </SyntaxHighlighter>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
            >
              Copy
            </button>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-700 text-sm rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Author</h3>
            <p>Username: {post.author.username}</p>
            <p>Email: {post.author.email}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
