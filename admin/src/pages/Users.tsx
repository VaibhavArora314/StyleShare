import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atoms/auth";
import toast from "react-hot-toast";
import { IUser } from "../types";
import { ColorRing } from 'react-loader-spinner';

const Users = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [loading,setLoading] = useState(true);
  const token = useRecoilValue(tokenState);

  document.title ="Style Share Admin | Manage Users 👥"

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/v1/admin/allUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data.allUsers.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(true);
      }
    };

    fetchUsers();
  }, [token]);

  const handleBlock = async (userId: string) => {
    try {
      const response = await axios.patch(
        `/api/v1/admin/block/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      setAllUsers(allUsers.map(user => user.id === userId ? { ...user, blocked: true } : user));
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Error blocking user");
    }
  };

  const handleUnblock = async (userId: string) => {
    try {
      const response = await axios.patch(
        `/api/v1/admin/unblock/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      setAllUsers(allUsers.map(user => user.id === userId ? { ...user, blocked: false } : user));
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Error unblocking user");
    }
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col lg:ml-80">
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
      <table className="w-full rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs md:text-sm text-white uppercase bg-sky-500 text-center">
          <tr>
            <th scope="col" className="px-6 py-3">Photo</th>
            <th scope="col" className="px-8 py-3 text-start">Name</th>
            <th scope="col" className="px-6 py-3">signup At</th>
            <th scope="col" className="px-6 py-3">Posts</th>
            <th scope="col" className="px-6 py-3">Followers</th>
            <th scope="col" className="px-6 py-3">Comments</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(user => (
            <tr key={user.id} className="text-xs md:text-sm text-center border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
              <td className="pl-7"><img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${user.username}&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" /></td>
              <td className="px-8 py-4 font-semibold">
                <div className="flex flex-col items-start">
                  <span className="font-bold">{user.username}</span>
                  <span className="font-thin text-gray-300">{user.email}</span>
                </div>
              </td>
              <td className="px-8 py-4 font-semibold">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="px-8 py-4 font-semibold">{user.posts.length}</td>
              <td className="px-12 py-4 font-semibold">{user.following.length}</td>
              <td className="px-8 py-4 font-semibold">{user.comments.length}</td>
              <td className="px-2 py-4">
                {user.blocked ? (
                  <button onClick={() => handleUnblock(user.id)} className="font-semibold rounded-md p-2 bg-red-500 text-white border-2 px-4 hover:bg-red-600">
                    Unblock
                  </button>
                ) : (
                  <button onClick={() => handleBlock(user.id)} className="font-semibold rounded-md p-2 bg-sky-500 text-white px-6 border-2 hover:bg-sky-600">
                    Block
                  </button>
                )}
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

export default Users;
