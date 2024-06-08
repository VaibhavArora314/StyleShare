import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { ILeaderboardUser } from '../types';
import { GiTrophyCup } from "react-icons/gi";
import { useRecoilValue } from 'recoil';
import { userState } from '../store/atoms/auth';

const LeaderBoard = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<ILeaderboardUser[]>([]);
  const currentUser = useRecoilValue(userState);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('/api/v1/posts/all/leaderboard');
        setLeaderboard(response.data.leaderboard);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-3 mb-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-50">Leaderboard 🥳</h2>
      <div className="shadow-md bg-blue-950 backdrop-blur-sm rounded-lg p-4 border-2 border-sky-500 lg:mx-52 md:mx-20 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className='text-center text-sm font-medium text-gray-100 border-b-2 border-sky-600 '>
              <tr>
                <th scope="col" className='px-6 py-3 text-gray-100 uppercase tracking-wider'>Rank</th>
                <th scope="col" className='px-6 py-3 text-gray-100 uppercase tracking-wider'>Profile</th>
                <th scope="col" className='px-6 py-3 text-gray-100 uppercase tracking-wider'>Username</th>
                <th scope="col" className='px-6 py-3 text-gray-100 uppercase tracking-wider'>Posts</th>
                <th scope="col" className='px-6 py-3 text-gray-100 uppercase tracking-wider'>Likes</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr
                  key={user.userId}
                  className={`text-center text-gray-50 border-b-2 border-sky-900 font-semibold ${currentUser && user.userId === currentUser.id ? ' bg-sky-500' : ''}`}
                >
                  <td className='px-6 py-4 '>
                    {(index === 0 || index === 1 || index === 2) ? (
                      <div className="flex flex-col items-center">
                        <GiTrophyCup className={index === 0 ? "text-[#FFD700] text-4xl" : index === 1 ? "text-[#C0C0C0] text-4xl" : "text-[#CD7F32] text-4xl"} />
                      </div>
                    ) : (
                      user.rank
                    )}
                  </td>
                  <td className='px-6 py-4 '>
                    <div className="flex flex-col items-center">
                      <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${user?.username}&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />
                    </div>
                  </td>
                  <td className='px-6 py-4 '>
                    <div className={`text-sm text-gray-50 ${currentUser && user.userId === currentUser.id ? 'font-bold' : ''}`}>@{user.username}</div>
                  </td>
                  <td className='px-6 py-4 '>
                    <div className="text-sm text-gray-50">{user.postCount}</div>
                  </td>
                  <td className='px-6 py-4 '>
                    <div className="text-sm text-gray-50">{user.totalLikes}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default LeaderBoard;
