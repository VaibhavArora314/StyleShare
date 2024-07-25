import { FaBars } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenState, userState } from "../store/atoms/auth";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const setTokenState = useSetRecoilState(tokenState);
  const user = useRecoilValue(userState);

  const handleLogout = () => {
    setTokenState(null);
    localStorage.removeItem("authToken");
  };

  return (
    <header className='-mt-2'>
      <div className="mx-auto flex flex-wrap p-5 justify-between items-center">
        <div className="flex title-font font-medium items-center text-gray-900 mb-0">
          <div className="items-center justify-center lg:hidden">
            <button onClick={toggleSidebar} className="text-2xl">
              <FaBars />
            </button>
          </div>
        </div>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <div className='flex text-right flex-col font-semibold'>
            <span className='text-xs'>{user?.email}</span>
            <span className='text-xs'>admin</span>
          </div>
          <img src={`https://ui-avatars.com/api/?name=${user?.email}&background=0ea5e9&color=fff&rounded=true&bold=true`} width={40} alt="profile-pic" className='mx-2'/>
          <button onClick={handleLogout} className='font-semibold rounded-md p-2 bg-sky-500 text-white px-4 hover:bg-sky-600'>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
