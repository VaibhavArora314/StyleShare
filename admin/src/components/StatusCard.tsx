import { HiUsers } from 'react-icons/hi2';
import { LiaNewspaperSolid } from 'react-icons/lia';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const StatusCard = () => {
  return (
    <section className="text-white mt-5">
          <div className="container mx-auto px-5">
            <div className="flex flex-wrap -m-4 text-center justify-center">
              <Link to="/admin/users" className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                <div className="flex items-center justify-between border-2 bg-[#000435] backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1 px-4 py-6 rounded-xl">
                  <div className='inline-block p-2 text-white bg-sky-500 rounded-xl'>
                    <HiUsers size={40}/>
                  </div>
                  <div>
                    <h2 className="title-font font-medium text-3xl">2.7K</h2>
                    <p className="text-gray-200 py-1">Total Users</p>
                  </div>
                </div>
              </Link>
              <Link to="/admin/posts" className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                <div className="flex items-center justify-between border-2 bg-[#000435] backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1 px-4 py-6 rounded-xl">
                  <div className='inline-block p-2 text-white bg-sky-500 rounded-xl'>
                    <LiaNewspaperSolid size={40}/>
                  </div>
                  <div>
                    <h2 className="title-font font-medium text-3xl">2.7K</h2>
                    <p className="text-gray-200 py-1">Total Posts</p>
                  </div>
                </div>
              </Link>
              <div className="p-4 lg:w-1/4 sm:w-1/2 w-full">
                <div className="hover:cursor-default flex items-center justify-between border-2 bg-[#000435] backdrop-blur-sm cursor-pointer transition-transform duration-300 hover:-translate-y-1 px-4 py-6 rounded-xl">
                  <div className='inline-block p-2 text-white bg-sky-500 rounded-xl'>
                    <TbActivityHeartbeat size={40}/>
                  </div>
                  <div>
                    <h2 className="title-font font-medium text-3xl">2.7K</h2>
                    <p className="text-gray-200 py-1">Total Visits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default StatusCard
