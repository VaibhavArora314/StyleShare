
const SkeletonLoader = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-[90vw] mt-24 h-[90vh] bg-gray-200 dark:bg-gray-800 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 w-1/3 dark:bg-gray-600 mb-4 rounded"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/5"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/5"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
