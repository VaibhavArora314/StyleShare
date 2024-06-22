import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import bgHero from "../assets/bgHero.png";
import { IComment } from "../types";


// select: {
//   id: true,
//   title: true,
//   codeSnippet: true,
//   jsCodeSnippet: true,
//   description: true,
//   tags: true,
//   author: {
//     select: {
//       id: true,
//       username: true,
//       email: true,
//     },
//   },
//   reactions:true,
// },
// });
interface Post {
  id: string;
  title: string;
  description: string;
  codeSnippet: string;
  jsCodeSnippet: string;
  author: {
    id: string;
    username: string;
    email: string;
  };
  tags: string[];
  reactions: object[];
  comments: IComment[];
  favoritePosts: [];
  userReaction: 'Like' | 'Celebrate' | 'Support' | 'Love' | 'Insightful' | 'Funny' | null; 
}

const TrendingPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/posts/trending`);
        const allPosts = response.data.trendingPosts;
        // Sort posts by reaction count in descending order
        const sortedPosts = allPosts.sort((a: Post, b: Post) => b.reactions.length - a.reactions.length);
        // Get the top 6 posts
        const topPosts = sortedPosts.slice(0, 6);

        setPosts(topPosts);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []);

  // const updatePostReactions = (postId: string, totalReactions: number) => {
  //   setPosts((prevPosts) =>
  //     prevPosts.map((post) =>
  //       post.id === postId ? { ...post, reactionCount: totalReactions } : post
  //     )
  //   );
  // };

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

  return (
    <div className="min-h-screen flex items-center justify-center text-[#000435] bg-white dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="p-6 max-w-screen-xl w-full bg-white dark:bg-[#000435] rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-[#c050f8]  dark:text-white text-center">
          Trending Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} currentUser={null} onDelete={function (): void {
              throw new Error("Function not implemented.");
            } } />
          ))}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdateReactions={updatePostReactions} currentUser={null} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default TrendingPosts;
