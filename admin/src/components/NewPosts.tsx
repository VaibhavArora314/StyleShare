import { PiNewspaperClippingLight } from "react-icons/pi"
import axios from "axios";
import { useEffect, useState } from "react";
import { IPost } from '../types'; 
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import { ColorRing } from 'react-loader-spinner';

const NewPosts = () => {
  const [posts, setposts] = useState<IPost[]>([]);
  const token = useRecoilValue(tokenState);
  const [loading,setLoading] = useState(true);
  
  const fetchPost = async () => {
    try {
      const response = await axios.get('/api/v1/admin/posts/all',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setposts(response.data.posts.reverse());
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
        <span className="flex items-center mx-24 lg:mr-11 text-xl font-bold mt-3 decoration-sky-500 decoration-dotted underline">
        <div className='inline-block p-2 text-white bg-[#000435] rounded-lg mr-2'>
            <PiNewspaperClippingLight size={23}/>
        </div>
            New Posts
        </span>
    </div>
    {loading ? 
    <>
      <div className="flex justify-center items-center h-80">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)','#000435','rgb(14 165 233)']}
        />
      </div>
    </>
    :
    <>
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
            {posts.slice(0,6).map(posts => (
              <tr key={posts.id} className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                <td className="px-8 py-4 font-semibold text-white">{posts.title}</td>
                <th className="flex items-center px-6 py-5 text-white">
                  <div>
                    <div className="text-base font-bold">{posts.author.username}</div>
                    <div className="font-medium text-gray-300 ">{posts.author.email}</div>
                  </div>
                </th>
                <td className="px-3 py-4 font-semibold">{new Date(posts.createdAt).toLocaleDateString()}</td>
                <td className="px-14 py-4 font-semibold">{posts.comments.length}</td>
                <td className="px-12 py-4 font-semibold">{posts.reactions.length}</td>
                <td className="px-2 py-4">
                  <button className='font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    }
      </div>
    )
  }
  
  export default NewPosts
  