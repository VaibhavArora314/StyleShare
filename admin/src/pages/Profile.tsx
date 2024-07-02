import { useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import banner from "../assets/banner.jpg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState, userState } from "../store/atoms/auth";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const setTokenState = useSetRecoilState(tokenState);
  const user = useRecoilValue(userState);

  const handleLogout = () => {
    setTokenState(null);
    localStorage.removeItem("authToken");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <section className="text-gray-600">
          <div className="container px-5 mx-auto flex flex-col">
            <div className="lg:w-4/6 mx-auto">
              <div className="rounded-xl h-56 overflow-hidden">
                <img alt="content" className="object-cover object-center h-full w-full" src={banner} />
              </div>
              <div className="flex flex-col sm:flex-row mt-7">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-[#000435]">
                    <img src={`https://ui-avatars.com/api/?name=${user?.email}&background=0ea5e9&color=fff&rounded=true&bold=true`} width={73} alt="profile-pic" />
                  </div>
                  <div className="flex flex-col items-center text-center justify-center">
                    <h2 className="title-font mt-4 font-semibold text-gray-900 text-lg flex items-center">{user?.email} <RiVerifiedBadgeFill size={25} className="ml-1 text-[#000435]" /></h2>
                    <div className="w-12 h-1 bg-sky-500 rounded mt-2 mb-4"></div>
                    <p className="text-base font-semibold">As an admin of StyleShare, you play a crucial role in maintaining the platform where users can share and discover Tailwind CSS components effortlessly.</p>
                  </div>
                </div>
                <div className="items-center sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <p className="leading-relaxed text-lg mb-4"><span className="text-3xl font-semibold">W</span>elcome to your profile, where you can manage users, posts, and interactions within our vibrant community. Your admin powers allow you to oversee the content shared, ensuring it aligns with our community standards and helps foster creativity and collaboration. Keep an eye on the latest trends and popular components shared by users, and take action when necessary to maintain a positive environment. Your efforts ensure a seamless and enjoyable experience for all members of our community.</p>
                  <button onClick={handleLogout} className=' mb-3 items-center inline-flex font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;