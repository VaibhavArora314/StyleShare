import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import DOMPurify from "dompurify";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import Comment from "./Comment";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import usePost from "../hooks/usePost";
import SharePostButtons from "../components/SharePostButtons";
import ReactionButton from "../components/ReactionButtons";
import bgHero from "../assets/bgHero.png";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const { post, error, loading, isOwner } = usePost(id || "");
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState("0px");
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useTranslation();

  const shareUrl = window.location.href;
  const title = `👋 Hey ! I found amazing tailwind css 💅 component ${post.title} have a look, The design is done by ${post.author.username} check out the link it's amazing 😀`;

  const onLoad = () => {
    setHeight(ref.current?.contentWindow?.document.body.scrollHeight + "px");
  };

  useEffect(() => {
    onLoad();
  }, [isPreview, post?.codeSnippet]);

  const handleCopy = () => {
    if (post) {
      navigator.clipboard.writeText(post.codeSnippet);
      toast.success("Code snippet copied to clipboard");
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  useEffect(() => {
    onLoad();
  }, [isPreview, post?.codeSnippet]);

  const handleAddToFavorite = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to add a post to favorites");
        return;
      }
      await axios.post(
        `/api/v1/posts/${id}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFavorite(true);
      localStorage.setItem(`post-${id}-favorite`, "true");
      toast.success("Post added to favorites");
    } catch (e) {
      const error = e as AxiosError<{
        error: {
          message: string;
        };
      }>;
      if (error.response && error.response.status === 403) {
        toast.error(
          error.response.data.error.message || "User is not verified!"
        );
      } else {
        toast.error("Failed to submit comment. Please try again later.");
      }
    }
  };

  const handleRemoveFromFavorite = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to remove a post from favorites");
        return;
      }
      await axios.post(
        `/api/v1/posts/${id}/unfavorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFavorite(false);
      localStorage.removeItem(`post-${id}-favorite`);
      toast.success("Post removed from favorites");
    } catch (e) {
      const error = e as AxiosError<{
        error: {
          message: string;
        };
      }>;
      if (error.response && error.response.status === 403) {
        toast.error(
          error.response.data.error.message || "User is not verified!"
        );
      } else {
        toast.error("Failed to submit comment. Please try again later.");
      }
    }
  };

  useEffect(() => {
    const favoriteStatus = localStorage.getItem(`post-${id}-favorite`);
    setIsFavorite(favoriteStatus === "true");
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
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login for 🤖 customization");
      return;
    }
    navigate(`/app/customize-with-ai/${post.id}`, { state: { post } });
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

  const handleProfileNavigation = () => {
    navigate(`/app/profile/${post.author.id}`);
  };

  return (
    <div className="-mt-10 min-h-screen  text-[#000435] bg-white dark:text-white dark:bg-[#000435]"  style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
        <div className="p-6  text-[#000435] bg-white dark:text-white dark:bg-[#000435] max-w-screen-xl mx-auto" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <>
            <button
              onClick={() => window.history.back()}
              className="mb-2 mt-2 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
            >
              <IoMdArrowRoundBack size={20} />
            </button>
            <div className="flex flex-row content-center mb-1 boder border-sky-500 dark:border-sky-500">
              <h2 className="text-2xl font-semibold mr-3">{post.title}</h2>
              {isFavorite ? (
                <MdFavorite
                  onClick={handleRemoveFromFavorite}
                  size={33}
                  className="cursor-pointer   text-red-600 "
                />
              ) : (
                <MdFavoriteBorder
                  onClick={handleAddToFavorite}
                  size={33}
                  className="cursor-pointer text-[#000435] bg-white dark:text-white dark:bg-[#000435]  "
                />
              )}
            </div>
            <ReactionButton postId={post.id} initialReaction={post.userReaction} />
            <p className="mb-4">{post.description}</p>


            <div className="relative my-4 text-[#000435] bg-white dark:text-white dark:bg-[#000435] ">
              {isPreview ? (
                <div className="p-4 text-[#000435] bg-white dark:text-white dark:bg-[#000435]  z-0 h-full overflow-hidden rounded border border-gray-700">
                  <iframe
                    ref={ref}
                    onLoad={onLoad}
                    className="w-full h-full border-0 text-[#000435] bg-white dark:text-white dark:bg-[#000435] "
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
                <pre className="p-4 text-[#000435] bg-white dark:text-white dark:bg-[#000435]  border border-gray-700 rounded overflow-auto max-h-96 line-numbers language-html">
                  <code className="text-[#000435] bg-white dark:text-white dark:bg-[#000435] ">{post.codeSnippet}</code>
                </pre>
              )}
              <div className="absolute top-2 right-3 flex space-x-2">
                {isOwner && !isPreview ? (
                  <Link
                    to={`/app/posts/edit/${post.id}`}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                  >
                    Edit
                  </Link>
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
            <div className="mb-4 ">
              <h3 className="text-xl font-semibold my-2 ">{t("newPost.tags")}</h3>
              <div className="flex flex-wrap gap-2 ">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 text-[#000435] bg-white dark:text-white dark:bg-[#000435]  border border-sky-500 text-sm rounded-3xl"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="my-5">
              <h3 className="text-xl font-semibold my-2">{t("postdet.author")}</h3>
              <button
                onClick={handleProfileNavigation}
                data-tooltip-content={`View ${post.author.username} profile 👀`}
                data-tooltip-id="my-tooltip"
                className="text-lg font-semibold cursor-pointer"
              >
                {t("postdet.user")}: @{post.author.username}
              </button>
            </div>
            <SharePostButtons shareUrl={shareUrl} title={title}/>
            <Comment />
          </>
        </div>
    </div>
  );
};

export default Post;
