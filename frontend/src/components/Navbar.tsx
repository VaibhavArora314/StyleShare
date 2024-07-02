import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, tokenState } from "../store/atoms/auth";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import logo from '../assets/favicon.png';
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";
import { FaHome, FaScroll, FaTrophy, FaUser, FaPlus, FaCode, FaHeart, FaSignOutAlt, FaMoon, FaSun, FaStar } from 'react-icons/fa';
import { IoLogIn, IoPersonAdd } from 'react-icons/io5';
import clsx from 'clsx';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setTokenState = useSetRecoilState(tokenState);
  const isLoggedIn = useRecoilValue(loggedInState);
  const location = useLocation();
  const { t } = useTranslation();

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
    return clsx(
      "block py-2 px-4 rounded md:border-0 md:p-0 text-white md:hover:text-blue-300 hover:bg-blue-400 hover:text-white md:hover:bg-transparent transition duration-300 ease-in-out",
      {
        "text-blue-600": location.pathname === path,
      }
    );
  };

  return (
    <nav className="bg-gradient-to-r from-[#6a11cb] via-[#ab67df] to-[#2575fc] fixed w-full z-20 top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Favicon, Logo, Language Selector, Close Button */}
        <div className="flex items-center space-x-8 lg:space-x-3 w-full lg:w-auto justify-between lg:justify-start mb-4 lg:mb-0">
          <Link to="/app" className="flex items-center space-x-4 rtl:space-x-reverse" onClick={closeMenu}>
            <img src={logo} className="h-8" alt="Styleshare Logo" />
            <span className="self-center text-2xl font-bold text-white font-mono">
              {t("navbar.logo")}
            </span>
          </Link>
          <div className="flex items-center space-x-16 lg:hidden ml-8"> {/* Adjusted margin-left */}
            <div className="relative z-10">
              <LanguageDropdown /> {/* Ensure dropdown appears above */}
            </div>
            <button
              onClick={toggleMenu}
              type="button"
              className="relative inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
          </div>
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageDropdown /> {/* Keep as is for larger screens */}
          </div>
        </div>
        <div
          className={`${isMenuOpen ? "block" : "hidden"} w-full lg:w-auto lg:flex lg:flex-grow lg:items-center lg:justify-end lg:order-2 relative`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-0 text-lg lg:p-0 mt-4 border rounded-lg lg:flex-row lg:space-x-4 rtl:space-x-reverse lg:mt-0 lg:border-0">
            <li className="mt-2 lg:mb-0">
              <Link to="/app" className={getNavLinkClass("/app")} aria-current="page" onClick={closeMenu}>
                <FaHome className="inline-block mr-2" /> {t("navbar.links.home")}
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/app/posts" className={getNavLinkClass("/app/posts")} onClick={closeMenu}>
                <FaScroll className="inline-block mr-2" /> {t("navbar.links.posts")}
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/app/leaderboard" className={getNavLinkClass("/app/leaderboard")} onClick={closeMenu}>
                <FaTrophy className="inline-block mr-2" /> {t("navbar.links.leaderboard")}
              </Link>
            </li>
            <li className="mt-2">
              <Link to="/app/rateus" className={getNavLinkClass("/app/rateus")} onClick={closeMenu}>
                <FaStar className="inline-block mr-2" /> Rate Us
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/app/signin" onClick={closeMenu}>
                    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l from-[#c779e8] to-indigo-500 px-5 text-lg font-small text-white backdrop-blur-3xl">
                        <IoLogIn className="inline-block mr-2" /> {t("navbar.links.signin")}
                      </span>
                    </button>
                  </Link>
                </li>
                <li>
                  <Link to="/app/signup" onClick={closeMenu}>
                    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l from-[#c779e8] to-indigo-500 px-5 text-lg font-small text-white backdrop-blur-3xl">
                        <IoPersonAdd className="inline-block mr-2" /> {t("navbar.links.signup")}
                      </span>
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className="inline-flex mt-1 border-2 border-white items-center justify-center w-10 h-10 text-gray-100 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    {theme === 'light' ? <FaMoon className="w-4 h-4 " /> : <FaSun className="w-4 h-4" />}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="mt-2">
                  <Link to="/app/new-post" className={getNavLinkClass("/app/new-post")} onClick={closeMenu}>
<<<<<<< IconsAdded
                    <FaPlus className="inline-block mr-2" /> {t("navbar.links.newpost")}
=======
                    {t("navbar.links.newpost")}
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="/app/code" className={getNavLinkClass("/app/code")} onClick={closeMenu}>
                    {t("navbar.links.codeeditor")}
>>>>>>> main
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="/app/profile" className={getNavLinkClass("/app/profile")} onClick={closeMenu}>
                    <FaUser className="inline-block mr-2" /> {t("navbar.links.profile")}
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="/app/fav" className={getNavLinkClass("/app/fav")} onClick={closeMenu}>
                    <FaHeart className="inline-block mr-2" /> {t("navbar.links.favorites")}
                  </Link>
                </li>
                <li className="mt-2">
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center w-full lg:w-auto h-12 px-6 text-lg text-white transition duration-300 ease-in-out bg-red-500 rounded-lg focus:outline-none hover:bg-red-600"
                  >
                    <FaSignOutAlt className="inline-block mr-2" /> {t("navbar.links.logout")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className="inline-flex mt-1 border-2 border-white items-center justify-center w-10 h-10 text-gray-100 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
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
