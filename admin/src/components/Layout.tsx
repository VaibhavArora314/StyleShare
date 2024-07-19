import { useLocation } from "react-router-dom";
import { useState } from "react";
import SideBar from "./SideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isLoginPage = location.pathname === '/admin/sign-in';

  return (
    <>
      {!isLoginPage && <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className={isLoginPage ? '' : 'content-with-sidebar'}>
        {children}
      </div>
    </>
  );
};

export default Layout;
