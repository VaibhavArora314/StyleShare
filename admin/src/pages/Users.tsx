import { useState } from "react";
import Navbar from "../components/Navbar"
import SideBar from "../components/SideBar";

const Users = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Navbar  toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col lg:ml-80">
      <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
<div className="mx-5 lg:mr-11 overflow-x-auto shadow-md rounded-xl mb-5">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-sky-500">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Posts
                </th>
                <th scope="col" className="px-6 py-3">
                    followers
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                <th className="flex items-center px-6 py-5 text-white">
                <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=meet&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />
                <div className="ps-3">
                        <div className="text-base font-bold">Neil Sims</div>
                        <div className="font-medium text-gray-300 ">neil.sims@flowbite.com</div>
                    </div>  
                </th>
                <td className="px-8 py-4 font-semibold">
                    10
                </td>
                <td className="px-12 py-4  font-semibold">
                  7
                </td>
                <td className="px-2 py-4 ">
                <button className='font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
                  Manage
                </button>
                </td>
            </tr>
            <tr className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                <th className="flex items-center px-6 py-5 text-white">
                <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=meet&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />
                <div className="ps-3">
                        <div className="text-base font-bold">Neil Sims</div>
                        <div className="font-medium text-gray-300 ">neil.sims@flowbite.com</div>
                    </div>  
                </th>
                <td className="px-8 py-4 font-semibold">
                    10
                </td>
                <td className="px-12 py-4  font-semibold">
                  7
                </td>
                <td className="px-2 py-4 ">
                <button className='font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
                  Manage
                </button>
                </td>
            </tr>
            <tr className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                <th className="flex items-center px-6 py-5 text-white">
                <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=meet&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />
                <div className="ps-3">
                        <div className="text-base font-bold">Neil Sims</div>
                        <div className="font-medium text-gray-300 ">neil.sims@flowbite.com</div>
                    </div>  
                </th>
                <td className="px-8 py-4 font-semibold">
                    10
                </td>
                <td className="px-12 py-4  font-semibold">
                  7
                </td>
                <td className="px-2 py-4 ">
                <button className='font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
                  Manage
                </button>
                </td>
            </tr>
            <tr className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                <th className="flex items-center px-6 py-5 text-white">
                <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=meet&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />
                <div className="ps-3">
                        <div className="text-base font-bold">Neil Sims</div>
                        <div className="font-medium text-gray-300 ">neil.sims@flowbite.com</div>
                    </div>  
                </th>
                <td className="px-8 py-4 font-semibold">
                    10
                </td>
                <td className="px-12 py-4  font-semibold">
                  7
                </td>
                <td className="px-2 py-4 ">
                <button className='font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
                  Manage
                </button>
                </td>
            </tr>
            <tr className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                <th className="flex items-center px-6 py-5 text-white">
                <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=meet&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />
                <div className="ps-3">
                        <div className="text-base font-bold">Neil Sims</div>
                        <div className="font-medium text-gray-300 ">neil.sims@flowbite.com</div>
                    </div>  
                </th>
                <td className="px-8 py-4 font-semibold">
                    10
                </td>
                <td className="px-12 py-4  font-semibold">
                  7
                </td>
                <td className="px-2 py-4 ">
                <button className='font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
                  Manage
                </button>
                </td>
            </tr>
            <tr className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                <th className="flex items-center px-6 py-5 text-white">
                <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=meet&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />
                <div className="ps-3">
                        <div className="text-base font-bold">Neil Sims</div>
                        <div className="font-medium text-gray-300 ">neil.sims@flowbite.com</div>
                    </div>  
                </th>
                <td className="px-8 py-4 font-semibold">
                    10
                </td>
                <td className="px-12 py-4  font-semibold">
                  7
                </td>
                <td className="px-2 py-4 ">
                <button className='font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
                  Manage
                </button>
                </td>
            </tr>
            <tr className="border-b bg-[#000435] border-sky-500 hover:bg-blue-950 hover:text-white">
                <th className="flex items-center px-6 py-5 text-white">
                <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=meet&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />
                <div className="ps-3">
                        <div className="text-base font-bold">Neil Sims</div>
                        <div className="font-medium text-gray-300 ">neil.sims@flowbite.com</div>
                    </div>  
                </th>
                <td className="px-8 py-4 font-semibold">
                    10
                </td>
                <td className="px-12 py-4  font-semibold">
                  7
                </td>
                <td className="px-2 py-4 ">
                <button className='font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
                  Manage
                </button>
                </td>
            </tr>
        </tbody>
      </table>
      </div>
      </div>
    </div>
  )
}

export default Users
