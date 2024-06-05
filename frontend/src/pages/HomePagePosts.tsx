import { useEffect, useState } from 'react';
import axios from 'axios';
import { IPost } from '../types';
import Loader from '../components/Loader';
import PostCard from '../components/PostCard';

const HomePagePost = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/v1/posts?page=1&pageSize=-6');
        setPosts(response.data.posts.reverse());
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className='text-red-500 font-semibold text-lg text-center'>{error}</div>;
  }

  return (
    <div className='max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4'>
      <h1 className="text-3xl font-semibold my-4 text-white">📃 Recent Posts Added</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full my-10">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePagePost;
