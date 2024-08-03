import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import { userState } from "../store/atoms/auth";
import { useRecoilValue } from "recoil";
import usePosts from "../hooks/usePosts";
import bgHero from "../assets/bgHero.png";

const HomePagePost = () => {
  const {posts, error, loading, handleDelete} = usePosts({ initialPage: 1, pageSize: 6});
  const currentUser = useRecoilValue(userState);


  console.log("Home page post section rerendered")

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 font-semibold text-lg text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4  text-[#000435] bg-white dark:text-white dark:bg-[#000435]"style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1 className="text-3xl font-semibold my-4 text-[#000435] dark:text-white">📃 Recent Posts Added</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full my-10">
        {posts.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            onDelete={handleDelete}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePagePost;