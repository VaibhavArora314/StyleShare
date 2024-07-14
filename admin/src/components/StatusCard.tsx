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
import { IStats } from '../types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StatusCard = () => {
  const [stats, setStats] = useState<IStats | null>(null);
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
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };
    fetchStats();
  }, [token]);

  const renderCard = (icon: JSX.Element, count: number | string | null, label: string) => (
    <div className="flex items-center justify-between border-2 bg-[#000435] backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1 px-4 py-6 rounded-xl">
      <div className='inline-block p-2 text-white bg-sky-500 rounded-xl'>
        {icon}
      </div>
      <div>
        <h2 className="title-font font-medium text-3xl">
          {count !== null && count !== undefined ? count : <Skeleton width={50} />}
        </h2>
        <p className="text-gray-200 py-1">
          {count !== null && count !== undefined ? label : <Skeleton width={100} />}
        </p>
      </div>
    </div>
  );

  return (
    <SkeletonTheme baseColor="rgb(14 165 233)" highlightColor="rgb(255 255 255)">
      <div className="mx-auto container pl-9 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:mx-14 text-center">
          <Link to="/admin/users" className="col-span-1">
            {renderCard(<HiUsers size={40} />, stats?.totalUsers ?? null, 'Total Users')}
          </Link>
          <Link to="/admin/posts" className="col-span-1">
            {renderCard(<LiaNewspaperSolid size={40} />, stats?.totalPosts ?? null, 'Total Posts')}
          </Link>
          <div className="col-span-1">
            {renderCard(<FaComments size={40} />, stats?.totalComments ?? null, 'Total Comments')}
          </div>
          <div className="col-span-1">
            {renderCard(<MdAddReaction size={40} />, stats?.totalReactions ?? null, 'Total Reactions')}
          </div>
          <div className="col-span-1">
            {renderCard(<SiGooglemessages size={40} />, stats?.contactMessages ?? null, 'Contact Messages')}
          </div>
          <div className="col-span-1">
            {renderCard(<RiHeartsFill size={40} />, stats?.favoritesPosts ?? null, 'Most Favorites')}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default StatusCard;
