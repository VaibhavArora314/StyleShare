import { useState } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import StatusCard from '../components/StatusCard';
import TrendingPosts from '../components/TrendingPosts';
import NewPosts from '../components/NewPosts';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  document.title ="Style Share Admin | Dashboard 👨‍💻"

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen">
      <SideBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <StatusCard/>
        <TrendingPosts/>
        <NewPosts/>
      </div>
    </div>
  );
};

export default Dashboard;
