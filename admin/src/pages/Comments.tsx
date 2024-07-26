import { useState, useEffect } from "react";
import axios from "axios";
import { IPost } from "../types";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import toast from "react-hot-toast";
import { ColorRing } from 'react-loader-spinner';
import { FaComments } from "react-icons/fa";

const Comments = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading,setLoading] = useState(true);
  const token = useRecoilValue(tokenState);

  document.title = "Style Share Admin | Manage Users Comments 💬";

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

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(`/api/v1/admin/comments/delete/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
      toast.success('Comment deleted successfully');
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  return (
    <div>
      <div className="flex-1 flex flex-col lg:ml-80">
      <div className="mx-5 mb-5">
        <span className="flex  items-center  text-xl font-bold decoration-sky-500 decoration-dotted underline">
          <div className='inline-block p-2 text-white bg-[#000435] rounded-lg mr-2'>
            <FaComments size={23} />
          </div>
          All Comments
        </span>
      </div>
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
                <th scope="col" className="px-6 py-3">Comments</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <>
                <tr key={post.id} className="text-xs md:text-sm border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                  <td className="px-8 font-semibold text-white">{post.title}</td>
                  <td className="px-8 py-4 font-semibold">
                    <div className="flex flex-col items-start">
                      <span className="font-bold">{post.author.username}</span>
                      <span className="font-thin text-gray-300">{post.author.email}</span>
                    </div>
                  </td>
                  <td className="px-3 font-semibold">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-12  font-semibold">{post.comments.length}</td>
                </tr>
                {post.comments.map(comment => (
                  <tr key={comment.id} className="text-xs md:text-sm border-b bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-white">
                    <td colSpan={4} className="px-8 py-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${comment.user.username}&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />                        
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white">
                            {comment.user.username} <span className="text-gray-400"> {comment.user.email}</span>
                          </p>
                          <p className="text-sm text-gray-300">
                            {comment.content} <span className="text-xs text-gray-400">• {new Date(comment.createdAt).toLocaleString()}</span>
                          </p>
                        </div>
                        <div className="flex-shrink-0 self-center">
                          <button 
                            onClick={() => handleDeleteComment(comment.id)} 
                            className="font-semibold rounded-md p-2 bg-red-500 text-white border-2 hover:bg-red-600">
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      }
      </div>
    </div>
  );
};

export default Comments;
