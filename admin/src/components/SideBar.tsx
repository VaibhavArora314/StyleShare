import { FaTimes } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { IoNewspaperOutline } from "react-icons/io5";
import logo from '../assets/favicon.png';
import { Link, useLocation } from 'react-router-dom';
import { VscGraphScatter } from "react-icons/vsc";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import GoogleTranslate from './GoogleTranslate';
import { VscReactions } from "react-icons/vsc";

const SideBar = ({ sidebarOpen, toggleSidebar }: { sidebarOpen: boolean, toggleSidebar: () => void }) => {
  const location = useLocation();

  const linkClasses = (path: string) => 
    `mb-2 flex items-center py-2.5 px-4 rounded-lg transition duration-200 ${location.pathname === path ? 'bg-sky-500' : 'hover:bg-sky-500'}`;

  return (
    <div className={`lg:rounded-xl rounded-none fixed z-30 inset-y-0 left-0 w-72 lg:m-5 transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 bg-[#000435] text-white`}>
      <div className="flex items-center justify-between mr-6 mt-3 h-16 px-4">
        <Link to='/admin' className="text-xl flex font-bold">
          <img src={logo} className="h-8 mx-3" alt="Styleshare Logo" /> 
          Style Share
        </Link>
        <button onClick={toggleSidebar} className="lg:hidden text-2xl">
          <FaTimes />
        </button>
      </div>
      <GoogleTranslate />
      <nav className="px-4 py-2 font-semibold">
        <Link to="/admin" className={linkClasses('/admin')}><RxDashboard size={23} className='mr-3'/>Dashboard</Link>
        <Link to="/admin/profile" className={linkClasses('/admin/profile')}><CgProfile size={23} className='mr-3'/>My Profile</Link>
        <Link to="/admin/users" className={linkClasses('/admin/users')}><HiOutlineUsers size={23} className='mr-3'/>All Users</Link>
        <Link to="/admin/posts" className={linkClasses('/admin/posts')}><IoNewspaperOutline size={23} className='mr-3'/>All Posts</Link>
        <Link to="/admin/contactmessages" className={linkClasses('/admin/contactmessages')}><MdOutlineAttachEmail size={23} className='mr-3'/>Messages</Link>
        <Link to="/admin/comments" className={linkClasses('/admin/comments')}><FaRegComments size={23} className='mr-3'/>Comments</Link>
        <Link to="/admin/reactions" className={linkClasses('/admin/reactions')}><VscReactions size={23} className='mr-3'/>Reactions</Link>
        <Link to="/admin/statistics" className={linkClasses('/admin/statistics')}><VscGraphScatter size={23} className='mr-3'/>Statistics</Link>
      </nav>
    </div>
  );
};

export default SideBar;
