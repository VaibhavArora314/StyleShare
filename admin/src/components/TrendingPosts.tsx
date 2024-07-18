import axios from "axios";
import { useEffect, useState } from "react";
import { MdAutoGraph } from "react-icons/md";
import { IPost } from '../types'; 
import { tokenState } from "../store/atoms/auth";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useRecoilValue(tokenState);

  const fetchPost = async () => {
    try {
      const response = await axios.get('/api/v1/admin/posts/trending', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTrendingPosts(response.data.trendingPosts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <div>
        <span className="flex items-center mx-24 lg:mr-11 text-xl font-bold mt-7 decoration-sky-500 decoration-dotted underline">
          <div className='inline-block p-2 text-white bg-[#000435] rounded-lg mr-2'>
            <MdAutoGraph size={23} />
          </div>
          Trending Posts
        </span>
      </div>
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <ColorRing
              visible={true}
              height="100"
              width="100"
              colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)','#000435','rgb(14 165 233)']}
            />
          </div>
        ) : (
        <div className="lg:mx-24 mx-10 lg:mr-11 mt-5 overflow-x-auto shadow-md rounded-xl mb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-sky-500">
              <tr>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Author</th>
                <th scope="col" className="px-3 py-3">Created At</th>
                <th scope="col" className="px-6 py-3">Comments</th>
                <th scope="col" className="px-6 py-3">Reactions</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {trendingPosts.slice(0, 6).map(post => (
                <tr key={post.id} className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                  <td className="px-8 py-4 font-semibold text-white">{post.title}</td>
                  <th className="flex items-center px-6 py-5 text-white">
                    <div>
                      <div className="text-base font-bold">{post.author.username}</div>
                      <div className="font-medium text-gray-300">{post.author.email}</div>
                    </div>
                  </th>
                  <td className="px-3 py-4 font-semibold">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-14 py-4 font-semibold">{post.comments.length}</td>
                  <td className="px-12 py-4 font-semibold">{post.reactions.length}</td>
                  <td className="px-2 py-4">
                    <Link to="/admin/posts" className="font-semibold rounded-md p-2 bg-sky-500 text-white px-6 border-2 hover:bg-sky-600">
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
  );
};

export default TrendingPosts;
