import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { GiTrophyCup } from "react-icons/gi";
import { useRecoilValue } from 'recoil';
import { userState } from '../store/atoms/auth';
import useLeaderboard from '../hooks/useLeadearboard';
import bgHero from "../assets/bgHero.png";

const LeaderBoard = () => {
  const { loading, leaderboard } = useLeaderboard();
  const currentUser = useRecoilValue(userState);

  document.title = 'Style Share | Top users 😎';

  return (
    <div className="min-h-screen text-[#000435] bg-white dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="p-3 mb-10 text-[#000435] bg-white dark:text-white dark:bg-[#000435]" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h2 className="text-3xl text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] font-bold text-center mb-8">Leaderboard 🥳</h2>
        <div className="shadow-md text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] backdrop-blur-sm rounded-lg p-4 border-2 border-sky-500 lg:mx-52 md:mx-20 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="text-center text-sm font-medium text-[#000435] bg-white dark:text-white dark:bg-[#5f67de] border-b-2 border-sky-600">
                  <tr>
                    <th scope="col" className="px-2 py-3 sm:px-6 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] uppercase tracking-wider">Rank</th>
                    <th scope="col" className="px-2 py-3 sm:px-6 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] uppercase tracking-wider">Profile</th>
                    <th scope="col" className="px-2 py-3 sm:px-6 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] uppercase tracking-wider">Username</th>
                    <th scope="col" className="px-2 py-3 sm:px-6 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] uppercase tracking-wider">Posts</th>
                    <th scope="col" className="px-2 py-3 sm:px-6 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] uppercase tracking-wider">Reactions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((user, index) => (
                    <tr
                      key={user.userId}
                      className={`text-center text-[#000435] dark:text-gray-50 border-b-2 border-sky-900 font-semibold ${currentUser && user.userId === currentUser.id ? ' bg-sky-500' : ''}`}
                    >
                      <td className="px-2 py-4 sm:px-6">
                        {(index === 0 || index === 1 || index === 2) ? (
                          <div className="flex flex-col items-center">
                            <GiTrophyCup className={index === 0 ? "text-[#FFD700] text-4xl" : index === 1 ? "text-[#C0C0C0] text-4xl" : "text-[#CD7F32] text-4xl"} />
                          </div>
                        ) : (
                          user.rank
                        )}
                      </td>
                      <td className="px-2 py-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <img className="h-10 w-10 rounded-full" src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=0ea5e9&color=fff&rounded=true&bold=true`} alt="profile-pic" />
                        </div>
                      </td>
                      <td className="px-2 py-4 sm:px-6">
                        <Link to={`/app/profile/${user.userId}`} className={`text-sm dark:text-gray-50 ${currentUser && user.userId === currentUser.id ? 'font-bold' : ''}`}>@{user.username}</Link>
                      </td>
                      <td className="px-2 py-4 sm:px-6">
                        <div className="text-sm text-[#000435] dark:text-gray-50">{user.postCount}</div>
                      </td>
                      <td className="px-2 py-4 sm:px-6">
                        <div className="text-sm text-[#000435] dark:text-gray-50">{user.totalReactions}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
