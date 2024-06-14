import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { IPost } from '../types';
import DOMPurify from 'dompurify';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import Loader from '../components/Loader'
import toast from 'react-hot-toast';
import { TwitterShareButton, LinkedinShareButton, FacebookShareButton, TelegramShareButton, LinkedinIcon, FacebookIcon, TelegramIcon, XIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import Comment from './Comment';
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { userState, tokenState } from '../store/atoms/auth';

const Post = () => {
  const user = useRecoilValue(userState);
  const token = useRecoilValue(tokenState);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
    dislikes: 0,
    comments: [],
    favoritePosts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState('0px');
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useTranslation();
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [tagInput, setTagInput] = useState("");
  
  const shareUrl = `http://style-share.vercel.app/app/posts/${post.id}`
  const title = `👋 Hey ! I found amazing tailwind css 💅 component ${post.title} have a look, The design is done by ${post.author.username} check out the link it's amazing 😀`

  const onLoad = () => {
    setHeight(ref.current?.contentWindow?.document.body.scrollHeight + 'px');
  };

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
      toast.success('Code snippet copied to clipboard');
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };
  
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
        toast.error('Please login to like a post');
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
      toast.success(response.data.message)
    } catch (error) {
      toast.success('Like is done only once, no spam 😊');
    }
  };

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to dislike a post');
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
      toast.success(response.data.message)
    } catch (error) {
      toast.success('Dislike is done only once, no spam 😊');
    }
  };

  const handleAddToFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add a post to favorites');
        return;
      }
      await axios.post(`/api/v1/posts/${id}/favorite`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIsFavorite(true);
      localStorage.setItem(`post-${id}-favorite`, 'true');
      toast.success('Post added to favorites');
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data.error.message || 'User is not verified!');
      } else {
        toast.error('Failed to submit comment. Please try again later.');
      }
    }
  };

  const handleRemoveFromFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to remove a post from favorites');
        return;
      }
      await axios.post(`/api/v1/posts/${id}/unfavorite`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIsFavorite(false);
      localStorage.removeItem(`post-${id}-favorite`);
      toast.success('Post removed from favorites');
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data.error.message || 'User is not verified!');
      } else {
        toast.error('Failed to submit comment. Please try again later.');
      }
    }
  };

  const handleEdit = () => {
    setisEditing(true);
  };

  useEffect(() => {
    const favoriteStatus = localStorage.getItem(`post-${id}-favorite`);
    setIsFavorite(favoriteStatus === 'true');
  }, [id]);


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

  const handleNavigation = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login for 🤖 customization');
      return;
    }
    navigate(`/app/customize-with-ai/${post.id}`,{state: { post}});
  };

  const handleAddTag = () => {
    if (tagInput.length > 0 && !post.tags.includes(tagInput)) {
      setPost({ ...post, tags: [...post.tags, tagInput] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPost({ ...post, tags: post.tags.filter((tag) => tag !== tagToRemove) });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedPost = {
      title: post.title,
      description: post.description,
      codeSnippet: post.codeSnippet,
      tags: post.tags,
    };
    console.log('inside update');
    try {
      const response = await axios.put(`/api/v1/posts/${post.id}`, updatedPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message)
      setisEditing(false);
      navigate(`/app/posts/${response.data?.post?.id}`);
    } catch (e) {
      const axiosError = e as AxiosError<{ error: string }>;
      console.log(axiosError.response?.data.error);
      setError(axiosError.response?.data.error || 'Failed to update the post');
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

  const handleProfileNavigation = () =>{
    navigate(`/app/profile/${post.author.id}`);
  }

  return (
    <div className="p-6 text-white max-w-screen-xl mx-auto">
      {(post && isEditing) ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
          <p className="mt-4">{error}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={post.description}
                onChange={(e) => setPost({ ...post, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="codeSnippet" className="block text-sm font-medium mb-2">
                Code Snippet
              </label>
              <textarea
                id="codeSnippet"
                name="codeSnippet"
                value={post.codeSnippet}
                onChange={(e) => setPost({ ...post, codeSnippet: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded"
              />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium">
                Tags
              </label>
              <div className="mt-1 mb-2 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 bg-gray-700 text-sm rounded"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-gray-300 hover:text-white"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                id="tagInput"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="p-2 bg-gray-800 border border-gray-700 rounded"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                Add Tag
              </button>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
            >
              Save
            </button>
            <button
              onClick={() => setisEditing(false)}
              className="ml-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <>
          <button onClick={() => window.history.back()} className="mb-2 mt-2 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">
            <IoMdArrowRoundBack size={20} />
          </button>
          <div className='flex flex-row content-center mb-1'>
            <h2 className="text-2xl font-semibold mr-3">{post.title}</h2>
            {isFavorite ? (
              <MdFavorite onClick={handleRemoveFromFavorite} size={33} className="cursor-pointer text-blue-600 " />
            ) : (
              <MdFavoriteBorder onClick={handleAddToFavorite} size={33} className="cursor-pointer text-white" />
            )}
          </div>
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
          <div className="relative my-4">
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
              {(isOwner && !isPreview) ? (
                <button onClick={handleEdit}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">
                  Edit
                </button>
              ) : null}
              {isPreview ? null : (
                <button
                  onClick={handleCopy}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                >
                  {t("postdet.copy")}
                </button>
              )}
              <button
                onClick={togglePreview}
                className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
              >
                {isPreview ? t("postdet.show") : t("postdet.preview")}
              </button>
              <button
                  onClick={handleNavigation}
                  className="px-2 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 text-sm"
                >
                  {t("postdet.cus")}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold my-2">{t("newPost.tags")}</h3>
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
          <div className="my-5">
            <h3 className="text-xl font-semibold my-2">{t("postdet.author")}</h3>
            <button onClick={handleProfileNavigation} data-tooltip-content={`View ${post.author.username} profile 👀`} data-tooltip-id="my-tooltip" className='text-lg font-semibold cursor-pointer'>{t("postdet.user")}: @{post.author.username}</button>
          </div>
          <div className="flex space-x-2 my-4">
            <TelegramShareButton url={shareUrl} title={title}>
              <TelegramIcon size={35} round />
            </TelegramShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <XIcon size={35} round />
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl} title={title}>
              <WhatsappIcon size={35} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={shareUrl} title={title} summary={title}>
              <LinkedinIcon size={35} round />
            </LinkedinShareButton>
            <FacebookShareButton url={shareUrl} title={title} >
              <FacebookIcon size={35} round />
            </FacebookShareButton>
          </div>
          <Comment />
        </>
      )}
    </div>
  );
};

export default Post;
