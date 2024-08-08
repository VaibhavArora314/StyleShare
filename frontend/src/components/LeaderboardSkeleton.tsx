import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LeaderboardSkeleton = () => {
  const skeletonArray = Array(5).fill(0); // Adjust the number of skeleton rows as needed

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="text-center text-sm font-medium text-[#000435]  bg-white dark:text-white dark:bg-[#5f67de] border-b-2 border-sky-600">
          <tr>
            <th scope="col" className="px-2 py-3 sm:px-6 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] uppercase tracking-wider">
              <Skeleton width={60} height={20} className=" rounded dark:bg-white" />
            </th>
            <th scope="col" className="px-2 py-3 sm:px-6 text-[#5f67de] bg-white  dark:text-white dark:bg-[#000435] uppercase tracking-wider">
              <Skeleton width={80} height={20} className=" rounded dark:bg-white" />
            </th>
            <th scope="col" className="px-2 py-3 sm:px-6 mx-12 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] uppercase tracking-wider">
              <Skeleton width={120} height={20} className=" rounded dark:bg-white" />
            </th>
            <th scope="col" className="px-2 py-3 sm:px-6 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] uppercase tracking-wider">
              <Skeleton width={60} height={20} className=" rounded dark:bg-white" />
            </th>
            <th scope="col" className="px-2 py-3 sm:px-6 text-[#5f67de] bg-white dark:text-white dark:bg-[#000435] uppercase tracking-wider">
              <Skeleton width={60} height={20} className=" rounded dark:bg-white" />
            </th>
          </tr>
        </thead>
        <tbody>
          {skeletonArray.map((_, index) => (
            <tr key={index} className="text-center text-[#000435] dark:text-gray-50 border-b-2 border-sky-900">
              <td className="px-2 py-4 sm:px-6">
                <div className="flex flex-col items-center">
                  <Skeleton width={40} height={40} circle={true} className=" rounded-full dark:bg-white" />
                </div>
              </td>
              <td className="px-2 py-4 sm:px-6">
                <div className="flex flex-col items-center">
                  <Skeleton width={40} height={40} circle={true} className=" rounded-full dark:bg-white" />
                </div>
              </td>
              <td className="px-2 py-4 sm:px-6">
                <Skeleton width={120} height={20} className=" rounded dark:bg-white" />
              </td>
              <td className="px-2 py-4 sm:px-6">
                <Skeleton width={60} height={20} className=" rounded dark:bg-white" />
              </td>
              <td className="px-2 py-4 sm:px-6">
                <Skeleton width={60} height={20} className=" rounded dark:bg-white" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardSkeleton;
