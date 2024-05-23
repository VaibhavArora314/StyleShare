import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PostData } from '../types';

const Posts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/v1/posts');
        setPosts(response.data.posts);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4'>
      <h1 className="text-2xl font-semibold mb-4 text-white">Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 border border-gray-600 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2 text-white">{post.title}</h2>
            <p className="text-gray-400 mb-2">{post.description.length > 100 ? `${post.description.slice(0, 100)}...` : post.description}</p>
            <p className="text-gray-500">By: {post.author.username}</p>
            <div className="mt-2 flex flex-wrap">
              {post.tags.map((tag, index) => (
                <span key={index} className="text-sm bg-gray-700 text-white px-2 py-1 rounded mr-2 mb-2">{tag}</span>
              ))}
            </div>
            <Link to={`/app/posts/${post.id}`} className="text-blue-400 hover:text-blue-300">Read more</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
