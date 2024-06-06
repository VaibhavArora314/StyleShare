import { useEffect, useState } from "react";
import { IUser } from "../types";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";

const Favorite = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/v1/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.user);

        const favoritesResponse = await axios.get(`/api/v1/posts/${response.data.user.id}/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser((prevUser) => ({
          ...prevUser!,
          favoritePosts: favoritesResponse.data.favoritePosts
        }));

        setLoading(false);
      } catch (error:any) {
        setErrorMessage('Please verify your account to access this feature 😔 !');
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <div className='text-red-500 font-semibold text-xl text-center my-10'>{errorMessage}</div>;
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 text-white flex flex-col items-center">
        <div className="w-80 bg-blue-950 backdrop-blur-sm rounded-xl p-3 border border-sky-500 text-center text-xl font-semibold ">
          My Favorite Posts 😍
        </div>
        <div className="mt-8 w-full">
          {user?.favoritePosts && user.favoritePosts.length > 0 ? (
            <>
            <h4 className="font-semibold">Favorite Posts ( {user?.favoritePosts.length} )</h4>
            <div className="mt-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {user.favoritePosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            </>
          ) : (
            <div className="text-center text-lg text-gray-300 font-semibold">No favorite post yet 😟</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorite;
