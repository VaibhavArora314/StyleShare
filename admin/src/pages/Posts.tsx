import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import axios from "axios";
import { IPost } from "../types";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { RiEditCircleFill } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";

const Posts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const token = useRecoilValue(tokenState);

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
    } catch (error) {
      console.error("Error fetching posts", error);
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
        <div className="mx-5 lg:mr-11 overflow-x-auto shadow-md rounded-xl mb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-sky-500">
              <tr>
                <th scope="col" className="px-8 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Author</th>
                <th scope="col" className="px-3 py-3">createdAt</th>
                <th scope="col" className="px-6 py-3">Likes</th>
                <th scope="col" className="px-6 py-3">Comments</th>
                <th scope="col" className="px-16 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                  <td className="px-8 font-semibold text-white">{post.title}</td>
                  <td className="flex items-center px-6 py-5 text-white">
                    <div>
                      <div className="text-base font-bold">{post.author.username}</div>
                      <div className="font-medium text-gray-300 ">{post.author.email}</div>
                    </div>
                  </td>
                  <td className="px-3 font-semibold">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-8  font-semibold">{post.reactions.length}</td>
                  <td className="px-12  font-semibold">{post.comments.length}</td>
                  <td className="flex flex-col px-9">
                  <div className="flex gap-2">
                  <Link to={`/admin/update-post/${post.id}`}>
                    <button className="font-semibold rounded-md py-2 mt-5 px-3 bg-sky-500 text-white hover:bg-sky-600 flex items-center">
                      <RiEditCircleFill size={20} className="mr-1 " />
                    </button>
                  </Link>
                    <button onClick={() => handleDelete(post.id)} className="font-semibold mt-5 rounded-md py-2 px-3 bg-sky-500 text-white hover:bg-sky-600 flex items-center">
                      <IoMdTrash size={20} className="mr-1" />
                    </button>
                  </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Posts;