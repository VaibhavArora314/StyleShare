import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, tokenState } from "../store/atoms/auth";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import logo from '../assets/favicon.png';
import { FaSun, FaMoon } from 'react-icons/fa';
import GoogleTranslate from "./GoogleTranslate";

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setTokenState = useSetRecoilState(tokenState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTokenState("");
    closeMenu();
    toast.success('Logged out successfully');
  };

  const getNavLinkClass = (path: string) => {
    return location.pathname === path
      ? "block py-2 px-3 bg-blue-600 rounded md:bg-transparent md:p-0 text-white md:text-blue-300"
      : "block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-300 hover:bg-blue-400 hover:text-white md:hover:bg-transparent";
  };

  return (
    <nav className={`bg-gradient-to-r from-[#6a11cb] via-[#ab67df] to-[#2575fc] fixed w-full z-20 top-0 start-0 `}>

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <Link to="/app" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={closeMenu}>
          <div className="flex items-center space-x-3 rtl:space-x-reverse dark:text-black mr-4">
            <img src={logo} className="h-8" alt="Styleshare Logo" />
            <span className="self-center text-2xl font-bold text-white font-mono notranslate">
              Style Share
            </span>
          </div>
          <div className="Translator">
          <GoogleTranslate />
        </div>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="relative inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg lg:hidden hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open Menu</span>
          <div className="flex flex-col gap-1">
            <span className={`h-0.5 w-4 bg-white transform transition duration-200 ease-in ${isMenuOpen ? "rotate-[45deg]" : "rotate-0"}`}></span>
            <span className={`h-0.5 w-4 ${isMenuOpen ? "bg-transparent" : "bg-white"} transition duration-200 ease-in ${isMenuOpen ? "absolute" : "relative"}`}></span>
            <span className={`h-0.5 w-4 bg-white transform transition duration-200 ease-in ${isMenuOpen ? "rotate-[-45deg]" : "rotate-0"} ${isMenuOpen ? "absolute" : "relative"}`}></span>
          </div>
        </button>
        <div
          className={`${isMenuOpen ? "block" : "hidden"} w-full lg:block lg:w-auto transition-all duration-300 ease-in-out`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-0 text-lg lg:p-4 mt-4 border rounded-lg lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0">
            <li className={`mt-2 lg:mb-0 ${isMenuOpen ? "ml-3" : ""}`}>
              <Link to="/app" className={getNavLinkClass("/app")} aria-current="page" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className={`mt-2 ${isMenuOpen ? "ml-3" : ""}`}>
              <Link to="/app/posts" className={getNavLinkClass("/app/posts")} onClick={closeMenu}>
                Posts
              </Link>
            </li>
            <li className={`mt-2 ${isMenuOpen ? "ml-3" : ""}`}>
              <Link to="/app/leaderboard" className={getNavLinkClass("/app/leaderboard")} onClick={closeMenu}>
                Leaderboard
              </Link>
            </li>
            {!isLoggedIn ? (
              <div className="flex flex-col lg:flex-row lg:space-x-4">
                <li className="mb-2 lg:mb-0">
                  <Link to="/app/signin" onClick={closeMenu}>
                    <button className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${isMenuOpen ? "ml-3 mt-2" : ""}`}>
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l from-[#c779e8] to-indigo-500 px-5 text-lg font-small text-white backdrop-blur-3xl">
                        Sign in
                      </span>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/app/signup" onClick={closeMenu}>
                    <button className={`relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${isMenuOpen ? "ml-3" : ""}`}>
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l from-[#c779e8] to-indigo-500 px-5 text-lg font-small text-white backdrop-blur-3xl">
                        Sign up
                      </span>
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className={`inline-flex mt-1 border-2 border-white items-center justify-center w-10 h-10 text-gray-100 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${isMenuOpen ? "ml-3 mt-2 my-2" : ""}`}
                  >
                    {theme === 'light' ? <FaMoon className="w-4 h-4 " /> : <FaSun className="w-4 h-4" />}
                  </button>
                </li>
              </div>
            ) : (
              <>
                <li className={`mt-2 ${isMenuOpen ? "ml-3" : ""}`}>
                  <Link to="/app/new-post" className={getNavLinkClass("/app/new-post")} onClick={closeMenu}>
                    New Post
                  </Link>
                </li>
                <li className={`mt-2 ${isMenuOpen ? "ml-3" : ""}`}>
                  <Link to="/app/code" className={getNavLinkClass("/app/code")} onClick={closeMenu}>
                    Code Editor
                  </Link>
                </li>
                <li className={`mt-2 ${isMenuOpen ? "ml-3" : ""}`}>
                  <Link to="/app/profile" className={getNavLinkClass("/app/profile")} onClick={closeMenu}>
                    Profile
                  </Link>
                </li>
                <li className={`mt-2 ${isMenuOpen ? "ml-3" : ""}`}>
                  <Link to="/app/fav" className={getNavLinkClass("/app/fav")} onClick={closeMenu}>
                    Favorite
                  </Link>
                </li>
                <li className="mt-1">
                  <button
                    className={`text-white px-4 py-2 -mt-3  rounded-lg bg-blue-500 hover:bg-blue-600 ${isMenuOpen ? "ml-3" : ""}`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  <button
                    onClick={toggleTheme}
                    className={`inline-flex mx-1 border-2 border-white items-center justify-center w-10 h-10 text-gray-100 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${isMenuOpen ? "ml-3 mt-2 my-2" : ""}`}
                  >
                    {theme === 'light' ? <FaMoon className="w-4 h-4 " /> : <FaSun className="w-4 h-4" />}
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
