import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, tokenState } from "../store/atoms/auth";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setTokenState = useSetRecoilState(tokenState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTokenState("");
  };

  const getNavLinkClass = (path: string) => {
    return location.pathname === path
      ? "block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:p-0 text-white md:text-blue-500"
      : "block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent";
  };

  return (
    <nav className="border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/app"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          {/* <img
            src=""
            className="h-8"
            alt="Logo"
          /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Style Share
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto transition-all duration-1000 ease-in-out`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-[#000435] border-gray-700">
            <li>
              <Link
                to="/app"
                className={getNavLinkClass("/app")}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="/app/posts" className={getNavLinkClass("/app/posts")}>
                Posts
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/app/signin"
                    className={getNavLinkClass("/app/signin")}
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/app/signup"
                    className={getNavLinkClass("/app/signup")}
                  >
                    Sign up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/app/new-post"
                    className={getNavLinkClass("/app/new-post")}
                  >
                    New Post
                  </Link>
                </li>
                <li>
                  <button
                    className="block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
