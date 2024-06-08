import { useEffect, useState } from "react";
import { IPost, IUser } from "../types";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState, userState } from "../store/atoms/auth";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";

const Favorite = () => {
  const user = useRecoilValue(userState);
  const [favoritePosts, setFavoritePosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const token = useRecoilValue(tokenState);
  const currentUser = useRecoilValue(userState);

  const fetchFavoritePosts = async (user: IUser): Promise<IPost[]> => {
    try {
      const response = await axios.get(`/api/v1/posts/${user.id}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data.favoritePosts;
    } catch (error) {
      console.error('Error fetching favorite posts:', error);
      throw new Error('Could not fetch favorite posts');
    }
  };

  useEffect(() => {
    const getFavoritePosts = async () => {
      if (user && user.id) {
        try {
          const posts = await fetchFavoritePosts(user);
          setFavoritePosts(posts);
        } catch (error) {
          setErrorMessage('Please verify your account to access this feature 😔 !');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getFavoritePosts();
  }, [user]);

  const handleDelete = (id: string) => {
    setFavoritePosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };


  if (loading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <div className='text-red-500 font-semibold text-xl text-center my-10'>{errorMessage}</div>;
  }

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-4 text-white flex flex-col items-center">
      <div className="w-80 bg-blue-950 backdrop-blur-sm rounded-xl p-3 border border-sky-500 text-center text-xl font-semibold">
        My Favorite Posts 😍
      </div>
      <div className="mt-8 w-full">
        {favoritePosts.length > 0 ? (
          <>
            <h4 className="font-semibold">Favorite Posts ( {favoritePosts.length} )</h4>
            <div className="mt-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {favoritePosts.map(post => (
                <PostCard key={post.id} post={post} onDelete={handleDelete} currentUser={currentUser}/>
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
