import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPost, IUser } from '../types';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { tokenState, userState } from '../store/atoms/auth';
import Loader from '../components/Loader';
import { GoUnverified, GoVerified } from 'react-icons/go';
import toast from 'react-hot-toast';
import { RiUserFollowFill } from "react-icons/ri";
import { RiUserUnfollowFill } from "react-icons/ri";
import { followUser, unfollowUser, getFollowStatus } from '../components/api/FollowApis';

const ShowProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const currentUser = useRecoilValue(userState);
  const { t } = useTranslation();
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/v1/user/profile/${id}`);
        setUser(response.data.user);

        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        const followStatusResponse = await getFollowStatus(id!, token!);
        setIsFollowing(followStatusResponse.isFollowing);
        console.log(posts);
      } catch (error) {
        setErrorMessage('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id, posts, token,user]);

  const handleDelete = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

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
        toast.error("Some Error occured !");
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
        toast.error("Some Error occured !");
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <div className='text-red-500 font-semibold text-lg text-center'>{errorMessage}</div>;
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Unknown";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 text-white flex flex-col items-center">
      <div className="w-80 bg-blue-950 backdrop-blur-sm rounded-xl p-3 border border-sky-500">
        <div className="p-2 flex justify-end mr-2">
          {user?.verified ? (
            <GoVerified className="text-2xl text-white" title="Verified" />
          ) : (
            <GoUnverified className="text-2xl text-white" title="Unverified" />
          )}
        </div>
        <div className="flex flex-col items-center mb-3">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.username}&background=0ea5e9&color=fff&rounded=true&bold=true`}
            width={60}
            alt="profile-pic"
          />
          <p className="p-4 text-xl">{user?.username}</p>
          <p className="text-gray-200 font-normal text-sm">{user?._count.following} followers</p>
          <p className="text-sky-400 flex items-center">
            <span className="ml-2 text-base font-semibold">Joined: {formatDate(user?.createdAt)}</span>
          </p>
        </div>
      </div>
      {user?.id && currentUser?.id && currentUser?.id !== user?.id && (
        isFollowing ? (
          <button
            className="mt-4 flex font-semibold py-2 px-2 bg-blue-950 backdrop-blur-sm rounded-xl p-3 border border-sky-500 hover:bg-blue-900"
            onClick={() => handleUnfollow(user.id)}
          >
            <RiUserUnfollowFill size={23} className='mr-1' /> Unfollow {user?.username}
          </button>
        ) : (
          <button
            className="mt-4 flex font-semibold py-2 px-2 bg-blue-950 backdrop-blur-sm rounded-xl p-3 border border-sky-500 hover:bg-blue-900"
            onClick={() => handleFollow(user.id)}
          >
            <RiUserFollowFill size={23} className='mr-1' /> Follow {user?.username}
          </button>
        )
      )}
      <div className="mt-6 w-full">
        <h4 className="font-semibold">
          {t("leaderboard.posts")} ( {user?.posts.length} )
        </h4>
        <div className="mt-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {user?.posts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={handleDelete} currentUser={currentUser} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;