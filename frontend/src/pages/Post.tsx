import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { IPost } from '../types';
import DOMPurify from 'dompurify';
import { BiDislike,BiLike,BiSolidDislike,BiSolidLike } from "react-icons/bi";
import Loader from '../components/Loader'

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
    },
    likes: 0,
    dislikes: 0
  });  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState('0px');
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  const onLoad = () => {
    setHeight(ref.current?.contentWindow?.document.body.scrollHeight + 'px');
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/v1/posts/${id}`);
        setPost(response.data.post);
        setLoading(false);
      } catch (error) {
        const axiosError = error as AxiosError<{ error: string }>;
        setError(axiosError.response?.data.error || 'Failed to fetch the post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    onLoad();
  }, [isPreview, post?.codeSnippet]);

  const handleCopy = () => {
    if (post) {
      navigator.clipboard.writeText(post.codeSnippet);
      alert('Code snippet copied to clipboard');
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/v1/posts/${id}`);
        setPost(response.data.post);
        setLoading(false);
      } catch (error) {
        const axiosError = error as AxiosError<{ error: string }>;
        setError(axiosError.response?.data.error || 'Failed to fetch the post');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    onLoad();
  }, [isPreview, post?.codeSnippet]);

  useEffect(() => {
    const userLikedStatus = localStorage.getItem(`post-${id}-liked`);
    const userDislikedStatus = localStorage.getItem(`post-${id}-disliked`);
    setUserLiked(userLikedStatus === 'true');
    setUserDisliked(userDislikedStatus === 'true');
  }, [id]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to like a post');
        return;
      }
      const response = await axios.post(`/api/v1/posts/${id}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPost(prevPost => ({ ...prevPost, likes: response.data.likes, dislikes: response.data.dislikes }));
      setUserLiked(true);
      setUserDisliked(false);
      localStorage.setItem(`post-${id}-liked`, 'true');
      localStorage.removeItem(`post-${id}-disliked`);
    } catch (error) {
      alert('like is done only once, no spam 😊');
    }
  };
  
  const handleDislike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to dislike a post');
        return;
      }
      const response = await axios.post(`/api/v1/posts/${id}/dislike`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPost(prevPost => ({ ...prevPost, dislikes: response.data.dislikes, likes: response.data.likes }));
      setUserLiked(false);
      setUserDisliked(true);
      localStorage.setItem(`post-${id}-disliked`, 'true');
      localStorage.removeItem(`post-${id}-liked`);
    } catch (error) {
      alert('Dislike is done only once, no spam 😊');
    }
  };
  
  
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-lg w-full text-center mt-5">
        {error}
      </div>
    );
  }

  DOMPurify.addHook("uponSanitizeElement", (node, data) => {
    if (data.tagName === "img" || data.tagName === "div") {
      const src = node.getAttribute("src");
      const style = node.getAttribute("style");
      if (src && src.startsWith("http")) {
        node.setAttribute("src", src);
      }
      if (style && style.includes("url(")) {
        node.setAttribute("style", style);
      }
    }
  });

  const sanitizedSnippet = DOMPurify.sanitize(post?.codeSnippet || "", {
    ADD_ATTR: ["style", "background"],
  });

  return (
    <div className="p-6 text-white max-w-screen-xl mx-auto">
      {post && (
        <>
          <button onClick={() => window.history.back()} className="mb-4 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg> 
          </button> 
            <h2 className="text-2xl font-semibold mr-4">{post.title}</h2>
            <button
              onClick={handleLike}
              className="px-4 py-2 my-3 rounded-md border-2 text-white text-sm mr-2"
            >
              {userLiked ? <BiSolidLike size={25} /> : <BiLike size={25} />} {post.likes}
            </button>
            <button
              onClick={handleDislike}
              className="px-4 py-2 rounded-md border-2 text-white text-sm"
            >
              {userDisliked ? <BiSolidDislike size={25} /> : <BiDislike size={25} />} {post.dislikes}
            </button>
          <p className="mb-4">{post.description}</p>
          <div className="relative mb-4">
            {isPreview ? (
              <div className="p-4 bg-gray-800 z-0 h-full overflow-hidden rounded border border-gray-700">
                <iframe
                  ref={ref}
                  onLoad={onLoad}
                  className="w-full h-full border-0"
                  srcDoc={`<html class='flex w-full h-full'>
                      <head>
                        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                        <script>
                          document.addEventListener('DOMContentLoaded', function() {
                            document.querySelectorAll('a[href="#"]').forEach(function(anchor) {
                              anchor.addEventListener('click', function(e) {
                                e.preventDefault();
                                window.top.location.reload();
                              });
                            });
                          });
                        </script>
                        </head>
                      <body class='w-full h-full flex items-center justify-center minw-full min-h-full'>
                        <div class='w-full h-full p-6'>${sanitizedSnippet}</div>
                      </body>
                    </html>`}
                  title="Preview"
                  sandbox="allow-scripts allow-same-origin"
                  style={{ minHeight: height, maxWidth: "100%" }}
                />
              </div>
            ) : (
              <pre className="p-4 bg-gray-800 border border-gray-700 rounded overflow-auto max-h-96 line-numbers language-html">
                <code>{post.codeSnippet}</code>
              </pre>
            )}
            <div className="absolute top-2 right-3 flex space-x-2">
              {isPreview ? null : (
                <button
                  onClick={handleCopy}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                >
                  Copy
                </button>
              )}
              <button
                onClick={togglePreview}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
              >
                {isPreview ? "Show Code" : "Preview"}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-gray-700 text-sm rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Author</h3>
            <p>Username: {post.author.username}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
