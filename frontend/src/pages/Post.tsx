import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
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
import PostCodeWithPreview from "../components/PostCodeWithPreview";
import bgHero from "../assets/bgHero.png";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { BsFileEarmarkZipFill } from "react-icons/bs";
import {followUser,unfollowUser,getFollowStatus} from '../components/api/FollowApis';
import { tokenState, userState } from "../store/atoms/auth";
import { useRecoilValue } from "recoil";
import { RiUserFollowFill } from "react-icons/ri";
import { RiUserUnfollowFill } from "react-icons/ri";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const { post, error, loading, isOwner } = usePost(id || "");
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useTranslation();
  const token = useRecoilValue(tokenState);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const currentUser = useRecoilValue(userState);

  const shareUrl = window.location.href;
  const title = `👋 Hey ! I found amazing tailwind css 💅 component ${post.title} have a look, The design is done by ${post.author.username} check out the link it's amazing 😀`;


  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const followStatusResponse = await getFollowStatus(post.author.id, token!);
        setIsFollowing(followStatusResponse.isFollowing);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFollowStatus();
  }, [post?.author.id, token]);

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

  const handleFollow = async (userId: string) => {
    if (!token) {
      toast.error('Authentication token is missing');
      return;
    }
    try {
      await followUser(userId, token);
      setIsFollowing(true);
      toast.success('Followed successfully');
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data.error.message || 'User is not verified!');
      } else {
        toast.error("Some Error occurred!")
      }
    }
  };

  const handleUnfollow = async (userId: string) => {
    if (!token) {
      toast.error('Authentication token is missing');
      return;
    }
    try {
      await unfollowUser(userId, token);
      setIsFollowing(false);
      toast.success('Unfollowed successfully');
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error(error.response.data.error.message || 'User is not verified!');
      } else {
        toast.error("Some Error occurred!")
      }
    }
  };

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

  const downloadAsZip = () => {
  const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login to download!");
      return;
    }
    const zip = new JSZip();
    zip.file(`${post.title}.html`, post.codeSnippet);
    zip.file(`${post.title}.js`, post.jsCodeSnippet);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `${post.title}.zip`);
    });
  };

  return (
    <div className="-mt-10 min-h-screen  text-[#000435] bg-white dark:text-white dark:bg-[#000435]"  style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
        <div className="p-6  text-[#000435] bg-white dark:text-white dark:bg-[#000435] max-w-screen-xl mx-auto" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <>
        <button
          onClick={() => window.history.back()}
          className="mb-2 mt-2 px-2 py-1 bg-sky-500 hover:bg-sky-600 text-white text-sm rounded"
        >
          <IoMdArrowRoundBack size={20} />
        </button>
        <div className="flex flex-row  justify-center items-center  mb-1 ">
          <h2 className="text-2xl font-bold mr-3   text-[#d952ff]  dark:text-white">{post.title}</h2>
          {isFavorite ? (
            <MdFavorite
              onClick={handleRemoveFromFavorite}
              size={33}
              className="cursor-pointer text-[#fe4c4c]  "
            />
          ) : (
            <MdFavoriteBorder
              onClick={handleAddToFavorite}
              size={33}
              className="cursor-pointer text-[#e74e4e] bg-white dark:text-white dark:bg-[#000435] "
            />
          )}
        </div>
        {/* <ReactionButton postId={post.id} initialReaction={post.userReaction} /> */}
        <p className="mb-4 flex flex-row font-semibold justify-center items-center content-center text-justify text-[#8437b4]  dark:text-white">{post.description}</p>
        <PostCodeWithPreview
          id={post.id}
          isOwner={isOwner}
          codeSnippet={post.codeSnippet}
          jsCodeSnippet={post.jsCodeSnippet}
          handleCustomizeAi={handleNavigation}
          showCustomizeAiOption={true}
          showTogether={true}
        />
        <ReactionButton postId={post.id} initialReaction={post.userReaction} />
        <button
          onClick={downloadAsZip} 
          className="flex items-center px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          <BsFileEarmarkZipFill className="mr-2" size={20} />
          Download as zip
        </button>
        <div className="mb-4">
          <h3 className="text-xl font-semibold my-2">{t("newPost.tags")}</h3>
          <div className="flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <Link
            to={`/app/posts?tags=${tag}`}
            key={index}
            className="inline-flex items-center px-2 py-1 border-2 border-[#5f67de] text-[#5f67de] font-semibold dark:border-white dark:text-white dark:bg-transparent text-sm rounded-md transition-colors duration-300 hover:bg-[#5f67de] hover:text-white dark:hover:bg-white dark:hover:text-black"
          >
            {tag}
          </Link>
        ))}
      </div>
        </div>
        <div className="my-5">
          <h3 className="text-xl font-semibold  my-2">{t("postdet.author")}</h3>
          <button
            onClick={handleProfileNavigation}
            data-tooltip-content={`View ${post.author.username} profile 👀`}
            data-tooltip-id="my-tooltip"
            className="text-lg font-semibold cursor-pointer"
          >
            {t("postdet.user")}: @{post.author.username}
          </button>
          <p className="text-black font-semibold text-sm  dark:text-white">{post.author.totalFollowers} followers</p>
          {currentUser?.id && post.author?.id &&  currentUser?.id !== post.author?.id && (
            isFollowing ? (
              <button
                className="mt-4 flex font-semibold py-2 px-2 text-white dark:text-white bg-sky-500 dark:bg-sky-500 rounded-xl p-3 border border-sky-500 hover:bg-blue-900 dark:hover:bg-blue-900"
                onClick={() => handleUnfollow(post.author.id)}
              >
                <RiUserUnfollowFill size={23} className="mr-1" /> Unfollow {post.author.username}
              </button>
            ) : (
              <button
                className="mt-4 flex font-semibold py-2 px-2 text-white dark:text-white bg-sky-500 dark:bg-sky-500 rounded-xl p-3 border border-sky-500 hover:bg-blue-900 dark:hover:bg-blue-900"
                onClick={() => handleFollow(post.author.id)}
              >
                <RiUserFollowFill size={23} className="mr-1" /> Follow {post.author.username}
              </button>
            )
          )}
        </div>
        <SharePostButtons shareUrl={shareUrl} title={title} />
        <Comment />
      </>
        </div>
    </div>
  );
};

export default Post;
