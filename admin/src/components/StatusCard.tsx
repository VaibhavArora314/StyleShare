import { useState, useEffect } from 'react';
import { HiUsers } from 'react-icons/hi2';
import { LiaNewspaperSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { tokenState } from '../store/atoms/auth';
import { useRecoilValue } from 'recoil';
import { MdAddReaction } from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
import { RiHeartsFill } from "react-icons/ri";
import { FaComments } from "react-icons/fa6";
import axios from 'axios';

const StatusCard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalPosts: 0, totalComments: 0, totalReactions: 0, messages: 0, favorites: 0 });
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/v1/admin/getCardStatus', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="text-white mt-5">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:mx-20 text-center">
          <Link to="/admin/users" className="col-span-1">
            <div className="flex items-center justify-between border-2 bg-[#000435] backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1 px-4 py-6 rounded-xl">
              <div className='inline-block p-2 text-white bg-sky-500 rounded-xl'>
                <HiUsers size={40} />
              </div>
              <div>
                <h2 className="title-font font-medium text-3xl">{stats.totalUsers}</h2>
                <p className="text-gray-200 py-1">Total Users</p>
              </div>
            </div>
          </Link>
          <Link to="/admin/posts" className="col-span-1">
            <div className="flex items-center justify-between border-2 bg-[#000435] backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1 px-4 py-6 rounded-xl">
              <div className='inline-block p-2 text-white bg-sky-500 rounded-xl'>
                <LiaNewspaperSolid size={40} />
              </div>
              <div>
                <h2 className="title-font font-medium text-3xl">{stats.totalPosts}</h2>
                <p className="text-gray-200 py-1">Total Posts</p>
              </div>
            </div>
          </Link>
          <div className="col-span-1">
            <div className="hover:cursor-default flex items-center justify-between border-2 bg-[#000435] backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1 px-4 py-6 rounded-xl">
              <div className='inline-block p-2 text-white bg-sky-500 rounded-xl'>
                <FaComments size={40} />
              </div>
              <div>
                <h2 className="title-font font-medium text-3xl">{stats.totalComments}</h2>
                <p className="text-gray-200 py-1">Total Comments</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-between border-2 bg-[#000435] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 px-4 py-6 rounded-xl">
              <div className='inline-block p-2 text-white bg-sky-500 rounded-xl'>
                <MdAddReaction size={40} />
              </div>
              <div>
                <h2 className="title-font font-medium text-3xl">{stats.totalReactions}</h2>
                <p className="text-gray-200 py-1">Total Reactions</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-between border-2 bg-[#000435] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 px-4 py-6 rounded-xl">
              <div className='inline-block p-2 text-white bg-sky-500 rounded-xl'>
                <SiGooglemessages size={40} />
              </div>
              <div>
                <h2 className="title-font font-medium text-3xl">{stats.messages}</h2>
                <p className="text-gray-200 py-1">Total Messages</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="hover:cursor-default flex items-center justify-between border-2 bg-[#000435] backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1 px-4 py-6 rounded-xl">
              <div className='inline-block p-2 text-white bg-sky-500 rounded-xl'>
                <RiHeartsFill size={40} />
              </div>
              <div>
                <h2 className="title-font font-medium text-3xl">{stats.favorites}</h2>
                <p className="text-gray-200 py-1">Users Favorites</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatusCard;
