import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostsPageSkeleton = () => {
  const skeletonArray = Array(9).fill(0); // Create an array with 9 elements for the skeleton placeholders

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full p-24">
      {skeletonArray.map((_, index) => (
        <div
          key={index}
          className="text-[#000435] bg-white  dark:text-white dark:bg-blue-950 border border-gray-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out"
        //   style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="flex justify-between items-center mb-0">
            <Skeleton height={30} width="60%" />
            <Skeleton circle={true} height={30} width={30} />
          </div>
          <Skeleton height={20} width="80%" className="mb-2 dark:bg-white" />
          <Skeleton height={12} width="100%" className="mb-2  dark:bg-white" />
          <Skeleton height={16} width="40%" className="mb-2  dark:bg-white" />
          <div className="flex flex-wrap gap-2 mb-2">
            {Array(3).fill(0).map((_, idx) => (
              <Skeleton key={idx} height={24} width={50} className="rounded-md  dark:bg-white" />
            ))}
          </div>
          <div className="flex justify-between">
            <div className="flex rtl:space-x-reverse">
              {Array(3).fill(0).map((_, idx) => (
                <Skeleton key={idx} circle={true} height={32} width={32} />
              ))}
            </div>
            <div className="flex space-x-2">
              <Skeleton height={24} width={24} />
              <Skeleton height={24} width={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsPageSkeleton;
