import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, tokenState } from "../store/atoms/auth";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import logo from '../assets/favicon.png';
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";
import { FaHome, FaScroll, FaTrophy, FaUser, FaPlus, FaHeart, FaSignOutAlt, FaMoon, FaSun, FaStar } from 'react-icons/fa'; // Removed FaCode
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
          <Link to="/app" className="flex items-center space-x-4 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Styleshare Logo" />
            <span className="text-2xl font-semibold whitespace-nowrap text-white">
              {t('Styleshare')}
            </span>
          </Link>
          <LanguageDropdown />
          <button
            onClick={toggleMenu}
            className="text-white inline-flex items-center p-2 ml-3 text-sm rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-styleshare"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 5.293a1 1 0 011.414 0L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-4.293 4.293 4.293 4.293a1 1 0 01-1.414 1.414L10 12.414l-4.293 4.293a1 1 0 01-1.414-1.414l4.293-4.293L4.293 6.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </button>
        </div>
        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full lg:flex lg:w-auto lg:items-center`}
          id="navbar-styleshare"
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-8 lg:mt-0 text-white lg:text-lg">
            <li>
              <Link to="/app" className={getNavLinkClass("/app")} onClick={closeMenu}>
                <FaHome className="inline-block mr-2" />
                {t('Home')}
              </Link>
            </li>
            <li>
              <Link to="/app/posts" className={getNavLinkClass("/app/posts")} onClick={closeMenu}>
                <FaScroll className="inline-block mr-2" />
                {t('Posts')}
              </Link>
            </li>
            <li>
              <Link to="/app/leaderboard" className={getNavLinkClass("/app/leaderboard")} onClick={closeMenu}>
                <FaTrophy className="inline-block mr-2" />
                {t('Leaderboard')}
              </Link>
            </li>
            <li>
              <Link to="/app/rateus" className={getNavLinkClass("/app/rateus")} onClick={closeMenu}>
                <FaStar className="inline-block mr-2" />
                {t('RateUs')}
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/app/profile" className={getNavLinkClass("/app/profile")} onClick={closeMenu}>
                    <FaUser className="inline-block mr-2" />
                    {t('Profile')}
                  </Link>
                </li>
                <li>
                  <Link to="/app/add-post" className={getNavLinkClass("/app/add-post")} onClick={closeMenu}>
                    <FaPlus className="inline-block mr-2" />
                    {t('Add Post')}
                  </Link>
                </li>
                <li>
                  <Link to="/app/favorites" className={getNavLinkClass("/app/favorites")} onClick={closeMenu}>
                    <FaHeart className="inline-block mr-2" />
                    {t('Favorites')}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 px-4 rounded md:border-0 md:p-0 text-white md:hover:text-blue-300 hover:bg-blue-400 hover:text-white md:hover:bg-transparent transition duration-300 ease-in-out"
                  >
                    <FaSignOutAlt className="inline-block mr-2" />
                    {t('Logout')}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/app/signin" className={getNavLinkClass("/app/signin")} onClick={closeMenu}>
                    <IoLogIn className="inline-block mr-2" />
                    {t('Signin')}
                  </Link>
                </li>
                <li>
                  <Link to="/app/signup" className={getNavLinkClass("/app/signup")} onClick={closeMenu}>
                    <IoPersonAdd className="inline-block mr-2" />
                    {t('Signup')}
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={toggleTheme}
                className="block w-full text-left py-2 px-4 rounded md:border-0 md:p-0 text-white md:hover:text-blue-300 hover:bg-blue-400 hover:text-white md:hover:bg-transparent transition duration-300 ease-in-out"
              >
                {theme === 'dark' ? (
                  <>
                    <FaSun className="inline-block mr-2" />
                    {t('Light Mode')}
                  </>
                ) : (
                  <>
                    <FaMoon className="inline-block mr-2" />
                    {t('Dark Mode')}
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
