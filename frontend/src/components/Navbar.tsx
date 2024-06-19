// import { useState } from "react";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { loggedInState, tokenState } from "../store/atoms/auth";
// import { Link, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import logo from '../assets/favicon.png';
// import { useTranslation } from "react-i18next";
// import LanguageDropdown from "./LanguageDropdown";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const setTokenState = useSetRecoilState(tokenState);
//   const isLoggedIn = useRecoilValue(loggedInState);
//   const location = useLocation();
//   const { t } = useTranslation();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setTokenState("");
//     closeMenu();
//     toast.success('Logged out successfully');
//   };

//   const getNavLinkClass = (path:string) => {
//     return location.pathname === path

//     ? "block py-2 px-3 bg-blue-600 rounded md:bg-transparent md:p-0 text-white md:text-blue-300"
//     : "block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-300 hover:bg-blue-400 hover:text-white md:hover:bg-transparent";
//   };

//   return (
//     <nav className="bg-gradient-to-r from-[#6a11cb] via-[#ab67df] to-[#2575fc]  fixed w-full z-20 top-0 start-0">

//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <Link to="/app" className="flex items-center justify-between space-x-3 rtl:space-x-reverse" onClick={closeMenu}>
//             <div className="flex items-center space-x-3 rtl:space-x-reverse">
//               <img src={logo} className="h-8" alt="Styleshare Logo" />
//               <span className="self-center text-2xl font-bold  text-white font-mono">
//                 {t("navbar.logo")}
//               </span>
//             </div>
//             <div className=" ">
//               <LanguageDropdown />
//             </div>
//         </Link>
//         <button
//           onClick={toggleMenu}
//           type="button"
//           className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg lg:hidden hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
//           aria-controls="navbar-default"
//           aria-expanded={isMenuOpen ? "true" : "false"}
//         >
//           <span className="sr-only">Open Menu</span>
//           <svg
//             className="w-5 h-5"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 17 14"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 1h15M1 7h15M1 13h15"
//             />
//           </svg>
//         </button>
//         <div
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } w-full lg:block lg:w-auto transition-all duration-300 ease-in-out`}
//           id="navbar-default"
//         >
//           <ul className="font-medium flex flex-col p-0 text-lg lg:p-0 mt-4 border rounded-lg lg:flex-row lg:space-x-5 rtl:space-x-reverse lg:mt-0 lg:border-0">
//             <li className="mt-2 lg:mb-0">
//               <Link to="/app" className={getNavLinkClass("/app")} aria-current="page" onClick={closeMenu}>
//                 {t("navbar.links.home")}
//               </Link>
//             </li>
//             <li className="mt-2">
//               <Link to="/app/posts" className={getNavLinkClass("/app/posts")} onClick={closeMenu}>
//                 {t("navbar.links.posts")}
//               </Link>
//             </li>
//             <li className="mt-2">
//               <Link to="/app/leaderboard" className={getNavLinkClass("/app/leaderboard")} onClick={closeMenu}>
//                 {t("navbar.links.leaderboard")}
//               </Link>
//             </li>
//             {!isLoggedIn ? (
//               <div className="flex flex-col lg:flex-row lg:space-x-4">
//                 <li className="mb-2 lg:mb-0">
//                   <Link
//                     to="/app/signin"
//                     onClick={closeMenu}
//                   >
//                       <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//                       <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//                       <span className="inline-flex   h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l  from-[#c779e8] to-indigo-500 px-5  text-lg font-small text-white backdrop-blur-3xl">
//                         {t("navbar.links.signin")}
//                       </span>
//                     </button>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/app/signup"
//                     onClick={closeMenu}
//                   >
//                     <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//                       <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//                       <span className="inline-flex   h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l  from-[#c779e8] to-indigo-500 px-5  text-lg font-small text-white backdrop-blur-3xl">
//                       {t("navbar.links.signup")}
//                       </span>
//                     </button>
//                   </Link>
//                 </li>
//               </div>
//             ) : (
//               <>
//                 <li className="mt-2">
//                   <Link to="/app/new-post" className={getNavLinkClass("/app/new-post")} onClick={closeMenu}>
//                     {t("navbar.links.newpost")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <Link
//                     to="/app/code"
//                     className={getNavLinkClass("/app/code")}
//                     onClick={closeMenu}
//                   >
//                     {t("CodeEditor")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <Link to="/app/profile" className={getNavLinkClass("/app/profile")} onClick={closeMenu}>
//                     {t("navbar.links.profile")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <Link to="/app/fav" className={getNavLinkClass("/app/fav")} onClick={closeMenu}>
//                     {t("navbar.links.favorite")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <button
//                     className="block py-2 px-3 rounded lg:border-0 lg:p-0 text-white lg:hover:text-blue-500 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent w-full text-left"
//                     onClick={handleLogout}
//                   >
//                     {t("navbar.links.logout")}
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState } from "react";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { loggedInState, tokenState } from "../store/atoms/auth";
// import { Link, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import logo from '../assets/favicon.png';
// import { useTranslation } from "react-i18next";
// import LanguageDropdown from "./LanguageDropdown";
// import { FiSun, FiMoon } from 'react-icons/fi'; // Import icons for toggle button

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const setTokenState = useSetRecoilState(tokenState);
//   const isLoggedIn = useRecoilValue(loggedInState);
//   const location = useLocation();
//   const { t } = useTranslation();
//   const [theme, setTheme] = useState<string>(() => {
//     const storedTheme = localStorage.getItem('theme');
//     return storedTheme || 'light';
//   });

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     localStorage.setItem('theme', newTheme);
//     setTheme(newTheme);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setTokenState("");
//     closeMenu();
//     toast.success('Logged out successfully');
//   };

//   const getNavLinkClass = (path: string) => {
//     return location.pathname === path
//       ? "block py-2 px-3 bg-blue-600 rounded md:bg-transparent md:p-0 text-white md:text-blue-300"
//       : "block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-300 hover:bg-blue-400 hover:text-white md:hover:bg-transparent";
//   };

//   return (
//     <nav className={`bg-gradient-to-r from-[#6a11cb] via-[#ab67df] to-[#2575fc]  fixed w-full z-20 top-0 start-0 dark:bg-white ${theme === 'dark' ? 'dark:bg-white' : ''}`}>

//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <Link to="/app" className="flex items-center justify-between space-x-3 rtl:space-x-reverse" onClick={closeMenu}>
//             <div className="flex items-center space-x-3 rtl:space-x-reverse dark:text-black">
//               <img src={logo} className="h-8" alt="Styleshare Logo" />
//               <span className="self-center text-2xl font-bold  text-white font-mono">
//                 {t("navbar.logo")}
//               </span>
//             </div>
//             <div className=" ">
//               <LanguageDropdown />
//             </div>
//         </Link>
//         <button
//           onClick={toggleMenu}
//           type="button"
//           className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg lg:hidden hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
//           aria-controls="navbar-default"
//           aria-expanded={isMenuOpen ? "true" : "false"}
//         >
//           <span className="sr-only">Open Menu</span>
//           <svg
//             className="w-5 h-5"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 17 14"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 1h15M1 7h15M1 13h15"
//             />
//           </svg>
//         </button>
//         <div
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } w-full lg:block lg:w-auto transition-all duration-300 ease-in-out`}
//           id="navbar-default"
//         >
//           <ul className="font-medium flex flex-col p-0 text-lg lg:p-0 mt-4 border rounded-lg lg:flex-row lg:space-x-5 rtl:space-x-reverse lg:mt-0 lg:border-0">
//             <li className="mt-2 lg:mb-0">
//               <Link to="/app" className={getNavLinkClass("/app")} aria-current="page" onClick={closeMenu}>
//                 {t("navbar.links.home")}
//               </Link>
//             </li>
//             <li className="mt-2">
//               <Link to="/app/posts" className={getNavLinkClass("/app/posts")} onClick={closeMenu}>
//                 {t("navbar.links.posts")}
//               </Link>
//             </li>
//             <li className="mt-2">
//               <Link to="/app/leaderboard" className={getNavLinkClass("/app/leaderboard")} onClick={closeMenu}>
//                 {t("navbar.links.leaderboard")}
//               </Link>
//             </li>
//             {!isLoggedIn ? (
//               <div className="flex flex-col lg:flex-row lg:space-x-4">
//                 <li className="mb-2 lg:mb-0">
//                   <Link
//                     to="/app/signin"
//                     onClick={closeMenu}
//                   >
//                     <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//                       <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//                       <span className="inline-flex   h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l  from-[#c779e8] to-indigo-500 px-5  text-lg font-small text-white backdrop-blur-3xl">
//                         {t("navbar.links.signin")}
//                       </span>
//                     </button>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/app/signup"
//                     onClick={closeMenu}
//                   >
//                     <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//                       <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//                       <span className="inline-flex   h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l  from-[#c779e8] to-indigo-500 px-5  text-lg font-small text-white backdrop-blur-3xl">
//                         {t("navbar.links.signup")}
//                       </span>
//                     </button>
//                   </Link>
//                 </li>
//               </div>
//             ) : (
//               <>
//                 <li className="mt-2">
//                   <Link to="/app/new-post" className={getNavLinkClass("/app/new-post")} onClick={closeMenu}>
//                     {t("navbar.links.newpost")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <Link
//                     to="/app/code"
//                     className={getNavLinkClass("/app/code")}
//                     onClick={closeMenu}
//                   >
//                     {t("CodeEditor")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <Link to="/app/profile" className={getNavLinkClass("/app/profile")} onClick={closeMenu}>
//                     {t("navbar.links.profile")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <Link to="/app/fav" className={getNavLinkClass("/app/fav")} onClick={closeMenu}>
//                     {t("navbar.links.favorite")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <button
//                     className="block py-2 px-3 rounded lg:border-0 lg:p-0 text-white lg:hover:text-blue-500 hover:bg-gray-700 hover:text-white lg:hover:bg-transparent w-full text-left"
//                     onClick={handleLogout}
//                   >
//                     {t("navbar.links.logout")}
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//         {/* Toggle button for dark/light mode */}
//         <button
//           onClick={toggleTheme}
//           className="inline-flex items-center justify-center w-10 h-10 text-gray-100 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
//         >
//           {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState } from "react";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { loggedInState, tokenState } from "../store/atoms/auth";
// import { Link, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import logo from '../assets/favicon.png';
// import { useTranslation } from "react-i18next";
// import LanguageDropdown from "./LanguageDropdown";
// import { FiSun, FiMoon } from 'react-icons/fi'; // Import icons for toggle button

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const setTokenState = useSetRecoilState(tokenState);
//   const isLoggedIn = useRecoilValue(loggedInState);
//   const location = useLocation();
//   const { t } = useTranslation();
//   const [theme, setTheme] = useState<string>(() => {
//     const storedTheme = localStorage.getItem('theme');
//     return storedTheme || 'light'; // Default to 'light' theme if no theme is stored
//   });

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     localStorage.setItem('theme', newTheme);
//     setTheme(newTheme);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setTokenState("");
//     closeMenu();
//     toast.success('Logged out successfully');
//   };

//   const getNavLinkClass = (path: string) => {
//     return location.pathname === path
//       ? "block py-2 px-3 bg-blue-600 rounded md:bg-transparent md:p-0 text-white md:text-blue-300"
//       : "block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-300 hover:bg-blue-400 hover:text-white md:hover:bg-transparent";
//   };

//   return (
//     <nav className={`bg-gradient-to-r from-[#6a11cb] via-[#ab67df] to-[#2575fc] fixed w-full z-20 top-0 start-0 ${theme === 'dark' ? 'dark:bg-gray-800' : ''}`}>

//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <Link to="/app" className="flex items-center justify-between space-x-3 rtl:space-x-reverse" onClick={closeMenu}>
//           <div className="flex items-center space-x-3 rtl:space-x-reverse dark:text-black">
//             <img src={logo} className="h-8" alt="Styleshare Logo" />
//             <span className="self-center text-2xl font-bold text-white font-mono">
//               {t("navbar.logo")}
//             </span>
//           </div>
//           <div className=" ">
//             <LanguageDropdown />
//           </div>
//         </Link>
//         <button
//           onClick={toggleMenu}
//           type="button"
//           className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg lg:hidden hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
//           aria-controls="navbar-default"
//           aria-expanded={isMenuOpen ? "true" : "false"}
//         >
//           <span className="sr-only">Open Menu</span>
//           <svg
//             className="w-5 h-5"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 17 14"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M1 1h15M1 7h15M1 13h15"
//             />
//           </svg>
//         </button>
//         <div
//           className={`${isMenuOpen ? "block" : "hidden"} w-full lg:block lg:w-auto transition-all duration-300 ease-in-out`}
//           id="navbar-default"
//         >
//           <ul className="font-medium flex flex-col p-0 text-lg lg:p-0 mt-4 border rounded-lg lg:flex-row lg:space-x-5 rtl:space-x-reverse lg:mt-0 lg:border-0">
//             <li className="mt-2 lg:mb-0">
//               <Link to="/app" className={getNavLinkClass("/app")} aria-current="page" onClick={closeMenu}>
//                 {t("navbar.links.home")}
//               </Link>
//             </li>
//             <li className="mt-2">
//               <Link to="/app/posts" className={getNavLinkClass("/app/posts")} onClick={closeMenu}>
//                 {t("navbar.links.posts")}
//               </Link>
//             </li>
//             <li className="mt-2">
//               <Link to="/app/leaderboard" className={getNavLinkClass("/app/leaderboard")} onClick={closeMenu}>
//                 {t("navbar.links.leaderboard")}
//               </Link>
//             </li>
//             {!isLoggedIn ? (
//               <div className="flex flex-col lg:flex-row lg:space-x-4">
//                 <li className="mb-2 lg:mb-0">
//                   <Link to="/app/signin" onClick={closeMenu}>
//                     <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//                       <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//                       <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l from-[#c779e8] to-indigo-500 px-5 text-lg font-small text-white backdrop-blur-3xl">
//                         {t("navbar.links.signin")}
//                       </span>
//                     </button>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/app/signup" onClick={closeMenu}>
//                     <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//                       <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//                       <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l from-[#c779e8] to-indigo-500 px-5 text-lg font-small text-white backdrop-blur-3xl">
//                         {t("navbar.links.signup")}
//                       </span>
//                     </button>
//                   </Link>
//                 </li>
//               </div>
//             ) : (
//               <>
//                 <li className="mt-2">
//                   <Link to="/app/new-post" className={getNavLinkClass("/app/new-post")} onClick={closeMenu}>
//                     {t("navbar.links.newpost")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <Link to="/app/code" className={getNavLinkClass("/app/code")} onClick={closeMenu}>
//                     {t("CodeEditor")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <Link to="/app/profile" className={getNavLinkClass("/app/profile")} onClick={closeMenu}>
//                     {t("navbar.links.profile")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <Link to="/app/fav" className={getNavLinkClass("/app/fav")} onClick={closeMenu}>
//                     {t("navbar.links.favorite")}
//                   </Link>
//                 </li>
//                 <li className="mt-2">
//                   <button
//                     className=" text-white px-4 py-2 -mt-3 rounded-lg bg-blue-500 hover:bg-blue-600"
//                     onClick={handleLogout}
//                   >
//                     {t("navbar.links.logout")}
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//         {/* Toggle button for dark/light mode */}
//         <button
//           onClick={toggleTheme}
//           className="inline-flex  border-2 border-white items-center justify-center w-10 h-10 text-gray-100 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
//         >
//           {theme === 'light' ? <FiMoon className="w-4 h-4 " /> : <FiSun className="w-4 h-4" />}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInState, tokenState } from "../store/atoms/auth";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import logo from '../assets/favicon.png';
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./LanguageDropdown";
import { FaSun, FaMoon } from 'react-icons/fa';

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
    return location.pathname === path
      ? "block py-2 px-3 bg-blue-600 rounded md:bg-transparent md:p-0 text-white md:text-blue-300"
      : "block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-blue-300 hover:bg-blue-400 hover:text-white md:hover:bg-transparent";
  };

  return (
    <nav className={`${theme === 'light' ? 'navbar-light' : 'navbar-dark'} fixed w-full z-20 top-0 start-0`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/app" className="flex items-center justify-between space-x-2            rtl:space-x-reverse" onClick={closeMenu}>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Styleshare Logo" />
            <span className={`self-center text-2xl font-bold text-white font-mono`}>
              {t("navbar.logo")}
            </span>
          </div>
          <div>
            <LanguageDropdown   />
          </div>
        </Link>

        <div className="flex  items-center space-x-0 ">
          <div className="sm:-mr-2">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg lg:hidden hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-default"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open Menu</span>
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
              } w-full lg:block lg:w-auto transition-all duration-300 ease-in-out`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-0 text-lg lg:p-0 mt-4 border rounded-lg lg:flex-row lg:space-x-5 rtl:space-x-reverse lg:mt-0 lg:border-0">
                <li className="mt-2 lg:mb-0">
                  <Link to="/app" className={getNavLinkClass("/app")} aria-current="page" onClick={closeMenu}>
                    {t("navbar.links.home")}
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="/app/posts" className={getNavLinkClass("/app/posts")} onClick={closeMenu}>
                    {t("navbar.links.posts")}
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="/app/leaderboard" className={getNavLinkClass("/app/leaderboard")} onClick={closeMenu}>
                    {t("navbar.links.leaderboard")}
                  </Link>
                </li>
                {!isLoggedIn ? (
                  <div className="flex flex-col lg:flex-row lg:space-x-4">
                    <li className="mb-2 lg:mb-0">
                      <Link to="/app/signin" onClick={closeMenu}>
                        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l from-[#c779e8] to-indigo-500 px-5 text-lg font-small text-white backdrop-blur-3xl">
                            {t("navbar.links.signin")}
                          </span>
                        </button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/app/signup" onClick={closeMenu}>
                        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-l from-[#c779e8] to-indigo-500 px-5 text-lg font-small text-white backdrop-blur-3xl">
                            {t("navbar.links.signup")}
                          </span>
                        </button>
                      </Link>
                    </li>
                  </div>
                ) : (
                  <>
                    <li className="mt-2">
                      <Link to="/app/new-post" className={getNavLinkClass("/app/new-post")} onClick={closeMenu}>
                        {t("navbar.links.newpost")}
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link to="/app/code" className={getNavLinkClass("/app/code")} onClick={closeMenu}>
                        {t("CodeEditor")}
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link to="/app/profile" className={getNavLinkClass("/app/profile")} onClick={closeMenu}>
                        {t("navbar.links.profile")}
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link to="/app/fav" className={getNavLinkClass("/app/fav")} onClick={closeMenu}>
                        {t("navbar.links.favorite")}
                      </Link>
                    </li>
                    <li className="mt-2">
                      <button
                        className="text-white px-4 py-2 -mt-3 rounded-lg bg-blue-500 hover:bg-blue-600"
                        onClick={handleLogout}
                      >
                        {t("navbar.links.logout")}
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div>
            <button
              onClick={toggleTheme}
              className="flex border-2 p-2 border-white dark:border-white items-center sm:w-7 sm:h-7  md:w-10 md:h-10 justify-center  text-gray-100 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-200 md:mx-5 xl:mx:20 sm:mr-2 "
            >
              {theme === 'light' ? <FaMoon className="sm:w-7 sm:h-7  md:w-10 md:h-10 " /> : <FaSun className="sm:w-7 sm:h-7  md:w-10 md:h-10" />}
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

/*
          <div className="border-2 border-white rounded-md ">
              <button onClick={toggleTheme} className="border-2 p-1 rounded:md border-white flex items-center">
                {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
              </button>
          </div>
*/