import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import axios from "axios";
import { IPost } from "../types";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner';

const Posts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading,setLoading] = useState(true);
  const token = useRecoilValue(tokenState);

  document.title ="Style Share Admin | Manage Users Posts 📃"

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/v1/admin/posts/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts", error);
      setLoading(true);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(`/api/v1/admin/posts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="lg:ml-80">
        <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        {loading ? 
        <div className="flex justify-center items-center h-80">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)','#000435','rgb(14 165 233)']}
        />
      </div>
      :
        <div className="mx-5 lg:mr-11 overflow-x-auto shadow-md rounded-xl mb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-sky-500">
              <tr>
                <th scope="col" className="px-8 py-3">Title</th>
                <th scope="col" className="px-8 py-3">Author</th>
                <th scope="col" className="px-3 py-3">createdAt</th>
                <th scope="col" className="px-4 py-3">Likes</th>
                <th scope="col" className="px-6 py-3">Comments</th>
                <th scope="col" className="px-16 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} className="text-xs md:text-sm border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                  <td className="px-8 font-semibold text-white">{post.title}</td>
                  <td className="px-8 py-4 font-semibold">
                    <div className="flex flex-col items-start">
                      <span className="font-bold">{post.author.username}</span>
                      <span className="font-thin text-gray-300">{post.author.email}</span>
                    </div>
                  </td>
                  <td className="px-3 font-semibold">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-8  font-semibold">{post.reactions.length}</td>
                  <td className="px-12  font-semibold">{post.comments.length}</td>
                  <td className="px-2 py-4 grid grid-cols-1 gap-3 justify-center md:grid-cols-2 text-center">
                  <Link to={`/admin/update-post/${post.id}`} className="font-semibold rounded-md p-2 bg-sky-500 text-white border-2 hover:bg-sky-600">
                    Update
                  </Link>
                  <button onClick={() => handleDelete(post.id)} className="font-semibold rounded-md p-2 bg-red-500 text-white border-2 hover:bg-red-600">
                    Delete
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      </div>
    </div>
  );
};

export default Posts;