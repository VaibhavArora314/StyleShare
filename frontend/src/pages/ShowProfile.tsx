import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPost, IUser } from '../types';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/atoms/auth';
import Loader from '../components/Loader';
import { GoUnverified, GoVerified } from 'react-icons/go';

const ShowProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useRecoilValue(userState);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/v1/user/profile/${id}`)
        setUser(response.data.user);
      } catch (error) {
        console.log(posts)
        setErrorMessage('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id, posts]);

  const handleDelete = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
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
    <div className="max-w-screen-xl mx-auto p-4 text-[#000435] bg-white dark:text-white dark:bg-[#000435] flex flex-col items-center">
        <div className="w-80 text-[#000435] bg-white dark:text-white dark:bg-[#000435] backdrop-blur-sm rounded-xl p-3 border border-sky-500">
          <div className="p-2 flex justify-end mr-2">
            {
              user?.verified ?
                <GoVerified className="text-2xl text-[#000435] bg-white dark:text-white dark:bg-[#000435]" title="Verified" />
                :
                <GoUnverified className="text-2xl text-[#000435] bg-white dark:text-white dark:bg-[#000435]" title="Unverified" />
            }
          </div>
          <div className="flex flex-col items-center mb-3">
            <img src={`https://ui-avatars.com/api/?name=${user?.username}&background=0ea5e9&color=fff&rounded=true&bold=true`} width={60} alt="profile-pic" />
            <p className="p-4 text-xl">{user?.username}</p>
            <p className="text-sky-400 flex items-center">
            <span className="ml-2 text-base font-semibold">Joined: {formatDate(user?.createdAt)}</span>
          </p>          
          </div>
        </div>
        <div className="mt-8 w-full">
          <h4 className="font-semibold">{t("leaderboard.posts")} ( {user?.posts.length} )</h4>
          <div className="mt-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">

            {user?.posts.map(post => <PostCard key={post.id} post={post} onDelete={handleDelete} currentUser={currentUser} />)}
          </div>
        </div>
      </div>
  );
};

export default ShowProfile;
